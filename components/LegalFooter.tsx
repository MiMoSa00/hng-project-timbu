// LegalFooter.tsx - Create this as a separate component
import React from 'react'

export default function LegalFooter(): React.ReactElement {
  return (
    <div className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
          {/* Legal Links */}
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="text-black">Privacy Policy</a>
            <span className="text-black">•</span>
            <a href="#" className="text-black">Terms of Service</a>
          </div>
          
          {/* Copyright */}
          <p className="text-black text-sm">
            © 2024 TIMBU.
          </p>
        </div>
      </div>
    </div>
  )
}