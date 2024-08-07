'use client'

import {
  useAddItemToCartMutation,
  useGetCartQuery,
} from '@/redux/product/productApiSlice'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
interface AddProps {
  productId: number
  stockNumber: number
}

const Add: React.FC<AddProps> = ({ productId, stockNumber }) => {
  const [quantity, setQuantity] = useState(1)
  const [addItemToCart, { isLoading }] = useAddItemToCartMutation()
  const { refetch } = useGetCartQuery()
  const router = useRouter()

  const handleQuantity = (type: string) => {
    if (type === 'd' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
    if (type === 'i' && quantity < stockNumber) {
      setQuantity((prev) => prev + 1)
    }
  }

  const handleAddToCart = async () => {
    try {
      console.log('quantity is: ', quantity) //debuging line
      await addItemToCart({ productId, quantity })
        .unwrap()
        .then(() => {
          refetch()
          toast.info('Added to Cart')
        })
    } catch (e: any) {
      toast.warn(`Please Login First`)
      router.push('/auth/login')
    }
  }
  useEffect(() => {
    console.log('Quantity state updated:', quantity) // Debugging line
  }, [quantity])

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity('d')}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity('i')}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : stockNumber < 20 ? (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{' '}
              left!
              <br />
              {"Don't"} miss it
            </div>
          ) : (
            //if stock isn't too low
            <></>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isLoading || stockNumber < 1}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Add
