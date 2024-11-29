// app/components/dashboard/ContractViewer.js
'use client'

import { useState } from 'react'
import { FileText, Download, Share2, AlertCircle, Upload } from 'lucide-react'

export default function ContractViewer({ template, onStartFromTemplate }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setLoading(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/analyze-pdf', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setSelectedFile(file)
      setAnalysis(data.analysis)
    } catch (error) {
      console.error('Upload error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!template && !selectedFile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-12">
        <div className="text-center max-w-md">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload a Contract</h3>
          <p className="text-gray-500 mb-4">Upload a PDF contract to get AI-powered analysis</p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 cursor-pointer"
          >
            Select PDF
          </label>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {selectedFile && (
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Download className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            {analysis && (
              <div className="mb-8 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Analysis Results</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Document Details</h4>
                    <div className="prose prose-sm">
                      <p>{analysis.text}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Key Points</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {analysis.keyPoints?.map((point, index) => (
                        <li key={index} className="text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {analysis.recommendations?.map((rec, index) => (
                        <li key={index} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Request Changes
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                Sign Contract
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}