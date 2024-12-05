'use client'

// app/routes/dashboard/page.js - Update these import lines
import { useState, useEffect } from 'react'
import { MenuIcon, Search, Bell, Plus } from 'lucide-react'
import Sidebar from '@/app/components/dashboard/Sidebar'
import ContractList from '@/app/components/dashboard/ContractList'
import ContractViewer from '@/app/components/dashboard/ContractViewer'
import NewContractModal from '@/app/components/dashboard/NewContractModal'
import PDFUploader from '@/app/components/dashboard/PDFUploader'
import { contractTemplates } from '@/app/data/contractTemplates'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false)
  const [showPDFUploader, setShowPDFUploader] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartFromTemplate = (template) => {
    setIsNewContractModalOpen(true)
  }

  const filteredTemplates = contractTemplates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 h-16 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-200 rounded-full">
            <MenuIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold ml-4">SmartSignGPT</h1>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <Search className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowPDFUploader(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload PDF
          </button>
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
            selectedTemplate={selectedTemplate}
          />
        )}

        <ContractList
          templates={filteredTemplates}
          onSelectTemplate={setSelectedTemplate}
          className="flex-1 overflow-y-auto bg-white"
        />

        {showPDFUploader ? (
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Upload Contract for Analysis</h2>
              <button 
                onClick={() => setShowPDFUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <PDFUploader />
          </div>
        ) : (
          <ContractViewer 
            template={selectedTemplate}
            onStartFromTemplate={handleStartFromTemplate}
            className="flex-1 bg-white p-6 rounded-lg shadow-lg"
          />
        )}

        {/* New Contract Modal */}
        <NewContractModal 
          isOpen={isNewContractModalOpen}
          onClose={() => setIsNewContractModalOpen(false)}
          template={selectedTemplate}
        />
      </main>

      {/* Footer - Optional */}
      <footer className="bg-white border-t px-4 py-3 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>© 2024 SmartSignGPT. All rights reserved.</p>
          <div className="flex space-x-4">
            <button className="hover:text-black">Terms</button>
            <button className="hover:text-black">Privacy</button>
            <button className="hover:text-black">Help</button>
          </div>
        </div>
      </footer>
    </div>
  )
}