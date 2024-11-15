import React from 'react'
import './Footer.css' // 必要に応じて CSS をインポート

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Chronote</p>
      </div>
    </footer>
  )
}

export default Footer
