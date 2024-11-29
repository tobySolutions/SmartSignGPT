// app/page.js
'use client'

import Link from 'next/link'
import { ArrowRight, FileText, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed w-full backdrop-blur-sm bg-white/75 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold">SmartSignGPT</span>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900">Sign in</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
                Make Contracts Simple with
                <span className="block text-black">AI-Powered Intelligence</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your contract workflow with AI summaries, risk analysis, and automated improvements.
              </p>
              <div className="mt-10">
                <Link href="/auth/signup" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}