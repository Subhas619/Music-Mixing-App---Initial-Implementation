import React, { useState } from 'react'
import { Music, Upload, Home, User } from 'lucide-react'
import Header from './components/Header'
import UploadSection from './components/UploadSection'
import MixerInterface from './components/MixerInterface'
import UserInteractions from './components/UserInteractions'
import Footer from './components/Footer'

function App() {
  const [currentAudio, setCurrentAudio] = useState<File | null>(null)

  const handleFileUpload = (file: File) => {
    setCurrentAudio(file)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <UploadSection onFileUpload={handleFileUpload} />
        {currentAudio && <MixerInterface audioFile={currentAudio} />}
        <UserInteractions />
      </main>
      <Footer />
    </div>
  )
}

export default App