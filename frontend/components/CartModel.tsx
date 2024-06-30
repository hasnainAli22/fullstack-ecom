'use client'

import Image from 'next/image'
import {
  useGetCartQuery,
  useRemoveItemFromCartMutation,
} from '@/redux/product/productApiSlice'
import { toast } from 'react-toastify'

const CartModal = () => {
  const { data: cart, isLoading, refetch } = useGetCartQuery()
  const [removeItemFromCart] = useRemoveItemFromCartMutation()

  const handleRemove = (productId: number) => {
    removeItemFromCart({ productId })
      .unwrap()
      .then(() => {
        refetch()
        toast.success('Removed from cart')
      })
  }

  //subtotal
  const calculateSubtotal = () => {
    if (!cart || !cart.items) return 0
    return cart.items
      .reduce((total, item) => {
        const itemTotal =
          parseFloat(item.product.discounted_price) * item.quantity
        return total + itemTotal
      }, 0)
      .toFixed(2)
  }

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart?.items.length ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.items.map((item) => (
              <div className="flex gap-4" key={item.id}>
                {item.product.image && (
                  <Image
                    src={item.product.image}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{' '}
                          </div>
                        )}
                        ${item.product.discounted_price}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">
                      {item.product.quantity ? 'Available' : 'Not Available'}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                      onClick={() => handleRemove(item.product.id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${calculateSubtotal()}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={() => {}}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartModal
