import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createAnniversary, getAnniversary, updateAnniversary, getCategories } from '../services/api'
import { Anniversary } from '../types/apiTypes'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import ErrorAlert from '../components/ErrorAlert'
import DatePicker from '../components/DatePicker' // DatePicker をインポート
import { Category } from '../types/category'
import axios from 'axios'
import CategorySelect from '../components/CategorySelect.tsx'
import { format } from 'date-fns' // Category型をインポート

const AnniversaryForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const [name, setName] = useState('')
  const [date, setDate] = useState<Date | null>(null) // Date型に変更
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
          setDate(new Date(anniversary.date)) // 文字列からDate型に変換
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
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || 'カテゴリの取得に失敗しました')
        } else {
          console.error('予期せぬエラーが発生しました:', error)
          setErrorMessage('カテゴリの取得に失敗しました')
        }
      }
    }

    void fetchAnniversary()
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
        // date: date.toISOString().split('T')[0], // Date型をYYYY-MM-DD形式に変換
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
    <div>
      <h1>{isEditing ? '記念日編集' : '記念日登録'}</h1>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <form onSubmit={handleSubmit}>
        <FormInput label="記念日名" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <CategorySelect // CategorySelect を使用
          categories={categories.map((category) => ({ id: category.id!, name: category.name }))}
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
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit">{isEditing ? '更新' : '登録'}</Button>
      </form>
    </div>
  )
}

export default AnniversaryForm
