import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AnniversaryList from './pages/AnniversaryList'
import AnniversaryForm from './pages/AnniversaryForm'
import CategoryList from './pages/CategoryList'
import CategoryForm from './pages/CategoryForm'
import Header from './components/Header'
import Footer from './components/Footer'

const AppRouter: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const redirectPath = localStorage.getItem('redirectPath')
    if (redirectPath) {
      navigate(redirectPath)
      localStorage.removeItem('redirectPath')
    }
  }, [navigate])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-8">
        <Routes>
          <Route path="/" element={<Home />} />
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
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
