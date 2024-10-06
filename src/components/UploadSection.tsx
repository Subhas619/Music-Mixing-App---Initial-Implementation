import React, { useCallback } from 'react'
import { Upload } from 'lucide-react'

interface UploadSectionProps {
  onFileUpload: (file: File) => void
}

const UploadSection: React.FC<UploadSectionProps> = ({ onFileUpload }) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/mp4')) {
      onFileUpload(file)
    }
  }, [onFileUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/mp4')) {
      onFileUpload(file)
    }
  }, [onFileUpload])

  return (
    <div
      className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Upload size={48} className="mx-auto text-blue-500 mb-4" />
      <p className="mb-4">Drag & drop your MP3/MP4 file here, or click to select</p>
      <input
        type="file"
        accept=".mp3,.mp4"
        onChange={handleFileInput}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
      >
        Select File
      </label>
    </div>
  )
}

export default UploadSection