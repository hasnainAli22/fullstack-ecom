import React, { useState } from 'react'
import {
  useAddUserAddressMutation,
  useRetrieveUserAddressesQuery,
  Address,
} from '@/redux/features/authApiSlice'
import { toast } from 'react-toastify'

interface AddAddressProps {
  onClose: () => void
}

const AddAddress: React.FC<AddAddressProps> = ({ onClose }) => {
  const [addUserAddress] = useAddUserAddressMutation()
  const { refetch } = useRetrieveUserAddressesQuery()

  const [formData, setFormData] = useState<Partial<Address>>({
    city: '',
    street: '',
    landmark: '',
    postal_code: '',
    address_type: 'home',
    phone_number: '',
    default_billing: false,
    default_shipping: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked })
  }

  const validateForm = () => {
    const { city, street, postal_code, phone_number, landmark } = formData
    if (!city || !street || !postal_code || !phone_number || !landmark) {
      toast.error('All fields are required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      await addUserAddress(formData)
        .unwrap()
        .then(() => refetch())
      toast.success('Successfully Added')
      onClose()
    } catch (error) {
      console.error(error)
      toast.error("Can't Add Address")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="city"
          value={formData.city || ''}
          onChange={handleChange}
          placeholder="City"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="street"
          value={formData.street || ''}
          onChange={handleChange}
          placeholder="Street"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="landmark"
          value={formData.landmark || ''}
          onChange={handleChange}
          placeholder="Landmark"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="postal_code"
          value={formData.postal_code || ''}
          onChange={handleChange}
          placeholder="Postal Code"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="phone_number"
          value={formData.phone_number || ''}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select
          name="address_type"
          value={formData.address_type || 'home'}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="home">Home</option>
          <option value="office">Office</option>
        </select>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="default_billing"
            checked={formData.default_billing || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span>Default Billing</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="default_shipping"
            checked={formData.default_shipping || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span>Default Shipping</span>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Address
      </button>
    </form>
  )
}

export default AddAddress
