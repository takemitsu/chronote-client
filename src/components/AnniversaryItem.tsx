import React from 'react'
import { Link } from 'react-router-dom'
import { Anniversary } from '../types/apiTypes'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { toJapaneseEra } from '../utils/dateUtils.ts'
import Button from './Button.tsx'

interface Props {
  anniversary: Anniversary
  onDelete?: (id: number) => void
}

const AnniversaryItem: React.FC<Props> = ({ anniversary, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(anniversary.id!)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <Link to={`/anniversaries/${anniversary.id}/edit`} className="text-lg font-medium text-gray-800 hover:text-blue-500">
          {anniversary.name}
        </Link>
        {onDelete && (
          <Button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded">
            削除
          </Button>
        )}
      </div>
      <div className="mt-2 text-gray-600">
        <div>
          日付:
          {format(new Date(anniversary.date), 'yyyy年')}({toJapaneseEra(new Date(anniversary.date))})
          {format(new Date(anniversary.date), 'MM月dd日', { locale: ja })}
        </div>
        <div>説明: {anniversary.description}</div>
      </div>
    </div>
  )
}

export default AnniversaryItem
