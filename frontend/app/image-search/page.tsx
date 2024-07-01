'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import ImageUploadForm from '@/components/ImageUploadForm'
import { Product } from '@/redux/product/productApiSlice'

const ImageSearch = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleImageSearch = async (formData: FormData) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        'http://localhost:8000/api/products/search_with_image/',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Image search failed')
      }

      const data: Product[] = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="ml-4">Loading...</div>
  }

  return (
    <div className="mt-5 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-2xl">Image Search</h1>
      <div className="mt-4">
        <ImageUploadForm onSubmit={handleImageSearch} />
        <div className="mt-4">
          <h2 className="text-2xl">Results</h2>
          <div className="flex flex-col">
            <div className="mt-12 flex gap-x-8 gap-y-16 justify-around flex-wrap">
              {products.length > 0 ? (
                products.map((product: Product) => (
                  <Link
                    href={'/' + product.id}
                    className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
                    key={product.id}
                  >
                    <div className="relative w-full h-80">
                      <Image
                        src={
                          'http://localhost:8000/' + product.image ||
                          '/product.png'
                        }
                        alt={product.name}
                        fill
                        sizes="25vw"
                        className="absolute object-contain rounded-md z-10 hover:opacity-75 transition-opacity easy duration-500"
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
                <p>No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSearch
