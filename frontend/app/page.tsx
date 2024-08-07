'use client'

import CategoryList from '@/components/listings/CategoryList'
import ProductList from '@/components/listings/ProductList'
import Skeleton from '@/components/common/Skeleton'
import Slider from '@/components/common/Slider'
import { Suspense } from 'react'

const HomePage = () => {
  return (
    <div className="mt-0">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList categoryId={1} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList categoryId={2} />
        </Suspense>
      </div>
    </div>
  )
}

export default HomePage
