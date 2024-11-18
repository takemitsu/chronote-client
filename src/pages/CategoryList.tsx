import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deleteCategory, getCategories } from '../services/api'
import CategoryItem from '../components/CategoryItem'
import axios from 'axios'
import { Category } from '../types/category.ts'
import ErrorAlert from '../components/ErrorAlert'
import LoadingIndicator from '../components/LoadingIndicator.tsx'
import Modal from '../components/Modal.tsx'
import Button from '../components/Button.tsx'

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)

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
    setDeleteTargetId(id) // 削除対象のIDをstateに設定
  }

  const handleCloseModal = () => {
    setDeleteTargetId(null) // モーダルを閉じる際に削除対象IDをnullに戻す
  }

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null) return // 削除対象IDがnullの場合は何もしない

    try {
      setIsLoading(true) // ローディング状態をtrueに設定
      await deleteCategory(deleteTargetId) // APIでカテゴリを削除
      setCategories(categories.filter((category) => category.id !== deleteTargetId)) // stateを更新
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'カテゴリの削除に失敗しました')
      } else {
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage('カテゴリの削除に失敗しました')
      }
    } finally {
      setIsLoading(false) // ローディング状態をfalseに設定
      setDeleteTargetId(null) // 削除対象IDをnullに戻す
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
      <Modal
        isOpen={deleteTargetId !== null} // 削除対象IDがnullでない場合にモーダルを表示
        onClose={handleCloseModal}
        title="カテゴリ削除の確認">
        <p className="mb-4">
          カテゴリ「
          {categories.find((c) => c.id === deleteTargetId)?.name}」を削除しますか？
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

export default CategoryList
