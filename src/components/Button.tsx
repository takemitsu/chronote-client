import React from 'react'
import './Button.css' // 必要に応じて CSS をインポート

interface Props {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' // ボタンのタイプ
  className?: string // 追加のクラス名
}

const Button: React.FC<Props> = ({ children, onClick, disabled = false, type = 'button', className = '' }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`button ${className}`}>
      {children}
    </button>
  )
}

export default Button
