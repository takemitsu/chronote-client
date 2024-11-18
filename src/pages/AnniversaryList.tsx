import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteAnniversary, getAnniversaries, getCategories } from '../services/api'
import { Anniversary, Category } from '../types/apiTypes'
import AnniversaryItem from '../components/AnniversaryItem'
import ErrorAlert from '../components/ErrorAlert'
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator.tsx'
import Modal from '../components/Modal.tsx'
import Button from '../components/Button.tsx'

const AnniversaryList: React.FC = () => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)

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
      } finally {
        setIsLoading(false)
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

  const handleDeleteAnniversary = (id: number) => {
    setDeleteTargetId(id) // 削除対象の記念日IDをstateに設定
  }

  const handleCloseModal = () => {
    setDeleteTargetId(null) // モーダルを閉じる際に削除対象IDをnullに戻す
  }

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null) return // 削除対象IDがnullの場合は何もしない

    try {
      setIsLoading(true)
      await deleteAnniversary(deleteTargetId) // API で記念日を削除
      setAnniversaries(anniversaries.filter((anniversary) => anniversary.id !== deleteTargetId))
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || '記念日の削除に失敗しました')
      } else {
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage('記念日の削除に失敗しました')
      }
    } finally {
      setIsLoading(false)
      setDeleteTargetId(null)
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
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
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
        </>
      )}
      <Modal
        isOpen={deleteTargetId !== null} // 削除対象IDがnullでない場合にモーダルを表示
        onClose={handleCloseModal}
        title="記念日削除の確認">
        <p className="mb-4">
          記念日「
          {anniversaries.find((anniversary) => anniversary.id === deleteTargetId)?.name}
          」を削除しますか？
        </p>
        <div className="flex justify-end">
          <Button onClick={handleCloseModal} className="mr-2">
            キャンセル
          </Button>
          <Button onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-700">
            削除
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default AnniversaryList
