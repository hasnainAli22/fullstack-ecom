'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import Pagination from './Pagination'
import { fetchProducts, Product } from '@/lib/api'

const PRODUCT_PER_PAGE = 4

const ProductList = ({
  categoryId,
  searchParams,
}: {
  categoryId: number | undefined
  searchParams?: any
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await fetchProducts({
          category: categoryId || undefined,
          sort: searchParams?.sort || '',
        })
        console.log('fetching products...')

        setProducts(data)
        setCurrentPage(searchParams?.page ? parseInt(searchParams.page) : 0)
        setHasNext(data.length === PRODUCT_PER_PAGE)
        setHasPrev((searchParams?.page ? parseInt(searchParams.page) : 0) > 0)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryId, searchParams])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <Link
              href={'/' + product.id}
              className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
              key={product.id}
            >
              <div className="relative w-full h-80">
                <Image
                  src={product.image || '/product.png'}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md z-10 hover:opacity-75 transition-opacity easy duration-500"
                />
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{product.name}</span>
                <span className="font-semibold">${product.price}</span>
              </div>
              {product.desc && (
                <div
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.desc),
                  }}
                ></div>
              )}
              <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
                Add to Cart
              </button>
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
        {(searchParams?.category || searchParams?.name) && (
          <Pagination
            currentPage={currentPage}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        )}
      </div>
    </div>
  )
}

export default ProductList
