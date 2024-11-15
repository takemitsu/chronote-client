import React from 'react'
import './CategorySelect.css'

interface Props {
  categories: { id: number; name: string }[]
  selectedCategoryId: number
  onChange: (categoryId: number) => void
  label?: string
  id?: string
}

const CategorySelect: React.FC<Props> = ({ categories, selectedCategoryId, onChange, label, id }) => {
  return (
    <div className="category-select-container">
      {label && <label htmlFor={id}>{label}:</label>}
      <select
        id={id}
        value={selectedCategoryId || categories[0]?.id || 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="category-select">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategorySelect
