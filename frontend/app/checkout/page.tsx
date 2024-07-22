'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useGetCartQuery,
  useClearCartMutation,
} from '@/redux/product/productApiSlice'
import {
  useRetrieveUserQuery,
  useRetrieveDefaultShippingAddressQuery,
} from '@/redux/features/authApiSlice'
import { Spinner } from '@/components/common'
import { toast } from 'react-toastify'

const Checkout = () => {
  const router = useRouter()
  const { data: user, isLoading: isUserLoading } = useRetrieveUserQuery()
  const { data: address, isLoading: isAddressLoading } =
    useRetrieveDefaultShippingAddressQuery()
  console.log(address)
  const { data: cart, refetch } = useGetCartQuery()
  const [clearCart] = useClearCartMutation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    landmark: '',
    zip: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('cash')

  useEffect(() => {
    if (!isUserLoading && !isAddressLoading) {
      setFormData({
        name: `${user?.first_name} ${user?.last_name}`,
        email: `${user?.email}`,
        address: `${address?.street}`,
        city: `${address?.city}`,
        landmark: `${address?.landmark}`,
        zip: `${address?.postal_code}`,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoading, isAddressLoading])

  if (isUserLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    )
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePaymentChange = (e: any) => {
    setPaymentMethod(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // Perform checkout process here
    // You can use dispatch to send the form data and cart items to your backend
    if (paymentMethod === 'stripe') {
      toast('Under Development!')
    }
    try {
      // Example: dispatch an action to process the checkout
      // await dispatch(processCheckout({ formData, cartItems, paymentMethod })).unwrap();
      //router.push('/confirmation') // Redirect to a confirmation page
      if (paymentMethod === 'cash') {
        await clearCart()
          .unwrap()
          .then(() => {
            refetch()
          })
        router.push('/success')
      }
    } catch (error) {
      console.error('Checkout failed:', error)
    }
  }

  const calculateSubtotal = () => {
    if (!cart || !cart.items) return 0
    return (
      cart.items.reduce((total, item) => {
        const itemTotal =
          parseFloat(item.product.discounted_price) * item.quantity
        return total + itemTotal
      }, 0) + 2
    ).toFixed(2)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 border-2 rounded-md cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <input
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={handlePaymentChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="cash"
                    className="text-sm font-medium text-gray-700"
                  >
                    Cash on Delivery
                  </label>
                </div>
                <div
                  className={`p-4 border-2 rounded-md cursor-pointer ${
                    paymentMethod === 'stripe'
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <input
                    type="radio"
                    id="stripe"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={handlePaymentChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="stripe"
                    className="text-sm font-medium text-gray-700"
                  >
                    Stripe
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 mt-4"
            >
              Place Order
            </button>
          </form>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <ul className="mb-4">
            {cart?.items.map((item) => (
              <li
                key={item.product.id}
                className="flex justify-between border-b py-2"
              >
                <span>{item.product.name}</span>
                <span>
                  {item.quantity} x ${item.product.discounted_price}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between font-medium">
            <span className="">Shipping</span>
            <span className="">Standard ${'2.00'}</span>
          </div>
          <div className="flex items-center justify-between font-medium">
            <span className="">Tax</span>
            <span className="">${'0.00'}</span>
          </div>
          <div className="mt-10 flex items-center justify-between font-semibold border-t">
            <span className="">Subtotal</span>
            <span className="">${calculateSubtotal()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
