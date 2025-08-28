"use client";
import * as React from 'react';

export default function AdminRedirect() {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/cms/index.html');
    }
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <p>Loading CMS…</p>
      <p>
        If it does not load, open <a href="/cms/index.html">/cms/index.html</a>.
      </p>
    </div>
  );
}
