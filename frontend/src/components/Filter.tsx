'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface FilterProps {
  categories: any[] // Define the categories array type
  selectedCategory: number | undefined
  onCategoryChange: (category: number) => void // Define the onCategoryChange function type
}

const Filter: React.FC<FilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  // Function to handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target
    const params = new URLSearchParams(searchParams)

    // Set the filter value in the query parameters
    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    // Replace the current URL with updated query parameters
    replace(`${pathname}?${params.toString()}`)
  }

  // useEffect to handle initial filter population
  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    // Populate filters from query params on initial load
    // Example: Set category filter
    const category = params.get('category')
    if (category) {
      const catSelect = document.getElementById('category') as HTMLSelectElement
      catSelect.value = category
    }

    // Example: Set sort filter
    const sort = params.get('sort')
    if (sort) {
      const sortSelect = document.getElementById('sort') as HTMLSelectElement
      sortSelect.value = sort
    }
  }, [searchParams])

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
          <option>Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="sort"
          id="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="price">Price (low to high)</option>
          <option value="price">Price (high to low)</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
