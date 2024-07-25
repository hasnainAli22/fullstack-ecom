import React from 'react'
import AddressCard from '@/components/common/AddressCard'
import { Address } from '@/redux/features/authApiSlice'

interface AddressListType {
  addresses: Address[]
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onAdd: () => void
}

const AddressList: React.FC<AddressListType> = ({
  addresses,
  onEdit,
  onDelete,
  onAdd,
}) => (
  <div className="w-full md:w-1/2 flex-1 overflow-y-auto max-h-[400px] p-4 scrollbar-hide">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl">Addresses</h1>
      <button
        onClick={onAdd}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Add
      </button>
    </div>
    {addresses?.length > 0 ? (
      addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      <p className="text-gray-500">No addresses available.</p>
    )}
  </div>
)

export default AddressList
