// app/routes/recipient-dashboard/page.js
'use client'

import { useState } from 'react'
import { FileText, Upload, Bell, Search, Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react'

export default function RecipientDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContract, setSelectedContract] = useState(null)

  // Mock contracts data
  const contracts = [
    {
      id: 1,
      title: 'Employment Agreement',
      sender: 'HR Department',
      status: 'pending_review',
      receivedDate: '2024-02-26',
      dueDate: '2024-03-05',
      summary: {
        keyPoints: [
          'Annual salary: $80,000',
          'Start date: March 15, 2024',
          'Notice period: 30 days',
          'Benefits included'
        ],
        risks: [
          'Non-compete clause: 2 years',
          'Intellectual property assignment'
        ]
      }
    },
    // Add more mock contracts as needed
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold">SmartSignGPT</span>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-400 cursor-pointer" />
              <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
                R
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contract Review Dashboard</h1>
            <p className="mt-1 text-gray-500">Review and manage your received contracts</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Upload className="h-4 w-4 mr-2" />
              Upload Contract
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Contracts Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Needs Review
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{contract.title}</h3>
              <p className="mt-1 text-sm text-gray-500">From: {contract.sender}</p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Due in {new Date(contract.dueDate).getDate() - new Date().getDate()} days
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <button 
                  onClick={() => setSelectedContract(contract)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  Sign Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {[1, 2, 3].map((item) => (
                <li key={item} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Contract reviewed
                        </p>
                        <p className="text-sm text-gray-500">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}