'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, FileText, Shield, Zap } from 'lucide-react'

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* Gradient circles */}
    <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    
    {/* Grid pattern */}
    <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
  </div>
)

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="relative backdrop-blur-sm bg-white/80 border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-gray-900">SmartSignGPT</span>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 transition-colors">Sign in</Link>
              <Link href="/auth/signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight animate-fade-in">
              Make Contracts Simple with
              <span className="block text-black animate-fade-in-delayed">AI-Powered Intelligence</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Transform your contract workflow with AI summaries, risk analysis, and automated improvements. No legal expertise required.
            </p>
            <div className="mt-10 flex justify-center gap-x-6 animate-fade-in-up-delayed">
              <Link href="/auth/signup" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-all hover:scale-105">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button onClick={() => router.push('/routes/demo')} className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all hover:scale-105">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="text-black"><FileText className="h-8 w-8" /></div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Smart Contract Analysis</h3>
              <p className="mt-2 text-gray-600">Get instant AI-powered summaries and risk analysis in plain language.</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="text-black"><Zap className="h-8 w-8" /></div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Automated Improvements</h3>
              <p className="mt-2 text-gray-600">Receive intelligent suggestions for missing clauses and unclear language.</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="text-black"><Shield className="h-8 w-8" /></div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Enterprise Security</h3>
              <p className="mt-2 text-gray-600">Bank-grade encryption with full compliance and audit trails.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}