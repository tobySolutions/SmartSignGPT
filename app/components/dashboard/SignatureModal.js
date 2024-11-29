// app/components/dashboard/SignatureModal.js
'use client'

import { useState } from 'react'
import SignaturePad from 'react-signature-canvas'

export default function SignatureModal({ isOpen, onClose, onSave }) {
  const [signatureType, setSignatureType] = useState('draw')
  const [signature, setSignature] = useState('')
  const [selectedFont, setSelectedFont] = useState('dancing-script')

  const fonts = [
    { name: 'Dancing Script', value: 'dancing-script' },
    { name: 'Homemade Apple', value: 'homemade-apple' },
    { name: 'Alex Brush', value: 'alex-brush' }
  ]

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="p-6 bg-white rounded-lg">
        <div className="mb-4">
          <select 
            value={signatureType}
            onChange={(e) => setSignatureType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="draw">Draw Signature</option>
            <option value="type">Type Signature</option>
            <option value="upload">Upload Signature</option>
          </select>
        </div>

        {signatureType === 'draw' && (
          <SignaturePad
            canvasProps={{ className: 'signature-canvas' }}
            onEnd={() => setSignature(sigPad.toDataURL())}
          />
        )}

        {signatureType === 'type' && (
          <>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="mb-4"
            >
              {fonts.map(font => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              onChange={(e) => setSignature(e.target.value)}
              className={`w-full p-2 border rounded font-${selectedFont}`}
              placeholder="Type your signature"
            />
          </>
        )}

        {signatureType === 'upload' && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = (e) => setSignature(e.target.result);
              reader.readAsDataURL(file);
            }}
            className="w-full"
          />
        )}

        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose}>Cancel</button>
          <button 
            onClick={() => onSave(signature)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Apply Signature
          </button>
        </div>
      </div>
    </div>
  )
}