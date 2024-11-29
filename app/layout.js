// app/layout.js
import { Inter } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SmartSignGPT - AI-Powered Contract Management',
  description: 'Transform your contract workflow with AI-powered summaries, analysis, and improvements.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}