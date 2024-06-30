"use client"

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useGetCartQuery } from '@/redux/product/productApiSlice';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
//   const cartItems = useAppSelector((state) => state.cart.items);
const { data: user, isLoading:isUserLoading, isFetching } = useRetrieveUserQuery()
const { data: cart, isLoading, refetch } = useGetCartQuery()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  useEffect(()=>{

    if(!isUserLoading){
        setFormData({
            name: `${user?.first_name} ${user?.last_name}`,
            email: `${user?.email}`,
            address: '',
            city: '',
            state: '',
            zip: '',
          })
    }
  },[isUserLoading])

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    /*
    e.preventDefault();
    // Perform checkout process here
    // You can use dispatch to send the form data and cart items to your backend
    try {
      // Example: dispatch an action to process the checkout
      // await dispatch(processCheckout({ formData, cartItems })).unwrap();
      router.push('/confirmation'); // Redirect to a confirmation page
    } catch (error) {
      console.error('Checkout failed:', error);
    }
    */
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
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
            <label className="block text-sm font-medium text-gray-700">Email</label>
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
            <label className="block text-sm font-medium text-gray-700">Address</label>
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
            <label className="block text-sm font-medium text-gray-700">City</label>
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
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
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
        <h2 className="text-xl font-bold mt-8 mb-4">Order Summary</h2>
        <ul className="mb-4">
          {cart?.items.map((item) => (
            <li key={item.product.id} className="flex justify-between border-b py-2">
              <span>{item.product.name}</span>
              <span>{item.quantity} x ${item.product.discounted_price}</span>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
