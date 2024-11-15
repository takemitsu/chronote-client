// ユーザー登録リクエスト
export type SignupRequest = {
  name: string
  email: string
  password: string
}

// ログインリクエスト
export type SigninRequest = {
  email: string
  password: string
}

// 記念日
export type Anniversary = {
  id?: number
  userId: number
  categoryId: number
  name: string
  date: string // YYYY-MM-DD 形式
  description?: string
}

// カテゴリ
export type Category = {
  id?: number
  userId: number
  name: string
}
