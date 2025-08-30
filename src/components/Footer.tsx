import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="max-w-screen-xl mx-auto text-center">
        <p>&copy; 2025 Patentize. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="/privacy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
