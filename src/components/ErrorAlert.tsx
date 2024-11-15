import React from 'react'
import './ErrorAlert.css'

interface Props {
  message: string // 表示するエラーメッセージ
}

const ErrorAlert: React.FC<Props> = ({ message }) => {
  return <div className="error-alert">{message}</div>
}

export default ErrorAlert
