import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css' // 必要に応じて CSS をインポート

const Header: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token') // ログイン状態を確認

  const handleLogout = () => {
    // TODO: ログアウトAPIを呼び出す処理を追加
    localStorage.removeItem('token')
    // ログアウト後のリダイレクト処理
    window.location.href = '/login' // 例: ログイン画面にリダイレクト
  }

  return (
    <header className="header">
      <div className="header-title">
        <Link to="/">Chronote</Link>
      </div>
      <nav className="header-nav">
        {isLoggedIn ? (
          <>
            <Link to="/anniversaries">記念日一覧</Link>
            <Link to="/categories">カテゴリ一覧</Link>
            <button onClick={handleLogout}>ログアウト</button>
          </>
        ) : (
          <>
            <Link to="/login">ログイン</Link>
            <Link to="/signup">新規登録</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
