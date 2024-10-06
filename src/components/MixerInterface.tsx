import React, { useState, useEffect } from 'react'
import { Play, Pause, Download } from 'lucide-react'

interface MixerInterfaceProps {
  audioFile: File
}

const MixerInterface: React.FC<MixerInterfaceProps> = ({ audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null)
  const [gainNodes, setGainNodes] = useState<{ [key: string]: GainNode }>({})

  useEffect(() => {
    const context = new AudioContext()
    setAudioContext(context)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      const audioBuffer = await context.decodeAudioData(arrayBuffer)
      const source = context.createBufferSource()
      source.buffer = audioBuffer
      setSourceNode(source)

      const instruments = ['bass', 'drums', 'guitar', 'vocals']
      const newGainNodes = instruments.reduce((acc, instrument) => {
        const gainNode = context.createGain()
        source.connect(gainNode)
        gainNode.connect(context.destination)
        acc[instrument] = gainNode
        return acc
      }, {} as { [key: string]: GainNode })

      setGainNodes(newGainNodes)
    }
    reader.readAsArrayBuffer(audioFile)

    return () => {
      context.close()
    }
  }, [audioFile])

  const togglePlayPause = () => {
    if (isPlaying) {
      sourceNode?.stop()
      setIsPlaying(false)
    } else {
      const newSource = audioContext!.createBufferSource()
      newSource.buffer = sourceNode!.buffer
      Object.values(gainNodes).forEach(gainNode => newSource.connect(gainNode))
      newSource.start()
      setSourceNode(newSource)
      setIsPlaying(true)
    }
  }

  const handleSliderChange = (instrument: string, value: number) => {
    if (gainNodes[instrument]) {
      gainNodes[instrument].gain.setValueAtTime(value, audioContext!.currentTime)
    }
  }

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download functionality to be implemented')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Mixer Interface</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.keys(gainNodes).map((instrument) => (
          <div key={instrument}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              defaultValue="1"
              onChange={(e) => handleSliderChange(instrument, parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  )
}

export default MixerInterface