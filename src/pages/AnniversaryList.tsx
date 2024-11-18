import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAnniversaries, getCategories } from '../services/api'
import { Anniversary, Category } from '../types/apiTypes'
import AnniversaryItem from '../components/AnniversaryItem'
import ErrorAlert from '../components/ErrorAlert'
import axios from 'axios'

const AnniversaryList: React.FC = () => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchAnniversaries = async () => {
      try {
        const anniversaries = await getAnniversaries()
        setAnniversaries(anniversaries)
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || '記念日の取得に失敗しました')
        } else {
          console.error('予期せぬエラーが発生しました:', error)
          setErrorMessage('記念日の取得に失敗しました')
        }
      }
    }

    const fetchCategories = async () => {
      try {
        const categories = await getCategories()
        setCategories(
          categories.map((category: Category) => ({
            id: category.id!,
            name: category.name,
          })),
        )
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || 'カテゴリの取得に失敗しました')
        } else {
          console.error('予期せぬエラーが発生しました:', error)
          setErrorMessage('カテゴリの取得に失敗しました')
        }
      }
    }

    void fetchAnniversaries()
    void fetchCategories()
  }, [])

  const handleDeleteAnniversary = async (id: number) => {
    try {
      // TODO: API を使用して記念日を削除する処理を実装
      console.log(`記念日 ${id} を削除`)

      setAnniversaries(anniversaries.filter((anniversary) => anniversary.id !== id))
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || '記念日の削除に失敗しました')
      } else {
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage('記念日の削除に失敗しました')
      }
    }
  }

  const groupedAnniversaries = anniversaries.reduce(
    (acc, anniversary) => {
      const categoryId = anniversary.categoryId
      if (!acc[categoryId]) {
        acc[categoryId] = []
      }
      acc[categoryId].push(anniversary)
      return acc
    },
    {} as Record<number, Anniversary[]>,
  )

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">記念日一覧</h1>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <Link
        to="/anniversaries/new"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
        新規登録
      </Link>
      {Object.entries(groupedAnniversaries).map(([categoryId, anniversaries]) => (
        <div key={categoryId} className="mb-8">
          <h2 className="text-xl font-bold mb-4 mt-4">
            カテゴリ {categories.find((category) => category.id === Number(categoryId))?.name}
          </h2>
          <ul className="space-y-4">
            {anniversaries.map((anniversary) => (
              <li key={anniversary.id}>
                <AnniversaryItem anniversary={anniversary} onDelete={handleDeleteAnniversary} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default AnniversaryList
