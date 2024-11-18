import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../types/category.ts'
import Button from './Button.tsx'

interface Props {
  category: Category
  onDelete?: (id: number) => void
}

const CategoryItem: React.FC<Props> = ({ category, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(category.id!)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div>
        <Link to={`/categories/${category.id}/edit`} className="text-blue-500 hover:text-blue-700">
          {category.name}
        </Link>
        <span className="ml-2 text-gray-500 text-sm">({category.anniversariesCount}件)</span>
      </div>
      {onDelete && (
        <Button
          type="button"
          onClick={handleDelete}
          disabled={category.anniversariesCount !== 0}
          className="bg-red-500 hover:bg-red-700">
          削除
        </Button>
      )}
    </div>
  )
}

export default CategoryItem
