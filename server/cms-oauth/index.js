require('dotenv').config();
const express = require('express');

// Uses global fetch (Node 18+). If on older Node, install 'node-fetch'.

const PORT = process.env.PORT || 3001;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL; // e.g., https://protek.co.tz
const SCOPE = process.env.SCOPE || 'repo';

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !BASE_URL) {
  console.warn('[cms-oauth] Missing env vars: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, BASE_URL');
}

const app = express();
app.disable('x-powered-by');

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/auth', (req, res) => {
  const state = req.query.state || '';
  const redirectUri = `${BASE_URL}/api/auth/callback`;
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', GITHUB_CLIENT_ID);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', SCOPE);
  if (state) url.searchParams.set('state', state);
  console.log('[auth] redirect ->', url.toString());
  res.redirect(url.toString());
});

app.get('/api/auth/callback', async (req, res) => {
  const code = req.query.code;
  const state = req.query.state || '';
  console.log('[callback] hit', { hasCode: !!code, state });
  if (!code) {
    return renderScript(res, 'error', { message: 'Missing code' });
  }
  try {
    const redirectUri = `${BASE_URL}/api/auth/callback`;
    const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
        state
      })
    });
    const data = await tokenResp.json();
    console.log('[callback] token resp', { status: tokenResp.status, hasToken: !!data.access_token, error: data.error });
    if (!data.access_token) {
      return renderScript(res, 'error', { message: 'No access_token', data, state });
    }
    // Include state so Decap can match the auth response to the opener
    return renderScript(res, 'success', { token: data.access_token, state });
  } catch (err) {
    console.error('[callback] error', err);
    return renderScript(res, 'error', { message: err?.message || String(err), state });
  }
});

function renderScript(res, type, payload) {
  const channel = type === 'success' ? 'authorization:github:success' : 'authorization:github:error';
  const body = Object.assign({ provider: 'github' }, payload || {});
  const msg = `${channel}:${JSON.stringify(body)}`;
  const html = `<!doctype html><html><body>
  <p style="font-family: sans-serif">${type === 'success' ? 'Login successful.' : 'Login failed.'} You can close this window.</p>
  <pre style="white-space: pre-wrap; font-family: monospace">${escapeHtml(JSON.stringify(body))}</pre>
  <script>
    (function(){
      try {
        window.opener && window.opener.postMessage(${JSON.stringify(msg)}, '*');
        setTimeout(function(){ window.close(); }, 500);
      } catch(e) { console.error(e); }
    })();
  </script></body></html>`;
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}

function escapeHtml(s){
  return String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
}

app.listen(PORT, () => {
  console.log(`[cms-oauth] Listening on :${PORT}`);
});
