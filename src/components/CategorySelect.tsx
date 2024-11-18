import React from 'react'

interface Props {
  categories: { id: number; name: string }[]
  selectedCategoryId: number
  onChange: (categoryId: number) => void
  label?: string
  id?: string
}

const CategorySelect: React.FC<Props> = ({ categories, selectedCategoryId, onChange, label, id }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
          {label}:
        </label>
      )}
      <select
        id={id}
        value={selectedCategoryId}
        onChange={(e) => onChange(Number(e.target.value))}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
