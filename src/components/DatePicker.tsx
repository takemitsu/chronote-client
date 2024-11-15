import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' // CSS をインポート
import './DatePicker.css' // 必要に応じて独自の CSS をインポート

interface Props {
  selectedDate: Date | null // 選択された日付
  onChange: (date: Date | null) => void // 日付が変更されたときに呼び出されるコールバック関数
  label?: string // ラベルのテキスト
  id?: string // input要素のID
  dateFormat?: string // 日付のフォーマット
  minDate?: Date // 選択可能な最小日付
  maxDate?: Date // 選択可能な最大日付
}

const CustomDatePicker: React.FC<Props> = ({
  selectedDate,
  onChange,
  label,
  id,
  dateFormat = 'yyyy/MM/dd',
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false) // DatePicker が開いているかどうかの状態

  const handleDateChange = (date: Date | null) => {
    onChange(date)
    setIsOpen(false) // 日付を選択したら DatePicker を閉じる
  }

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        onClickOutside={() => setIsOpen(false)} // DatePicker の外側をクリックしたら閉じる
        onCalendarClose={() => setIsOpen(false)} // カレンダーを閉じたら閉じる
        onCalendarOpen={() => setIsOpen(true)} // カレンダーを開いたら開く
        open={isOpen} // isOpen の状態に応じて DatePicker を開く/閉じる
      />
    </div>
  )
}

export default CustomDatePicker
