'use client'

interface FilterProps {
  categories: any[] //
  selectedCategory: number | undefined
  onCategoryChange: (category: number | undefined) => void
}

const Filter: React.FC<FilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        {/* Render categories dynamically */}
        <select
          name="category"
          id="category"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={(e) => onCategoryChange(Number(e.target.value))}
          value={selectedCategory}
        >
          <option>Select Catagory</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {/* <select
          name="sort"
          id="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="price">Price (low to high)</option>
          <option value="price">Price (high to low)</option>
        </select> */}
      </div>
    </div>
  )
}

export default Filter
