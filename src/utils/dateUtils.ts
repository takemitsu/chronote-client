// 和暦の情報を保持する型
interface Era {
  name: string // 元号名
  startYear: number // 開始年
  startMonth: number // 開始月
  startDay: number // 開始日
}

// 西暦と和暦の対応表
const eraTable: Era[] = [
  { name: '明治', startYear: 1868, startMonth: 1, startDay: 25 },
  { name: '大正', startYear: 1912, startMonth: 7, startDay: 30 },
  { name: '昭和', startYear: 1926, startMonth: 12, startDay: 25 },
  { name: '平成', startYear: 1989, startMonth: 1, startDay: 8 },
  { name: '令和', startYear: 2019, startMonth: 5, startDay: 1 },
]

// 西暦を和暦に変換する関数
export const toJapaneseEra = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月は0から始まるため+1する
  const day = date.getDate()

  for (let i = eraTable.length - 1; i >= 0; i--) {
    const era = eraTable[i]
    if (
      year > era.startYear ||
      (year === era.startYear && month > era.startMonth) ||
      (year === era.startYear && month === era.startMonth && day >= era.startDay)
    ) {
      const eraYear = year - era.startYear + 1 // 元号の年を計算
      return `${era.name}${eraYear === 1 ? '元' : eraYear}年`
    }
  }

  return '' // 対応する和暦が見つからない場合は空文字列を返す
}
