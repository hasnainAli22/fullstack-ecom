'use client'

import Filter from '@/components/Filter' // Replace with actual path to your Filter component
import ProductList from '@/components/ProductList' // Replace with actual path to your ProductList component
import Skeleton from '@/components/Skeleton' // Replace with actual path to your Skeleton component
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import Image from 'next/image'
import { FetchProductsParams, fetchCategories } from '@/lib/api' // Replace with your types definition file path

const ListPage = ({ searchParams }: { searchParams: FetchProductsParams }) => {
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.category || undefined
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  //const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategories()
        setCategories(response)
        setLoading(false)
      } catch (error) {
        setError('Error fetching categories.')
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCategoryChange = (category: number) => {
    setSelectedCategory(category)
  }

  if (loading) return <Skeleton />
  if (error) return <div>Error: {error}</div>

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN Section (if needed) */}
      {/* Example: Display a promotional section */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <h1 className="mt-12 text-xl font-semibold">{`Products`}</h1>

      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={selectedCategory}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  )
}

export default ListPage
