CMS OAuth (GitHub) for Decap CMS

Overview
- Minimal Express server to handle GitHub OAuth for Decap CMS.
- Exposes endpoints under `/api/auth` and `/api/auth/callback`.
- Works with the inlined CMS config in `public/cms/index.html` and `public/admin/index.html`.

Env Vars
- `GITHUB_CLIENT_ID`: Your GitHub OAuth App client ID
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App client secret
- `BASE_URL`: Public site URL, e.g. `https://protek.co.tz` (used for callback)
- `PORT`: Port to listen on (default 3001)
- `SCOPE`: GitHub scopes (default `repo`)

Run locally
1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. `npm start`
4. Visit `http://localhost:3001/api/health` to verify.

CloudPanel deployment
Option A: Create a Node.js app in CloudPanel
- Upload `server/cms-oauth` and run `npm install`.
- Set env vars in the app settings.
- Start app (`npm start`).
- Add Nginx location to proxy `/api/auth` and `/api/auth/callback` to the app port (e.g., 3001):

  location ^~ /api/auth {
    proxy_pass http://127.0.0.1:3001/api/auth;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

Option B: Separate subdomain (e.g., auth.protek.co.tz)
- Set `BASE_URL` to that subdomain and update the CMS config in `public/*/index.html` to match.

CMS config expectations
- Backend inlined with:
  - `name: github`, `repo`, `branch`
  - `base_url: https://protek.co.tz`
  - `auth_endpoint: /api/auth`

Troubleshooting
- “Not Found” on login: Ensure Nginx proxies `/api/auth` to the Node app.
- Blank popup: Check server logs; verify `GITHUB_CLIENT_ID/SECRET` are set and callback URL matches OAuth app settings.
- Wrong backend: In browser console run `CMS.getState().toJS().config.backend`.

