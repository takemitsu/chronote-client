import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'

interface Props {
  selectedDate: Date | null
  onChange: (date: Date | null) => void
  label?: string
  id?: string
  dateFormat?: string
  minDate?: Date
  maxDate?: Date
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
  const [isOpen, setIsOpen] = useState(false)

  const handleDateChange = (date: Date | null) => {
    onChange(date)
    setIsOpen(false)
  }

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
          {label}
        </label>
      )}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        onClickOutside={() => setIsOpen(false)}
        onCalendarClose={() => setIsOpen(false)}
        onCalendarOpen={() => setIsOpen(true)}
        open={isOpen}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  )
}

export default CustomDatePicker
