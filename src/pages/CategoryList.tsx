import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../services/api'
import CategoryItem from '../components/CategoryItem'
import axios from 'axios'
import { Category } from '../types/apiTypes.ts'

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
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
    <div>
      <h1>カテゴリ一覧</h1>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Link to="/categories/new">新規登録</Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryItem category={category} onDelete={handleDeleteCategory} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
