import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createCategory, getCategory, updateCategory } from '../services/api'
import { Category } from '../types/apiTypes'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import ErrorAlert from '../components/ErrorAlert'
import axios from 'axios'

const CategoryForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const [name, setName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchCategory = async () => {
      if (isEditing) {
        try {
          const category = await getCategory(Number(id))
          setName(category.name)
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data?.message || 'カテゴリの取得に失敗しました')
          } else {
            console.error('予期せぬエラーが発生しました:', error)
            setErrorMessage('カテゴリの取得に失敗しました')
          }
        }
      }
    }
    void fetchCategory()
  }, [id, isEditing])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      // localStorage から userId を取得
      const userId = localStorage.getItem('userId')
      if (!userId) {
        setErrorMessage('ユーザーIDが取得できませんでした')
        return
      }

      const data: Category = { name, userId: Number(userId) }
      if (isEditing) {
        await updateCategory(Number(id), data)
      } else {
        await createCategory(data)
      }
      navigate('/categories') // カテゴリ一覧画面にリダイレクト
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || (isEditing ? 'カテゴリの更新に失敗しました' : 'カテゴリの登録に失敗しました'),
        )
      } else {
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage(isEditing ? 'カテゴリの更新に失敗しました' : 'カテゴリの登録に失敗しました')
      }
    }
  }

  return (
    <div>
      <h1>{isEditing ? 'カテゴリ編集' : 'カテゴリ登録'}</h1>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <form onSubmit={handleSubmit}>
        <FormInput label="カテゴリ名" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button type="submit">{isEditing ? '更新' : '登録'}</Button>
      </form>
    </div>
  )
}

export default CategoryForm
