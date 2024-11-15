import React from 'react'
import './FormInput.css' // FormInput.css をインポート

interface Props {
  label: string
  type?: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errorMessage?: string
  rows?: number // textarea の rows 属性
}

const FormInput: React.FC<Props> = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  errorMessage,
  rows, // rows 属性を追加
}) => {
  const inputElement =
    type === 'textarea' ? ( // type が textarea の場合
      <textarea id={id} value={value} onChange={onChange} rows={rows} />
    ) : (
      <input type={type} id={id} value={value} onChange={onChange} />
    )

  return (
    <div className="form-input">
      <label htmlFor={id}>{label}:</label>
      {inputElement}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  )
}

export default FormInput
