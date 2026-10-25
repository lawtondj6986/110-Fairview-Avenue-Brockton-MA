// Requests outside any locale (rare: the proxy redirects almost everything). Plain, no data.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', background: '#F7F3EA', color: '#2E3440' }}>
        <h1 style={{ color: '#14284B' }}>Page not found</h1>
        <p>
          {/* Full reload on purpose: the app shell may be broken here. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" style={{ color: '#1F6F78', fontSize: '1.25rem' }}>
            Go to the home page
          </a>
        </p>
      </body>
    </html>
  );
}
