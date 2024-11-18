import React from 'react'

interface Props {
  children: React.ReactNode
  onClick?: () => void // ボタンのクリックイベント（オプショナル）
  disabled?: boolean // ボタンの無効化状態
  type?: 'button' | 'submit' | 'reset' // ボタンの種類
  className?: string // 追加のクラス名
}

const Button: React.FC<Props> = ({ children, onClick, disabled = false, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      {...(onClick && { onClick })}
      disabled={disabled}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}>
      {children}
    </button>
  )
}

export default Button
