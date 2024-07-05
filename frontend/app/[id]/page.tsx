'use client'
//import Reviews from '@/components/Reviews'
import Add from '@/components/Add'
import Image from 'next/image'
import { Suspense } from 'react'
import {
  Product,
  useFetchProductsByIdQuery,
} from '@/redux/product/productApiSlice'
import { Spinner } from '@/components/common'

const SinglePage = ({ params }: { params: { id: number } }) => {
  const productId = params.id
  const { data, isLoading, isError } = useFetchProductsByIdQuery(productId)
  const product = data
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner lg />
      </div>
    )
  }
  if (isError) {
    return <div>Error Loading Product</div>
  }
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <div className="relative w-full h-80">
          <Image
            src={product?.image || '/product.png'}
            alt="product image"
            fill
            sizes="25vw"
            className="absolute object-contain rounded-md z-10 hover:opacity-75 transition-opacity easy duration-500"
          />
        </div>
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.name}</h1>
        <p className="text-gray-500">{product?.desc}</p>
        <div className="h-[2px] bg-gray-100" />
        {product?.price === product?.discounted_price ? (
          <h2 className="font-medium text-2xl">${product?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product?.discounted_price}
            </h2>
          </div>
        )}

        <Add
          product={product as Product}
          productId={product?.id!}
          stockNumber={product?.quantity || 0}
        />

        {/* <div className="h-[2px] bg-gray-100" />
        
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  )
}

export default SinglePage
