import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AnniversaryList from './pages/AnniversaryList'
import AnniversaryForm from './pages/AnniversaryForm'
import CategoryForm from './pages/CategoryForm'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css' // 必要に応じて CSS をインポート
import CategoryList from './pages/CategoryList.tsx'

const AppRouter: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const redirectPath = localStorage.getItem('redirectPath')
    if (redirectPath) {
      navigate(redirectPath)
      localStorage.removeItem('redirectPath') // リダイレクト後に削除
    }
  }, [navigate])

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/anniversaries" element={<AnniversaryList />} />
          <Route path="/anniversaries/new" element={<AnniversaryForm />} />
          <Route path="/anniversaries/:id/edit" element={<AnniversaryForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<CategoryForm />} />
          <Route path="/categories/:id/edit" element={<CategoryForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
