'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useGetCartQuery,
  useClearCartMutation,
} from '@/redux/product/productApiSlice'
import {
  Address,
  useRetrieveUserQuery,
  useRetrieveUserAddressesQuery,
} from '@/redux/features/authApiSlice'
import { Spinner } from '@/components/common'
import { toast } from 'react-toastify'
import AddAddressHandler from '@/components/common/AddAddressHandler'

const Checkout = () => {
  const router = useRouter()
  const { data: user, isLoading: isUserLoading } = useRetrieveUserQuery()
  const { data: addresses, isLoading: isAddressesLoading } =
    useRetrieveUserAddressesQuery()
  const { data: cart, refetch } = useGetCartQuery()
  const [clearCart] = useClearCartMutation()

  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<
    number | null
  >(null)
  const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<
    number | null
  >(null)
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [addressModalMode, setAddressModalMode] = useState<'add' | 'edit'>(
    'add'
  )
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(
    undefined
  )

  const handleAddAddress = () => {
    setAddressModalMode('add')
    setSelectedAddress(undefined)
    setIsAddressModalOpen(true)
  }

  const handleEditAddress = (address: Address) => {
    setAddressModalMode('edit')
    setSelectedAddress(address)
    setIsAddressModalOpen(true)
  }

  const handleSelectAddress = (id: number, type: 'shipping' | 'billing') => {
    if (type === 'shipping') {
      setSelectedShippingAddressId(id)
    } else {
      setSelectedBillingAddressId(id)
    }
  }

  useEffect(() => {
    if (!isAddressesLoading) {
      const defaultShipping = addresses.find(
        (address: Address) => address.default_shipping
      )
      const defaultBilling = addresses.find(
        (address: Address) => address.default_billing
      )

      setSelectedShippingAddressId(defaultShipping?.id || null)
      if (paymentMethod === 'cash') {
        setSelectedBillingAddressId(defaultBilling?.id || null)
      }
    }
  }, [isAddressesLoading, addresses, paymentMethod])

  if (isUserLoading || isAddressesLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    )
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value)
    if (e.target.value === 'cash') {
      const defaultBilling = addresses.find(
        (address: Address) => address.default_billing
      )
      setSelectedBillingAddressId(defaultBilling?.id || null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (paymentMethod === 'stripe') {
      toast('Under Development!')
    }
    try {
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
        <div className="flex-1 order-2 lg:order-1 w-1/2 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address
              </label>
              <div className="flex flex-col gap-2">
                {addresses.length > 0 ? (
                  addresses.map((address: Address) => (
                    <div
                      key={address.id}
                      onClick={() =>
                        handleSelectAddress(address.id, 'shipping')
                      }
                      className={`p-2 border-2 rounded-lg cursor-pointer ${
                        selectedShippingAddressId === address.id
                          ? 'border-blue-500'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between font-bold">
                        <div>
                          {user?.first_name} {user?.last_name} -{' '}
                          {address.phone_number}
                        </div>

                        <button
                          onClick={() => handleEditAddress(address)}
                          className="text-blue-500 hover:underline mt-2"
                        >
                          Edit Address
                        </button>
                      </div>
                      <p className="text-ellipsis truncate">
                        {address.landmark}, {address.street}, {address.city},{' '}
                        {address.postal_code}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-red-500">
                    No shipping address found. Please add one.
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Address
              </label>
              <div className="flex flex-col gap-2">
                {addresses.length > 0 ? (
                  addresses.map((address: Address) => (
                    <div
                      key={address.id}
                      onClick={() => handleSelectAddress(address.id, 'billing')}
                      className={`p-2 border-2 rounded-lg cursor-pointer ${
                        selectedBillingAddressId === address.id
                          ? 'border-blue-500'
                          : 'border-gray-300'
                      }`}
                      style={{ opacity: paymentMethod !== 'cash' ? 0.5 : 1 }}
                    >
                      <div className=" flex justify-between font-bold">
                        <div>
                          {user?.first_name} {user?.last_name} -{' '}
                          {address.phone_number}
                        </div>
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="text-blue-500 hover:underline mt-2"
                        >
                          Edit Address
                        </button>
                      </div>
                      <div className="text-ellipsis truncate">
                        {address.landmark}, {address.street}, {address.city},{' '}
                        {address.postal_code}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-red-500">
                    No billing address found. Please add one.
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <button
                type="button"
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md"
                onClick={handleAddAddress}
              >
                Add New Address
              </button>
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
                    className="mr-2"
                  />
                  Cash on Delivery
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
                    className="mr-2"
                  />
                  Stripe
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1 order-1 lg:order-2 lg:w-1/2">
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
            <span className="">Standard $2.00</span>
          </div>
          <div className="flex items-center justify-between font-medium">
            <span className="">Tax</span>
            <span className="">$0.00</span>
          </div>
          <div className="mt-10 flex items-center justify-between font-semibold border-t">
            <span className="">Subtotal</span>
            <span className="">${calculateSubtotal()}</span>
          </div>
        </div>
      </div>
      <AddAddressHandler
        isOpen={isAddressModalOpen}
        mode={addressModalMode}
        address={selectedAddress}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  )
}

export default Checkout
