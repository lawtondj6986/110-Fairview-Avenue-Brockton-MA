'use client';

// Last-resort boundary. Never renders error details or stack traces.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', background: '#F7F3EA', color: '#2E3440' }}>
        <h1 style={{ color: '#14284B' }}>Something went wrong</h1>
        <p>Please try again.</p>
        <button type="button" onClick={reset} style={{ minHeight: 44, padding: '0 1rem', fontSize: '1.125rem' }}>
          Try again
        </button>
        <p>
          {/* Full reload on purpose: the app shell may be broken here. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" style={{ color: '#1F6F78' }}>
            Home
          </a>
        </p>
      </body>
    </html>
  );
}
