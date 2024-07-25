import React from 'react'
import { Address } from '@/redux/features/authApiSlice'

interface AddressCardType {
  address: Address
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const AddressCard: React.FC<AddressCardType> = ({
  address,
  onEdit,
  onDelete,
}) => (
  <div className="border border-gray-300 rounded-lg p-4 mt-4 shadow-md bg-white">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold text-gray-800">
        {address.address_type === 'home' ? 'Home Address' : 'Office Address'}
      </h2>
      <span className="text-gray-600">{address.user}</span>
    </div>
    <div className="mb-2">
      <p className="text-gray-700">
        {address.postal_code} - {address.street}
      </p>
      <p className="text-gray-700">{address.city}</p>
      <p className="text-gray-700">{address.landmark}</p>
      <p className="text-gray-700">{address.phone_number}</p>
    </div>
    <div className="flex justify-between items-center">
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
    </div>
    <div className="flex justify-between items-center mb-2">
      <p className="text-xs text-gray-500">
        <small>
          Created at: {new Date(address.created_at).toLocaleDateString()}
        </small>
      </p>
      <p className="text-xs text-gray-500">
        <small>
          Updated at: {new Date(address.updated_at).toLocaleDateString()}
        </small>
      </p>
    </div>
    <div className="flex justify-between">
      <button
        onClick={() => onEdit(address.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(address.id)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete
      </button>
    </div>
  </div>
)

export default AddressCard
