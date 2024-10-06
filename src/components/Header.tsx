import React from 'react'
import { Music, Home, User } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Music size={24} />
          <span className="text-xl font-bold">MixMaster</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200"><Home size={20} /></a></li>
            <li><a href="#" className="hover:text-blue-200"><User size={20} /></a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header