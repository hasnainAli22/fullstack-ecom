'use client'

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import { Spinner } from '@/components/common'
import UpdateButton from '@/components/UpdateButton'

export default function Page() {
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery()

  const config = [
    {
      label: 'First Name',
      value: user?.first_name,
    },
    {
      label: 'Last Name',
      value: user?.last_name,
    },
    {
      label: 'Email',
      value: user?.email,
    },
  ]

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    )
  }
  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <form
          // action={updateUser}
          className="mt-12 flex flex-col gap-4"
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
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="mt-12 flex flex-col">
          {/* {orderRes.orders.map((order) => (
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
          ))} */}
        </div>
      </div>
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

// import UpdateButton from "@/components/UpdateButton";
// import { updateUser } from "@/lib/actions";
// import { wixClientServer } from "@/lib/wixClientServer";
// import { members } from "@wix/members";
// import Link from "next/link";
// import { format } from "timeago.js";

// const ProfilePage = async () => {
//   const wixClient = await wixClientServer();

//   const user = await wixClient.members.getCurrentMember({
//     fieldsets: [members.Set.FULL],
//   });

//   if (!user.member?.contactId) {
//     return <div className="">Not logged in!</div>;
//   }

//   const orderRes = await wixClient.orders.searchOrders({
//     search: {
//       filter: { "buyerInfo.contactId": { $eq: user.member?.contactId } },
//     },
//   });