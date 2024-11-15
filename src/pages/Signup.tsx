import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/api'
import { SignupRequest } from '../types/apiTypes'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import ErrorAlert from '../components/ErrorAlert'
import axios from 'axios'

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      const data: SignupRequest = { name, email, password }
      await signup(data)

      // 登録成功時の処理
      navigate('/login')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // AxiosError 型の場合のエラー処理
        setErrorMessage(error.response?.data?.message || '登録に失敗しました')
      } else {
        // 予期せぬエラーの場合の処理
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage('登録に失敗しました')
      }
    }
  }

  return (
    <div>
      <h1>新規登録</h1>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <form onSubmit={handleSubmit}>
        <FormInput label="ユーザー名" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label="メールアドレス" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput
          label="パスワード"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">登録</Button>
      </form>
    </div>
  )
}

export default Signup
