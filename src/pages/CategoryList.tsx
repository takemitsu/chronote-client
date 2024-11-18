import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../services/api'
import CategoryItem from '../components/CategoryItem'
import axios from 'axios'
import { Category } from '../types/apiTypes.ts'
import ErrorAlert from '../components/ErrorAlert'
import LoadingIndicator from '../components/LoadingIndicator.tsx'

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories()
        setCategories(categories)
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || 'カテゴリの取得に失敗しました')
        } else {
          console.error('予期せぬエラーが発生しました:', error)
          setErrorMessage('カテゴリの取得に失敗しました')
        }
      } finally {
        setIsLoading(false)
      }
    }

    void fetchCategories()
  }, [])

  const handleDeleteCategory = async (id: number) => {
    try {
      // TODO: API を使用してカテゴリを削除する処理を実装
      console.log(`カテゴリ ${id} を削除`)

      // 削除に成功したら、state を更新
      setCategories(categories.filter((category) => category.id !== id))
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'カテゴリの削除に失敗しました')
      } else {
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage('カテゴリの削除に失敗しました')
      }
    }
  }

  return (
    <div className="container mx-auto p-8">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">カテゴリ一覧</h1>
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <Link
            to="/categories/new"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
            新規登録
          </Link>
          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category.id}>
                <CategoryItem category={category} onDelete={handleDeleteCategory} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default CategoryList
