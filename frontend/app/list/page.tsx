'use client'

import Filter from '@/components/common/Filter'
import ProductList from '@/components/listings/ProductList'
import Skeleton from '@/components/common/Skeleton'
import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import Image from 'next/image'
import { useFetchCategoryQuery } from '@/redux/product/productApiSlice'

const ListPage = ({ searchParams }: { searchParams: any }) => {
  const [categories, setCategories] = useState<any[] | undefined>([])
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.category || undefined
  )

  const { data, isLoading, isError } = useFetchCategoryQuery()
  useEffect(() => {
    if (data) {
      setCategories(data)
    }
  }, [data])

  const handleCategoryChange = (category: number | undefined) => {
    setSelectedCategory(category)
  }

  if (isLoading) return <Skeleton />
  if (isError) return <div>Error fetching catagories</div>

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
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
      </div> */}

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
