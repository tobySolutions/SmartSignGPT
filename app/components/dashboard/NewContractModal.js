'use client'

import { useState } from 'react'
import { X, Upload, FileText, Loader } from 'lucide-react'

export default function NewContractModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState(null)
  const [contractData, setContractData] = useState({
    title: '',
    type: '',
    recipients: '',
    dueDate: '',
    template: '',
    content: ''
  })

  const generateContractWithAI = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          data: {
            type: contractData.type,
            details: {
              title: contractData.title,
              template: contractData.template,
              dueDate: contractData.dueDate,
            }
          }
        })
      });

      const data = await response.json();
      setContractData(prev => ({
        ...prev,
        content: data.contract
      }));

      // Get AI analysis
      const analysisResponse = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze',
          data: { contractText: data.contract }
        })
      });

      const analysisData = await analysisResponse.json();
      setAiSuggestions(analysisData.analysis);

      // Automatically move to step 2 after generation is complete
      setStep(2);

    } catch (error) {
      console.error('Error generating contract:', error);
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create New Contract</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center items-center">
            {[1, 2].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${step >= num ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {num}
                </div>
                {num === 1 && (
                  <div className={`w-24 h-1 mx-2 ${
                    step > 1 ? 'bg-black' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            {step === 1 ? 'Contract Details' : 'Content & Recipients'}
          </div>
        </div>

        {/* Step 1: Contract Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contract Title
              </label>
              <input
                type="text"
                value={contractData.title}
                onChange={(e) => setContractData({ ...contractData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
                placeholder="e.g., Employment Agreement"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contract Type
              </label>
              <select
                value={contractData.type}
                onChange={(e) => setContractData({ ...contractData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
              >
                <option value="">Select type</option>
                <option value="employment">Employment Contract</option>
                <option value="nda">Non-Disclosure Agreement</option>
                <option value="service">Service Agreement</option>
                <option value="sales">Sales Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Use Template
              </label>
              <select
                value={contractData.template}
                onChange={(e) => setContractData({ ...contractData, template: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
              >
                <option value="">Start from scratch</option>
                <option value="standard_employment">Standard Employment Contract</option>
                <option value="basic_nda">Basic NDA</option>
                <option value="service_agreement">Service Agreement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={contractData.dueDate}
                onChange={(e) => setContractData({ ...contractData, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
              />
            </div>

            <button
              onClick={generateContractWithAI}
              disabled={isGenerating}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader className="animate-spin mr-2" size={16} />
                  Generating...
                </>
              ) : 'Generate with AI'}
            </button>

            {aiSuggestions && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <div className="prose prose-sm">
                  {aiSuggestions}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Content & Recipients */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contract Content
              </label>
              {contractData.content ? (
                <div className="mt-1">
                  <textarea
                    value={contractData.content}
                    onChange={(e) => setContractData({ ...contractData, content: e.target.value })}
                    rows={12}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
                  />
                </div>
              ) : (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-700">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipients
              </label>
              <input
                type="text"
                value={contractData.recipients}
                onChange={(e) => setContractData({ ...contractData, recipients: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black"
                placeholder="Enter email addresses (separated by commas)"
              />
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-8 flex justify-end space-x-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          <button
            onClick={() => {
              if (step === 1) {
                setStep(2)
              } else {
                // Handle contract creation
                console.log('Contract Data:', contractData)
                onClose()
              }
            }}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            {step === 1 ? 'Next' : 'Create Contract'}
          </button>
        </div>
      </div>
    </div>
  )
}