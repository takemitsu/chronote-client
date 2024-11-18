import React from 'react'

interface Props {
  label: string
  type?: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errorMessage?: string
  rows?: number
}

const FormInput: React.FC<Props> = ({ label, type = 'text', id, value, onChange, errorMessage, rows }) => {
  const inputElement =
    type === 'textarea' ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    ) : (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    )

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {label}:
      </label>
      {inputElement}
      {errorMessage && <div className="text-red-500 text-xs italic">{errorMessage}</div>}
    </div>
  )
}

export default FormInput
