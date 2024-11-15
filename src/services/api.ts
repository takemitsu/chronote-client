import axios, { AxiosError, AxiosInstance } from 'axios'
import { Anniversary, Category, SigninRequest, SignupRequest } from '../types/apiTypes.ts'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000' // 環境変数から API のベース URL を取得

const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Cookie を含める
})

// リクエストインターセプター
api.interceptors.request.use((config) => {
  // localStorage から JWT を取得
  const token = localStorage.getItem('token')
  if (token) {
    // Authorization ヘッダーに JWT を設定
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 401 Unauthorized エラーの場合、ログイン画面にリダイレクト
    if (error.response?.status === 401) {
      console.error(error)
      setTimeout(() => {
        window.location.href = '/login'
      }, 5000) // 5000ミリ秒 = 5秒
    }
    return Promise.reject(error)
  },
)

// API 通信を行う関数を定義

// ユーザー登録
export const signup = async (data: SignupRequest) => {
  const response = await api.post('/auth/signup', data)
  return response.data
}

// ログイン
export const signin = async (data: SigninRequest) => {
  const response = await api.post('/auth/signin', data)
  return response.data
}

// ログアウト
export const signout = async () => {
  const response = await api.post('/auth/signout')
  return response.data
}

// 記念日一覧を取得
export const getAnniversaries = async () => {
  const response = await api.get('/anniversaries')
  return response.data
}

// 記念日を作成
export const createAnniversary = async (data: Anniversary) => {
  const response = await api.post('/anniversaries', data)
  return response.data
}

// 記念日を取得
export const getAnniversary = async (id: number) => {
  const response = await api.get(`/anniversaries/${id}`)
  return response.data
}

// 記念日を更新
export const updateAnniversary = async (id: number, data: Anniversary) => {
  const response = await api.put(`/anniversaries/${id}`, data)
  return response.data
}

// 記念日を削除
export const deleteAnniversary = async (id: number) => {
  const response = await api.delete(`/anniversaries/${id}`)
  return response.data
}

// カテゴリ一覧を取得
export const getCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

// カテゴリを作成
export const createCategory = async (data: Category) => {
  const response = await api.post('/categories', data)
  return response.data
}

// カテゴリを取得
export const getCategory = async (id: number) => {
  const response = await api.get(`/categories/${id}`)
  return response.data
}

// カテゴリを更新
export const updateCategory = async (id: number, data: Category) => {
  const response = await api.put(`/categories/${id}`, data)
  return response.data
}

// カテゴリを削除
export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/categories/${id}`)
  return response.data
}
