import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
      navigate('/categories')
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? 'カテゴリ編集' : 'カテゴリ登録'}</h1>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <FormInput label="カテゴリ名" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button type="submit" className="w-full">
          {isEditing ? '更新' : '登録'}
        </Button>
        <Link // カテゴリ一覧に戻る Link を追加
          to="/categories"
          className="mt-2 block w-full text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          カテゴリ一覧に戻る
        </Link>
      </form>
    </div>
  )
}

export default CategoryForm
