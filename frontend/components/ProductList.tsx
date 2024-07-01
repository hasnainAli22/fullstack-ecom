'use client'

import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
//import Pagination from './Pagination'
import { useFetchProductsQuery, Product } from '@/redux/product/productApiSlice'

const ProductList = ({
  categoryId,
  searchParams,
}: {
  categoryId?: number
  searchParams?: any
}) => {
  const search =
    searchParams?.search?.trim() === '' ? undefined : searchParams?.search

  const { data, isLoading, isError } = useFetchProductsQuery({
    categoryId,
    search,
  })
  if (isError) {
    return <div>Error Occured while fetching data!</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {(data?.length as number) > 0 ? (
          data?.map((product: Product) => (
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
              <button className="mt-auto rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
                Add to Cart
              </button>
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
        {/* {searchParams?.category && (
          <Pagination
            currentPage={currentPage}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        )} */}
      </div>
    </div>
  )
}

export default ProductList
