import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createAnniversary, getAnniversary, updateAnniversary, getCategories } from '../services/api'
import { Anniversary } from '../types/apiTypes'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import ErrorAlert from '../components/ErrorAlert'
import DatePicker from '../components/DatePicker'
import { Category } from '../types/category'
import axios from 'axios'
import CategorySelect from '../components/CategorySelect.tsx'
import { format } from 'date-fns' // Category型をインポート

const AnniversaryForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const [name, setName] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState<number>(() => categories[0]?.id || 0)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchAnniversary = async () => {
      if (isEditing) {
        try {
          const anniversary = await getAnniversary(Number(id))
          setName(anniversary.name)
          setCategoryId(anniversary.categoryId)
          setDate(new Date(anniversary.date))
          setDescription(anniversary.description || '')
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data?.message || '記念日の取得に失敗しました')
          } else {
            console.error('予期せぬエラーが発生しました:', error)
            setErrorMessage('記念日の取得に失敗しました')
          }
        }
      }
    }

    const fetchCategories = async () => {
      try {
        const categories = await getCategories()
        setCategories(categories)
        // categories が更新されたら、categoryId を更新
        setCategoryId(categories[0]?.id || 0)
        // fetchCategories が完了してから fetchAnniversary を実行
        void fetchAnniversary()
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
  }, [id, isEditing])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage('')

    if (!date) {
      // dateがnullの場合はエラーメッセージを表示
      setErrorMessage('日付を選択してください')
      return
    }

    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        setErrorMessage('ユーザーIDが取得できませんでした')
        return
      }

      const data: Anniversary = {
        userId: Number(userId),
        categoryId,
        name,
        date: format(date, 'yyyy-MM-dd'), // JSTでフォーマット変換
        description,
      }
      if (isEditing) {
        await updateAnniversary(Number(id), data)
      } else {
        await createAnniversary(data)
      }
      navigate('/anniversaries')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || (isEditing ? '記念日の更新に失敗しました' : '記念日の登録に失敗しました'),
        )
      } else {
        console.error('予期せぬエラーが発生しました:', error)
        setErrorMessage(isEditing ? '記念日の更新に失敗しました' : '記念日の登録に失敗しました')
      }
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? '記念日編集' : '記念日登録'}</h1>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <FormInput label="記念日名" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <CategorySelect
          categories={categories.map((category) => ({
            id: category.id!,
            name: category.name,
          }))}
          selectedCategoryId={categoryId}
          onChange={setCategoryId}
          label="カテゴリ"
          id="categoryId"
        />

        <DatePicker selectedDate={date} onChange={setDate} label="日付" id="date" dateFormat="yyyy/MM/dd" />

        <FormInput
          type="textarea"
          label="説明"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <Button type="submit" className="w-full">
          {isEditing ? '更新' : '登録'}
        </Button>
        <Link
          to="/anniversaries"
          className="mt-2 block w-full text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          記念日一覧に戻る
        </Link>
      </form>
    </div>
  )
}

export default AnniversaryForm
