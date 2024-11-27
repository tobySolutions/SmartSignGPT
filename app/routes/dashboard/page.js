'use client'

import { useState } from 'react'
import { MenuIcon, Search, Bell, Plus, Loader } from 'lucide-react'
import Sidebar from '@/app/components/dashboard/Sidebar'
import ContractList from '@/app/components/dashboard/ContractList'
import ContractViewer from '@/app/components/dashboard/ContractViewer'
import NewContractModal from '@/app/components/dashboard/NewContractModal'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedContract, setSelectedContract] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const mockContracts = [
    {
      id: 1,
      title: 'Employment Agreement - Senior Developer',
      sender: 'HR Department <hr@company.com>',
      status: 'pending',
      date: '2024-02-27T09:30:00',
      dueDate: '2024-03-15',
      preview: 'This employment agreement outlines the terms and conditions of employment...',
      content: 'Full contract content would go here...',
    },
    {
      id: 2,
      title: 'Non-Disclosure Agreement - Project Atlas',
      sender: 'Legal Team <legal@company.com>',
      status: 'draft',
      date: '2024-02-27T10:15:00',
      dueDate: '2024-03-10',
      preview: 'This NDA establishes the confidentiality terms for Project Atlas...',
      content: 'Full NDA content would go here...',
    }
  ]

  const analyzeContract = async (contract) => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze',
          data: { contractText: contract.content }
        })
      });

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing contract:', error);
    } finally {
      setIsAnalyzing(false)
    }
  }
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-full">
            <MenuIcon className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold ml-4">SmartSignGPT</h1>
        </div>
 
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
 
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="h-8 w-8 bg-black text-white rounded-full flex items-center justify-center">
            JD
          </button>
        </div>
      </header>
 
      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {sidebarOpen && (
          <Sidebar 
            onNewContract={() => setIsNewContractModalOpen(true)}
            selectedContract={selectedContract}
          />
        )}
 
        <ContractList
          contracts={mockContracts}
          selectedId={selectedContract?.id}
          onSelectContract={(contract) => {
            setSelectedContract(contract);
            analyzeContract(contract);
          }}
        />
 
        <ContractViewer 
          contract={selectedContract}
          analysis={analysis}
          isAnalyzing={isAnalyzing}
        />
 
        <NewContractModal 
          isOpen={isNewContractModalOpen}
          onClose={() => setIsNewContractModalOpen(false)}
        />
      </main>
    </div>
  )
 }