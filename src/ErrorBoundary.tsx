import React from 'react'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: unknown }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: unknown) {
    // エラーが発生したことを state に記録する
    return { hasError: true, error }
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    // エラーログを送信するなどの処理を行う
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // エラーが発生した場合は、フォールバック UI をレンダリングする
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details>{this.state.error instanceof Error ? this.state.error.message : 'Unknown error'}</details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
