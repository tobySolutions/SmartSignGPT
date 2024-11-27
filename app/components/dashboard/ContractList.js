'use client'

import { FileText, Clock } from 'lucide-react'

export default function ContractList({ contracts, selectedId, onSelectContract }) {
  return (
    <div className="w-80 border-r overflow-y-auto bg-white">
      {contracts.map((contract) => (
        <div
          key={contract.id}
          onClick={() => onSelectContract(contract)}
          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
            selectedId === contract.id ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FileText size={16} className="text-gray-400 mr-2" />
              <h3 className="font-medium text-sm truncate">{contract.title}</h3>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(contract.date).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {contract.preview}
          </p>

          <div className="flex items-center justify-between">
            <span className={`
              px-2 py-1 text-xs rounded-full
              ${contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${contract.status === 'signed' ? 'bg-green-100 text-green-800' : ''}
              ${contract.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
            `}>
              {contract.status}
            </span>
            {contract.dueDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                {new Date(contract.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}