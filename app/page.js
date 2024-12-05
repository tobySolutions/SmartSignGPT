'use client'

import Link from 'next/link'
import { FileText, Shield, Sparkles, Crown, CheckCircle, ArrowRight } from 'lucide-react'

// Static SVG for document illustration
const DocumentSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 240 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="200" height="260" rx="10" fill="white" stroke="black" strokeWidth="2"/>
    <path d="M45 60 H195" stroke="black" strokeWidth="2"/>
    <path d="M45 100 H175" stroke="black" strokeWidth="2"/>
    <path d="M45 140 H195" stroke="black" strokeWidth="2"/>
    <path d="M45 180 H135" stroke="black" strokeWidth="2"/>
    <path d="M45 220 H165" stroke="black" strokeWidth="2"/>
    <circle cx="45" cy="260" r="4" fill="black"/>
    <circle cx="65" cy="260" r="4" fill="black"/>
    <circle cx="85" cy="260" r="4" fill="black"/>
  </svg>
)

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-8 bg-[#fafafa] rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white">
    <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6">
      <Icon className="h-7 w-7 text-white" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-black">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
)

// Testimonial Card Component
const TestimonialCard = ({ name, role, content }) => (
  <div className="p-8 bg-[#fafafa] rounded-xl shadow-lg border border-gray-100 hover:bg-white transition-all duration-300">
    <p className="text-gray-600 italic mb-6">"{content}"</p>
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-black rounded-full"></div>
      <div>
        <p className="font-medium text-black">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
)

export default function Page() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Subtle diagonal pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), 
                           linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }}
      />

      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-xl bg-white/90 z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-black" />
              <span className="text-2xl font-semibold">SmartSignGPT</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-black transition-colors">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-black transition-colors">Pricing</Link>
              <Link href="#about" className="text-gray-600 hover:text-black transition-colors">About</Link>
              <Link 
                href="/routes/dashboard"
                className="px-6 py-2.5 bg-black text-white rounded-lg hover:shadow-xl transition-all duration-300"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Side Image */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">
            {/* Left Content */}
            <div className="flex-1 text-left">
              <div className="inline-flex items-center space-x-2 bg-black/5 rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-black" />
                <span className="text-sm font-medium text-gray-600">Powered by Advanced AI</span>
              </div>

              <h1 className="text-6xl font-bold tracking-tight mb-6 text-black">
                Elevate Your 
                <span className="block mt-2">Contracts with</span>
                <span className="text-5xl bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                  AI Excellence
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 max-w-xl leading-relaxed">
                Experience the future of contract management with AI-powered analysis,
                intelligent insights, and unmatched security.
              </p>

              <Link 
                href="/routes/dashboard"
                className="inline-flex items-center px-8 py-4 bg-black text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Illustration */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-black rounded-3xl transform rotate-6 opacity-5"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-black rounded-3xl transform -rotate-3 opacity-5"></div>
                <div className="relative bg-[#fafafa] rounded-3xl shadow-2xl p-8 border border-black/5">
                  <DocumentSVG />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
            {[
              { number: '10M+', label: 'Documents Analyzed' },
              { number: '99.9%', label: 'Accuracy Rate' },
              { number: '5000+', label: 'Enterprise Users' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-8 bg-[#fafafa] rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white"
              >
                <div className="text-4xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <FeatureCard 
              icon={FileText}
              title="AI-Powered Analysis"
              description="Get instant, accurate contract analysis with advanced AI technology that understands complex legal language."
            />
            <FeatureCard 
              icon={Shield}
              title="Enterprise Security"
              description="Bank-grade encryption and security protocols ensure your sensitive documents are always protected."
            />
            <FeatureCard 
              icon={CheckCircle}
              title="Smart Automation"
              description="Automate contract reviews and get intelligent suggestions for improvements and risk mitigation."
            />
          </div>

          {/* Testimonials */}
          <div id="about" className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-black mb-12 text-center">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard 
                name="Sarah Johnson"
                role="Legal Director, TechCorp"
                content="SmartSignGPT has revolutionized how we handle contracts. The AI analysis is incredibly accurate and has saved us countless hours."
              />
              <TestimonialCard 
                name="Michael Chen"
                role="CEO, Innovation Labs"
                content="The security and accuracy of SmartSignGPT are unmatched. It's become an indispensable tool for our legal operations."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}