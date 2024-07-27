import React from 'react'
import AddAddressModel from '@/components/common/AddAddressModel'
import { Address } from '@/redux/features/authApiSlice'

type AddAddressHandlerType = {
  isOpen: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  address?: Address
}

const AddAddressHandler: React.FC<AddAddressHandlerType> = ({
  isOpen,
  onClose,
  mode,
  address,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-2 rounded-lg shadow-lg max-w-xl w-full max-h-[calc(100vh-35px)] overflow-auto scrollbar-hide">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <AddAddressModel onClose={onClose} mode={mode} address={address} />
      </div>
    </div>
  )
}

export default AddAddressHandler
