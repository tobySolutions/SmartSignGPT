'use client'

import { useState } from 'react'
import { FileText, Upload, Bell, Search, Plus, Settings, Users, BarChart, X } from 'lucide-react'

function NewContractModal({ isOpen, onClose }) {
  const [contractData, setContractData] = useState({
    title: '',
    type: '',
    recipients: '',
    dueDate: '',
    template: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle contract creation
    console.log('New contract:', contractData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Contract</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contract Title
            </label>
            <input
              type="text"
              value={contractData.title}
              onChange={(e) => setContractData({ ...contractData, title: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contract Type
            </label>
            <select
              value={contractData.type}
              onChange={(e) => setContractData({ ...contractData, type: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
              required
            >
              <option value="">Select a type</option>
              <option value="employment">Employment Contract</option>
              <option value="nda">Non-Disclosure Agreement</option>
              <option value="service">Service Agreement</option>
              <option value="sales">Sales Contract</option>
              <option value="custom">Custom Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Template
            </label>
            <select
              value={contractData.template}
              onChange={(e) => setContractData({ ...contractData, template: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="">Start from scratch</option>
              <option value="standard_employment">Standard Employment Contract</option>
              <option value="basic_nda">Basic NDA</option>
              <option value="service_agreement">Service Agreement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient Emails
            </label>
            <input
              type="text"
              value={contractData.recipients}
              onChange={(e) => setContractData({ ...contractData, recipients: e.target.value })}
              placeholder="Enter email addresses separated by commas"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={contractData.dueDate}
              onChange={(e) => setContractData({ ...contractData, dueDate: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              value={contractData.description}
              onChange={(e) => setContractData({ ...contractData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
            >
              Create Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default function SenderDashboard() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false)
  
    // Mock contracts data
    const contracts = [
      {
        id: 1,
        title: 'Employment Contract Template',
        status: 'draft',
        recipients: 3,
        lastModified: '2024-02-26',
        completionRate: '67%'
      },
      {
        id: 2,
        title: 'NDA Agreement',
        status: 'active',
        recipients: 5,
        lastModified: '2024-02-25',
        completionRate: '89%'
      },
      {
        id: 3,
        title: 'Service Agreement',
        status: 'pending',
        recipients: 2,
        lastModified: '2024-02-24',
        completionRate: '45%'
      }
    ]
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <span className="text-xl font-bold">SmartSignGPT</span>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsNewContractModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Contract
                </button>
                <Bell className="h-6 w-6 text-gray-400 cursor-pointer" />
                <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
                  S
                </div>
              </div>
            </div>
          </div>
        </nav>
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Contracts
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        12
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Signatures
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        5
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Completion Rate
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        89%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Templates
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        8
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Search and Filters */}
          <div className="mb-8">
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
  
          {/* Contracts Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {contract.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${contract.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                        ${contract.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        ${contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      `}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contract.recipients} recipients
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contract.lastModified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contract.completionRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-black hover:text-gray-700 mr-4">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Modal */}
          <NewContractModal 
            isOpen={isNewContractModalOpen}
            onClose={() => setIsNewContractModalOpen(false)}
          />
        </div>
      </div>
    )
  }