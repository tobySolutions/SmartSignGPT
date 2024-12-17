'use client'

import { useState } from 'react'
import { X, Upload, FileText, Loader, Edit2, Check, ChevronDown, Download } from 'lucide-react'
import { CONTRACT_TYPES } from '@/app/lib/contractTemplates'
import { saveAs } from 'file-saver'
import { pdf } from '@react-pdf/renderer'
import { ContractPDF } from '../pdf/ContractPDF'

const ContractSection = ({ title, content, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const handleSave = () => {
    onEdit(title, editedContent)
    setIsEditing(false)
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isEditing ? <Check onClick={handleSave} /> : <Edit2 size={18} />}
        </button>
      </div>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
        />
      ) : (
        <div className="text-gray-600 whitespace-pre-wrap">{content}</div>
      )}
    </div>
  );
};

const PartyInfo = ({ party, role, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedParty, setEditedParty] = useState(party)

  const handleSave = () => {
    onEdit(role.toLowerCase(), editedParty)
    setIsEditing(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">{role}:</span>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isEditing ? <Check onClick={handleSave} /> : <Edit2 size={18} />}
        </button>
      </div>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedParty.name}
            onChange={(e) => setEditedParty({ ...editedParty, name: e.target.value })}
            placeholder="Name"
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
          <input
            type="text"
            value={editedParty.role}
            onChange={(e) => setEditedParty({ ...editedParty, role: e.target.value })}
            placeholder="Role/Title"
            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
        </div>
      ) : (
        <div className="text-sm space-y-1">
          <div className="text-gray-600">{party.name}</div>
          <div className="text-gray-500">{party.role}</div>
        </div>
      )}
    </div>
  );
};

export default function NewContractModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [contractData, setContractData] = useState({
    title: '',
    type: '',
    template: '',
    dueDate: '',
    content: null
  })

  const handleContractEdit = (type, updates) => {
    setContractData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        ...updates
      }
    }));
  }

  const handleSectionEdit = (sectionTitle, newContent) => {
    setContractData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.map(section =>
          section.title === sectionTitle
            ? { ...section, content: newContent }
            : section
        )
      }
    }));
  }

  const handlePartyEdit = (partyKey, updates) => {
    setContractData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        parties: {
          ...prev.content.parties,
          [partyKey]: updates
        }
      }
    }));
  }

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
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate contract');
      }
      
      setContractData(prev => ({
        ...prev,
        content: data.contract
      }));

      setStep(2);
    } catch (error) {
      console.error('Error generating contract:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadPDF = async () => {
    try {
      // Generate PDF blob
      const blob = await pdf(<ContractPDF contract={contractData.content} />).toBlob();
      
      // Generate filename
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${contractData.content.title.replace(/\s+/g, '-')}-${timestamp}.pdf`;
      
      // Download the file
      saveAs(blob, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const saveContract = async () => {
    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          data: {
            contract: contractData.content,
            updates: {
              lastModified: new Date().toISOString()
            }
          }
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to save contract');
      }

      // Download PDF after successful save
      await downloadPDF();
      onClose();
    } catch (error) {
      console.error('Error saving contract:', error);
    }
  };

  const handleClose = () => {
    setStep(1);
    setContractData({
      title: '',
      type: '',
      template: '',
      dueDate: '',
      content: null
    });
    onClose();
  };

  const renderContractPreview = () => {
    const contract = contractData.content;
    if (!contract) return null;

    return (
      <div className="space-y-8">
        {/* Contract Header */}
        <div className="text-center border-b pb-6">
          <div className="flex justify-center items-center space-x-2">
            <h2 className="text-2xl font-bold">{contract.title}</h2>
            <button
              onClick={() => handleContractEdit('title', { title: window.prompt('Enter new title:', contract.title) })}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Edit2 size={18} />
            </button>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            <span>Effective Date: </span>
            <input
              type="date"
              value={contract.effectiveDate}
              onChange={(e) => handleContractEdit('effectiveDate', { effectiveDate: e.target.value })}
              className="border-none bg-transparent focus:ring-0"
            />
          </div>
        </div>

        {/* Parties */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Parties</h3>
          <div className="grid grid-cols-2 gap-6">
            <PartyInfo 
              party={contract.parties.party1}
              role="First Party"
              onEdit={(_, updates) => handlePartyEdit('party1', updates)}
            />
            <PartyInfo
              party={contract.parties.party2}
              role="Second Party"
              onEdit={(_, updates) => handlePartyEdit('party2', updates)}
            />
          </div>
        </div>

        {/* Contract Sections */}
        <div className="space-y-6">
          {contract.sections.map((section, index) => (
            <ContractSection 
              key={index}
              title={section.title}
              content={section.content}
              onEdit={handleSectionEdit}
            />
          ))}
        </div>

        {/* Termination */}
        <ContractSection 
          title="Termination"
          content={contract.termination}
          onEdit={(_, content) => handleContractEdit('termination', { termination: content })}
        />

        {/* Signatures */}
        <div className="border-t pt-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Signatures</h3>
          <div className="grid grid-cols-2 gap-8">
            {Object.entries(contract.signatures).map(([party, info], index) => (
              <div key={party} className="border-t pt-4">
                <div className="text-sm text-gray-600 mb-1">
                  <input
                    type="text"
                    value={info.title}
                    onChange={(e) => handleContractEdit('signatures', {
                      signatures: {
                        ...contract.signatures,
                        [party]: { ...info, title: e.target.value }
                      }
                    })}
                    className="border-none bg-transparent focus:ring-0 w-full"
                  />
                </div>
                <div className="font-medium">
                  <input
                    type="text"
                    value={info.name}
                    onChange={(e) => handleContractEdit('signatures', {
                      signatures: {
                        ...contract.signatures,
                        [party]: { ...info, name: e.target.value }
                      }
                    })}
                    className="border-none bg-transparent focus:ring-0 w-full"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <input
                    type="date"
                    value={info.date}
                    onChange={(e) => handleContractEdit('signatures', {
                      signatures: {
                        ...contract.signatures,
                        [party]: { ...info, date: e.target.value }
                      }
                    })}
                    className="border-none bg-transparent focus:ring-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const selectedType = CONTRACT_TYPES[contractData.type];
  const templates = selectedType?.templates || {};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Create New Contract</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contract Form */}
        {step === 1 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Title
                </label>
                <input
                  type="text"
                  value={contractData.title}
                  onChange={(e) => setContractData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="Enter contract title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Type
                </label>
                <select
                  value={contractData.type}
                  onChange={(e) => {
                    setContractData(prev => ({
                      ...prev,
                      type: e.target.value,
                      template: '' // Reset template when type changes
                    }))
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select type</option>
                  {Object.entries(CONTRACT_TYPES).map(([key, type]) => (
                    <option key={key} value={key}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={contractData.dueDate}
                  onChange={(e) => setContractData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <select
                  value={contractData.template}
                  onChange={(e) => setContractData(prev => ({ ...prev, template: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  disabled={!contractData.type}
                >
                  <option value="">Select template</option>
                  {Object.entries(templates).map(([key, template]) => (
                    <option key={key} value={key}>{template.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {contractData.type && contractData.template && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Template Sections:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {templates[contractData.template].sections.map((section, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronDown size={14} className="mr-2" />
                      {section}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={generateContractWithAI}
              disabled={isGenerating || !contractData.type || !contractData.template || !contractData.title}
              className="w-full mt-6 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-black/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FileText size={20} />
                  <span>Generate Contract</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="w-full p-6 border border-gray-300 rounded-lg overflow-y-auto bg-white">
                {renderContractPreview()}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={downloadPDF}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}