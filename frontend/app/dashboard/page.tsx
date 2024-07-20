'use client'

import {
  useRetrieveUserQuery,
  useRetrieveUserAddressesQuery,
  Address,
} from '@/redux/features/authApiSlice'
import { Spinner } from '@/components/common'
import UpdateButton from '@/components/common//UpdateButton'

export default function Page() {
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery()
  const { data: addresses, error } = useRetrieveUserAddressesQuery()

  if (error) return <div>console.log(error)</div>

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    )
  }
  const handleEdit = (id: number) => {
    // Handle edit logic here
    console.log(`Edit address with ID: ${id}`)
  }

  const handleDelete = (id: number) => {
    // Handle delete logic here
    console.log(`Delete address with ID: ${id}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <form
          // action={updateUser}
          className="mt-4 flex flex-col gap-4"
        >
          <label className="text-sm text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder={user?.first_name || 'John'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Surname</label>
          <input
            type="text"
            name="lastName"
            placeholder={user?.last_name || 'Doe'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder={user?.email || 'john@gmail.com'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <UpdateButton />
        </form>
      </div>
      <div className="overflow-y-auto max-h-[400px] p-4 scrollbar-thin">
        <h1 className="text-2xl">Addresses</h1>
        {addresses?.map((address: Address) => (
          <div key={address.id}>
            <div className="border border-gray-300 rounded-lg p-6 m-4 shadow-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {address.address_type === 'home'
                    ? 'Home Address'
                    : 'Office Address'}
                </h2>
                <span className="text-gray-600">{address.user}</span>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">
                  <strong>Street:</strong> {address.street}
                </p>
                <p className="text-gray-700">
                  <strong>City:</strong> {address.city}
                </p>
                <p className="text-gray-700">
                  <strong>Landmark:</strong> {address.landmark}
                </p>
                <p className="text-gray-700">
                  <strong>Postal Code:</strong> {address.postal_code}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {address.phone_number}
                </p>
              </div>
              <div className="flex justify-between items-center flex-wrap mb-4">
                <span
                  className={`text-sm ${
                    address.default_billing ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {address.default_billing ? 'Default Billing Address' : ''}
                </span>
                <span
                  className={`text-sm ${
                    address.default_shipping ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {address.default_shipping ? 'Default Shipping Address' : ''}
                </span>
                <p className="text-xs text-gray-500 mt-2">
                  <small>
                    Created at:{' '}
                    {new Date(address.created_at).toLocaleDateString()}
                  </small>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  <small>
                    Updated at:{' '}
                    {new Date(address.updated_at).toLocaleDateString()}
                  </small>
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(address.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="mt-12 flex flex-col">
          {orderRes.orders.map((order) => (
            <Link
              href={`/orders/${order._id}`}
              key={order._id}
              className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
            >
              <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
              <span className="w-1/4">
                ${order.priceSummary?.subtotal?.amount}
              </span>
              {order._createdDate && (
                <span className="w-1/4">{format(order._createdDate)}</span>
              )}
              <span className="w-1/4">{order.status}</span>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  )
}

// return (
// 	<>
// 		<header className='bg-white shadow'>
// 			<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
// 				<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
// 					Dashboard
// 				</h1>
// 			</div>
// 		</header>
// 		<main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>
// 			<List config={config} />
// 		</main>
// 	</>
// );
//	}
