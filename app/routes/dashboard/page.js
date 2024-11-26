'use client'

import { useState } from 'react'
import { FileText, Upload, Clock, Settings, Menu, Bell, Search, Plus } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">SmartSignGPT</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button 
                  className={`${
                    activeTab === 'all' 
                    ? 'border-black text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  onClick={() => setActiveTab('all')}
                >
                  All Contracts
                </button>
                <button
                  className={`${
                    activeTab === 'pending'
                    ? 'border-black text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  onClick={() => setActiveTab('pending')}
                >
                  Pending Review
                </button>
                <button
                  className={`${
                    activeTab === 'completed'
                    ? 'border-black text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  onClick={() => setActiveTab('completed')}
                >
                  Completed
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800">
                  <Plus className="h-5 w-5 mr-2" />
                  New Contract
                </button>
              </div>
              <button className="ml-6 p-1 rounded-full text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">JD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Search contracts..."
            />
          </div>
        </div>

        {/* Contract Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Recent Contract Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
              <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Service Agreement</h3>
            <p className="mt-1 text-sm text-gray-500">Last modified 2 hours ago</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Due in 5 days
              </div>
              <button className="text-sm font-medium text-black hover:text-gray-700">
                View Details
              </button>
            </div>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-lg shadow p-6 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
            <Upload className="h-8 w-8 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Contract</h3>
            <p className="mt-1 text-sm text-gray-500">
              Drag and drop or click to upload
            </p>
            <button className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Browse Files
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {[1, 2, 3].map((item) => (
                <li key={item} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Contract #12345 was reviewed
                      </p>
                      <p className="text-sm text-gray-500">
                        2 hours ago
                      </p>
                    </div>
                    <div>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                        View
                      </button>
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