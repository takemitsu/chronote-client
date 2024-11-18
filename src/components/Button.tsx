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
      className={`
        ${
          disabled
            ? // disabled が true の場合
              'bg-gray-400 cursor-not-allowed' // グレーの背景、カーソルを not-allowed に
            : // そうでない場合は className をそのまま適用
              `bg-blue-500 hover:bg-blue-700 ${className}`
        }
        text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
      `}>
      {children}
    </button>
  )
}

export default Button
