'use client'

import { useState } from 'react'
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
  ChevronDown
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function ContractViewer({ template, onStartFromTemplate }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [progress, setProgress] = useState(0)

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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const renderAnalysisSection = (title, content, icon, sectionKey) => {
    if (!content) return null
    
    const isExpanded = expandedSections[sectionKey] !== false
    
    // Remove the heading from the content
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const contentWithoutHeading = content.replace(new RegExp(`^\\*\\*${escapedTitle}\\*\\*:\\n?`, 'i'), '');
    
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
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-white">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-6 mb-3" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 my-4" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-gray-600 leading-relaxed" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-gray-800" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic text-gray-700" {...props} />
                  ),
                }}
              >
                {contentWithoutHeading}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contract Analysis</h2>
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

      {!template && !selectedFile ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-12">
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
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 h-screen">
          <div className="max-w-4xl mx-auto h-full overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-b-black"></div>
                <div className="text-center">
                  <p className="text-gray-600 font-medium">Analyzing your contract...</p>
                  <p className="text-gray-500 text-sm mt-1">This may take a few moments</p>
                </div>
              </div>
            ) : (
              <>
                {selectedFile && (
                  <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
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
                )}

                {analysis && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Analysis Results</h3>
                    {renderAnalysisSection(
                      'Key Dates and Deadlines',
                      analysis.keyDates,
                      <Clock className="h-5 w-5 text-blue-500" />, 'dates'
                    )}
                    {renderAnalysisSection(
                      'Important Clauses',
                      analysis.importantClauses,
                      <FileCheck className="h-5 w-5 text-green-500" />, 'clauses'
                    )}
                    {renderAnalysisSection(
                      'Potential Risks',
                      analysis.potentialRisks,
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />, 'risks'
                    )}
                    {renderAnalysisSection(
                      'Payment Terms',
                      analysis.paymentTerms,
                      <CreditCard className="h-5 w-5 text-purple-500" />, 'payment'
                    )}
                    {renderAnalysisSection(
                      'Termination Conditions',
                      analysis.terminationConditions,
                      <XCircle className="h-5 w-5 text-red-500" />, 'termination'
                    )}
                  </div>
                )}
                <div className="flex justify-end space-x-4 mt-8 sticky bottom-0 bg-gray-50 p-4 border-t">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                    Request Changes
                  </button>
                  <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-colors">
                    Sign Contract
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}