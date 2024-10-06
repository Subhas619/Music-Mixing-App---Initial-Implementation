import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 MixMaster. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-blue-300 hover:text-blue-100 mr-4">Privacy Policy</a>
          <a href="#" className="text-blue-300 hover:text-blue-100">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer