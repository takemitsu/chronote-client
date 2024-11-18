import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signin } from '../services/api'
import { SigninRequest } from '../types/apiTypes'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import ErrorAlert from '../components/ErrorAlert'
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator.tsx'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      setIsLoading(true)
      const data: SigninRequest = { email, password }
      const response = await signin(data)

      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.user.id.toString())
      localStorage.setItem('redirectPath', '/anniversaries')

      navigate('/anniversaries')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'ログインに失敗しました')
      } else {
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage('ログインに失敗しました')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">ログイン</h1>
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <FormInput label="メールアドレス" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormInput
              label="パスワード"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default Login
