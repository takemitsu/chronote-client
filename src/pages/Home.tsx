import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Chronote へようこそ！</h1>
      <p className="text-lg mb-6">Chronote は、あなたの大切な記念日を記録・管理するためのアプリケーションです。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Chronote でできること</h2>
          <ul className="list-disc list-inside">
            <li>記念日を登録して、日付や説明を記録できます</li>
            <li>記念日をカテゴリ分けして、整理できます</li>
            <li>記念日までの日数をカウントダウン表示できます</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Chronote の利点</h2>
          <ul className="list-disc list-inside">
            <li>大切な記念日を忘れることがなくなります</li>
            <li>記念日を振り返って、思い出に浸ることができます</li>
            <li>記念日の準備を計画的に進めることができます</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
