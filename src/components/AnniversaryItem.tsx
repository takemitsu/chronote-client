import React from 'react'
import { Link } from 'react-router-dom'
import { Anniversary } from '../types/apiTypes' // Anniversary型をインポート
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { toJapaneseEra } from '../utils/dateUtils.ts'
import Button from './Button.tsx'

interface Props {
  anniversary: Anniversary // 表示する記念日の情報
  onDelete?: (id: number) => void // 記念日を削除するための関数 (オプション)
}

const AnniversaryItem: React.FC<Props> = ({ anniversary, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(anniversary.id!) // onDelete 関数が存在する場合は、記念日IDを渡して実行する
    }
  }

  return (
    <div>
      <Link to={`/anniversaries/${anniversary.id}/edit`}>{anniversary.name}</Link>
      <div>
        日付:
        {format(new Date(anniversary.date), 'yyyy年')}({toJapaneseEra(new Date(anniversary.date))})
        {format(new Date(anniversary.date), 'MM月dd日', { locale: ja })}
      </div>
      <div>説明: {anniversary.description}</div>
      {onDelete && ( // onDelete 関数が存在する場合のみ削除ボタンを表示
        <Button type="button" onClick={handleDelete}>
          削除
        </Button>
      )}
    </div>
  )
}

export default AnniversaryItem
