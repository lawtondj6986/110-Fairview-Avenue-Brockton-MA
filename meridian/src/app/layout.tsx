import type { ReactNode } from 'react';
import '@/styles/globals.css';

// The real <html> lives in app/[locale]/layout.tsx so `lang` is always correct.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
