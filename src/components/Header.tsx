import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token')
  const [isMenuOpen, setIsMenuOpen] = useState(false) // モバイルメニューの状態

  const handleLogout = () => {
    if (window.confirm('ログアウトしますか？')) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      window.location.href = '/login'
    }
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false) // リンクをクリックしたらメニューを閉じる
  }

  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Chronote
        </Link>
        {/* モバイルメニューボタン */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {/* PC用メニュー */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/anniversaries" className="hover:text-blue-500" onClick={handleLinkClick}>
                記念日一覧
              </Link>
              <Link to="/categories" className="hover:text-blue-500">
                カテゴリ一覧
              </Link>
              <button onClick={handleLogout} className="hover:text-red-500">
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500">
                ログイン
              </Link>
              <Link to="/signup" className="hover:text-blue-500">
                新規登録
              </Link>
            </>
          )}
        </div>
        {/* モバイル用メニュー */}
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-16 right-4 bg-white py-2 px-4 rounded shadow-md`}>
          {isLoggedIn ? (
            <>
              <Link to="/anniversaries" className="block py-2 hover:text-blue-500" onClick={handleLinkClick}>
                記念日一覧
              </Link>
              <Link to="/categories" className="block py-2 hover:text-blue-500" onClick={handleLinkClick}>
                カテゴリ一覧
              </Link>
              <button onClick={handleLogout} className="block py-2 hover:text-red-500">
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 hover:text-blue-500" onClick={handleLinkClick}>
                ログイン
              </Link>
              <Link to="/signup" className="block py-2 hover:text-blue-500" onClick={handleLinkClick}>
                新規登録
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
