import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../types/apiTypes'
import Button from './Button.tsx' // Category型をインポート

interface Props {
  category: Category // 表示するカテゴリの情報
  onDelete?: (id: number) => void // カテゴリを削除するための関数 (オプション)
}

const CategoryItem: React.FC<Props> = ({ category, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(category.id!) // onDelete 関数が存在する場合は、カテゴリIDを渡して実行する
    }
  }

  return (
    <div>
      <Link to={`/categories/${category.id}/edit`}>{category.name}</Link>
      {onDelete && ( // onDelete 関数が存在する場合のみ削除ボタンを表示
        <Button type="button" onClick={handleDelete}>
          削除
        </Button>
      )}
    </div>
  )
}

export default CategoryItem
