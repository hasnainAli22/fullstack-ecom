'use client'

import React, { use, useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import ImageUploadForm from '@/components/forms/ImageUploadForm'
import { Product } from '@/redux/product/productApiSlice'
import { Spinner } from '@/components/common'
import { useSearchProductsByImageMutation } from '@/redux/product/productApiSlice'
import { ImageFileContext } from '@/context/ImageFileContext'
import { useRouter } from 'next/navigation'

const ImageSearch = () => {
  const {file} = useContext(ImageFileContext)
  const [products, setProducts] = useState<Product[]>([])
  const [searchProductsByImage, { isLoading }] =
    useSearchProductsByImageMutation()

  const handleImageSearch = async (formData: FormData) => {
    try {
      const data = await searchProductsByImage(formData).unwrap()
      setProducts(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner lg />
      </div>
    )
  }
  const router = useRouter();
  useEffect(() => {
    const searchProducts = async () => {
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const data = await searchProductsByImage(formData).unwrap();
          setProducts(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }else{
        router.push('/')
      }
    };
  
    searchProducts();
  
    // Cleanup Function
    return () => {
      console.log("Remove the image from the context");
    };
  }, [file]);
  
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
                    <button className="mt-auto rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
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
