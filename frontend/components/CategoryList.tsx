'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Category,
  useFetchCategoryQuery,
} from '@/redux/product/productApiSlice'

const CategoryList = () => {
  const { data, isLoading, isError } = useFetchCategoryQuery()

  if (isLoading) {
    return <div className="ml-32">Loading...</div>
  }
  if (isError) {
    return <div className="ml-32">Error Occured!</div>
  }

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {data?.map((item: Category) => (
          <Link
            href={`/list?category=${item.id}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item.id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={item.icon || '/cat.png'}
                alt={item.name}
                fill
                sizes="20vw"
                className="object-cover rounded"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
