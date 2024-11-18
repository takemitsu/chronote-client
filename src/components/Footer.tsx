import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 py-4 shadow-md mt-8">
      <div className="container mx-auto text-center text-gray-600">&copy; {currentYear} Chronote</div>
    </footer>
  )
}

export default Footer
