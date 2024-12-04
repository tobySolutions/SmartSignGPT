// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SmartSignGPT - AI-Powered Contract Management',
  description: 'Transform your contract workflow with AI-powered summaries, analysis, and improvements.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="handle-grammarly" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              const observer = new MutationObserver(() => {
                document.querySelectorAll('[data-new-gr-c-s-check-loaded], [data-gr-ext-installed]')
                  .forEach(el => {
                    el.removeAttribute('data-new-gr-c-s-check-loaded');
                    el.removeAttribute('data-gr-ext-installed');
                  });
              });
              
              observer.observe(document.documentElement, {
                attributes: true,
                childList: true,
                subtree: true
              });
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}