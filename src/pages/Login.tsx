import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signin } from '../services/api'
import { SigninRequest } from '../types/apiTypes'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import ErrorAlert from '../components/ErrorAlert'
import axios from 'axios'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      const data: SigninRequest = { email, password }
      const response = await signin(data)

      // ログイン成功時の処理 (例: JWT を localStorage に保存)
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.user.id.toString())
      localStorage.setItem('redirectPath', '/anniversaries')

      // 記念日一覧画面にリダイレクト
      navigate('/anniversaries')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // AxiosError 型の場合のエラー処理
        setErrorMessage(error.response?.data?.message || 'ログインに失敗しました')
      } else {
        // 予期せぬエラーの場合の処理
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage('ログインに失敗しました')
      }
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <form onSubmit={handleSubmit}>
        <FormInput label="メールアドレス" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput
          label="パスワード"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">ログイン</Button>
      </form>
    </div>
  )
}

export default Login
