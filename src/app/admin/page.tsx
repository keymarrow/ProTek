"use client";
import * as React from 'react';

export default function AdminRedirect() {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/admin/index.html');
    }
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <p>Loading CMS…</p>
      <p>
        If it does not load, open <a href="/admin/index.html">/admin/index.html</a>.
      </p>
    </div>
  );
}

