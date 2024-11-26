// app/routes/role-selection/page.js
'use client'

import { useRouter } from 'next/navigation'

export default function RoleSelection() {
  const router = useRouter()

  const handleRoleSelect = (role) => {
    if (role === 'recipient') {
      router.push('/routes/recipient-dashboard')
    } else {
      router.push('/routes/sender-dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to SmartSignGPT</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose your primary role to get started with a personalized experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Recipient Card */}
          <button
            onClick={() => handleRoleSelect('recipient')}
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-black"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Contract Recipient</h3>
              <p className="mt-2 text-gray-500">
                Review and sign contracts with AI-powered insights
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant contract summaries
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Risk analysis and highlights
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure e-signatures
                </li>
              </ul>
            </div>
          </button>

          {/* Sender Card */}
          <button
            onClick={() => handleRoleSelect('sender')}
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-black"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Contract Sender</h3>
              <p className="mt-2 text-gray-500">
                Create and manage contracts with AI assistance
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 text-left">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-powered contract creation
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Template recommendations
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Track signing progress
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}