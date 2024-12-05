'use client'

import { useState, useRef } from 'react'
import { 
  FileText, 
  Download, 
  Share2, 
  Clock, 
  FileCheck, 
  AlertTriangle, 
  CreditCard, 
  XCircle, 
  Upload,
  ChevronDown,
  MessageSquare,
  Send
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import SignatureModal from './SignatureModal'

export default function ContractViewer({ template, onStartFromTemplate }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [progress, setProgress] = useState(0)
  const [showSignature, setShowSignature] = useState(false)
  const [signatureData, setSignatureData] = useState(null)
  const [showRequestChanges, setShowRequestChanges] = useState(false)
  const [requestMessage, setRequestMessage] = useState('')

  const simulateProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 500)

    return () => clearInterval(interval)
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setLoading(true)
    setError(null)
    const cleanup = simulateProgress()
    
    const formData = new FormData()
    formData.append('pdf', file)

    try {
      const response = await fetch('/api/analyze-pdf', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setProgress(100)
      setSelectedFile(file)
      setAnalysis(data.analysis)
    } catch (error) {
      console.error('Upload error:', error)
      setError(error.message)
    } finally {
      cleanup()
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 500)
    }
  }

  const handleSignatureSave = (data) => {
    setSignatureData(data)
    setShowSignature(false)
    // Here you would typically submit the signed document
    console.log('Document signed:', data)
  }

  const handleRequestChanges = async () => {
    try {
      // Here you would make an API call to submit the change request
      console.log('Requesting changes:', requestMessage)
      setShowRequestChanges(false)
      setRequestMessage('')
      // Show success message
    } catch (error) {
      console.error('Error requesting changes:', error)
      // Show error message
    }
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const renderAnalysisSection = (title, content, icon, sectionKey) => {
    if (!content) return null
    
    const isExpanded = expandedSections[sectionKey] !== false
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const contentWithoutHeading = content.replace(new RegExp(`^\\*\\*${escapedTitle}\\*\\*:\\n?`, 'i'), '')
    
    return (
      <div className="mb-6 rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-white shadow-sm">
              {icon}
            </div>
            <h4 className="font-medium ml-3 text-lg">{title}</h4>
          </div>
          <ChevronDown 
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isExpanded ? 'transform rotate-180' : ''
            }`} 
          />
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-white">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{contentWithoutHeading}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Template view
  if (template) {
    return (
      <div className="bg-white rounded-lg shadow-sm" style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{template.title}</h2>
              <p className="text-gray-600 mt-1">{template.description}</p>
            </div>
            <button
              onClick={() => onStartFromTemplate(template)}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Use Template
            </button>
          </div>
          <div className="mt-6 font-mono text-sm bg-gray-50 p-6 rounded-lg whitespace-pre-wrap">
            {template.content}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm" style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {loading && (
          <div className="w-full h-1 bg-gray-200">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {!selectedFile ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="p-6 bg-white rounded-xl shadow-sm mb-6">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload a Contract</h3>
              <p className="text-gray-600 mb-6">Upload a PDF contract to get instant AI-powered analysis of key terms, dates, and potential risks</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-black hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Select PDF File
              </label>
            </div>
            {error && (
              <div className="flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50">
                <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-b-black"></div>
              <div className="text-center">
                <p className="text-gray-600 font-medium">Analyzing your contract...</p>
                <p className="text-gray-500 text-sm mt-1">This may take a few moments</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-900">{selectedFile.name}</span>
                      <p className="text-xs text-gray-500 mt-1">PDF Document</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {analysis && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Analysis Results</h3>
                  {renderAnalysisSection(
                    'Key Dates and Deadlines',
                    analysis.keyDates,
                    <Clock className="h-5 w-5 text-blue-500" />,
                    'dates'
                  )}
                  {renderAnalysisSection(
                    'Important Clauses',
                    analysis.importantClauses,
                    <FileCheck className="h-5 w-5 text-green-500" />,
                    'clauses'
                  )}
                  {renderAnalysisSection(
                    'Potential Risks',
                    analysis.potentialRisks,
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />,
                    'risks'
                  )}
                  {renderAnalysisSection(
                    'Payment Terms',
                    analysis.paymentTerms,
                    <CreditCard className="h-5 w-5 text-purple-500" />,
                    'payment'
                  )}
                  {renderAnalysisSection(
                    'Termination Conditions',
                    analysis.terminationConditions,
                    <XCircle className="h-5 w-5 text-red-500" />,
                    'termination'
                  )}
                </div>
              )}

              <div className="flex justify-end space-x-4 mt-8 sticky bottom-0 bg-white p-4 border-t">
                <button 
                  onClick={() => setShowRequestChanges(true)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Request Changes
                </button>
                <button 
                  onClick={() => setShowSignature(true)}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors flex items-center"
                >
                  Sign Contract
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Request Changes Modal */}
      {showRequestChanges && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Request Changes</h2>
              <button 
                onClick={() => setShowRequestChanges(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="Describe the changes needed..."
              className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRequestChanges(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      <SignatureModal
        isOpen={showSignature}
        onClose={() => setShowSignature(false)}
        onSave={handleSignatureSave}
      />
    </div>
  )
}