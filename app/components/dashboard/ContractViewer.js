'use client'

import { AlertCircle, Download, Clock, MessageSquare, History, Share2 } from 'lucide-react'

export default function ContractViewer({ contract }) {
  if (!contract) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a contract to view</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 pb-6 border-b">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{contract.title}</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <Share2 size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Download size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <History size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-4">From: {contract.sender}</span>
            <span>{new Date(contract.date).toLocaleString()}</span>
          </div>

          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Sign Contract
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Request Changes
            </button>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="mb-6 bg-blue-50 rounded-lg p-4">
          <h2 className="text-sm font-semibold mb-3">AI Analysis</h2>
          <div className="space-y-3">
            <div className="flex items-start text-sm">
              <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 mr-2 shrink-0" />
              <p>Non-compete clause duration (2 years) is longer than industry standard (1 year)</p>
            </div>
            <div className="flex items-start text-sm">
              <Clock className="h-4 w-4 text-blue-500 mt-0.5 mr-2 shrink-0" />
              <p>Payment terms (Net-30) align with industry standards</p>
            </div>
            <div className="flex items-start text-sm">
              <MessageSquare className="h-4 w-4 text-green-500 mt-0.5 mr-2 shrink-0" />
              <p>Liability clause provides adequate protection for both parties</p>
            </div>
          </div>
        </div>

        {/* Contract Content */}
        <div className="prose max-w-none">
          <h2>Contract Terms</h2>
          <p className="text-gray-600">{contract.content}</p>
          
          {/* Example contract sections */}
          <h3>1. Parties</h3>
          <p>This agreement is made between [Party A] and [Party B]...</p>
          
          <h3>2. Term and Termination</h3>
          <p>The term of this agreement shall commence on [start date]...</p>
          
          <h3>3. Compensation</h3>
          <p>In consideration for the services provided...</p>
          
          {/* Signature Block */}
          <div className="mt-8 border-t pt-8">
            <h3>Signatures</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-medium mb-2">Party A</p>
                <div className="border-b border-gray-300 py-4">
                  {contract.signed ? "Signature here" : "Awaiting signature..."}
                </div>
                <p className="text-sm text-gray-500 mt-1">Date: _____________</p>
              </div>
              <div>
                <p className="font-medium mb-2">Party B</p>
                <div className="border-b border-gray-300 py-4">
                  Awaiting signature...
                </div>
                <p className="text-sm text-gray-500 mt-1">Date: _____________</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}