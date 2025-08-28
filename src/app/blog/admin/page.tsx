"use client";
import * as React from 'react';

export default function BlogAdminAlias() {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/admin/index.html');
    }
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <p>Redirecting to the CMS…</p>
      <p>
        If you are not redirected automatically, go to <a href="/admin/">/admin/</a>.
      </p>
    </div>
  );
}
