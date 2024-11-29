'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Zap, Shield } from 'lucide-react'

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <motion.div 
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-50/30 rounded-full mix-blend-multiply filter blur-xl"
      animate={{
        y: [0, 50, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-50/20 rounded-full mix-blend-multiply filter blur-xl"
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Floating Contracts */}
    <div className="absolute top-1/3 right-1/4 opacity-5">
      <motion.div 
        className="w-32 h-40 border-2 border-black rounded-lg"
        animate={{
          rotate: [0, 5, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  </div>
)

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100"
  >
    <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-pink-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2 font-serif italic">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)
export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-sm bg-white/80 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-serif italic font-bold">SmartSignGPT</span>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 transition-colors">Sign in</Link>
              <Link 
                href="/auth/signup" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl font-serif italic font-bold tracking-tight mb-6">
              Make Contracts Simple with
              <span className="block mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                AI-Powered Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Transform your contract workflow with AI summaries, risk analysis, and
              automated improvements. No legal expertise required.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Link 
                href="/auth/signup" 
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center"
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FeatureCard 
              icon={FileText}
              title="Smart Contract Analysis"
              description="Get instant AI-powered summaries and risk analysis in plain language."
            />
            <FeatureCard 
              icon={Zap}
              title="Automated Improvements"
              description="Receive intelligent suggestions for missing clauses and unclear language."
            />
            <FeatureCard 
              icon={Shield}
              title="Enterprise Security"
              description="Bank-grade encryption with full compliance and audit trails."
            />
          </div>
        </div>
      </main>
    </div>
  )
}