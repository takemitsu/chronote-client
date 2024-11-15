import React from 'react'
import './Modal.css'

interface Props {
  isOpen: boolean // モーダルを開くかどうかのフラグ
  onClose: () => void // モーダルを閉じるための関数
  title?: string // モーダルのタイトル
  children: React.ReactNode // モーダルの中身
}

const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null // isOpen が false の場合は何も表示しない
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // オーバーレイをクリックしたときにモーダルが閉じないようにする
      >
        {title && <h2 className="modal-title">{title}</h2>}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
