// app/components/dashboard/Sidebar.js
'use client'

import { FileText, Clock, Send, Star, Archive, Trash2, Plus } from 'lucide-react'

export default function Sidebar({ onNewContract }) {
  const menuItems = [
    { icon: <FileText size={20} />, label: 'All Contracts', count: 24 },
    { icon: <Clock size={20} />, label: 'Pending', count: 5 },
    { icon: <Send size={20} />, label: 'Sent', count: 12 },
    { icon: <Star size={20} />, label: 'Starred', count: 3 },
    { icon: <Archive size={20} />, label: 'Archived', count: 15 },
    { icon: <Trash2 size={20} />, label: 'Trash', count: 0 },
  ]

  return (
    <div className="w-64 border-r h-full bg-white">
      <div className="p-4">
        <button
          onClick={onNewContract}
          className="w-full bg-black text-white rounded-full py-3 px-6 flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Contract
        </button>
      </div>

      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full text-left px-6 py-3 flex items-center text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-4">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.count > 0 && (
              <span className="text-sm text-gray-500">{item.count}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}