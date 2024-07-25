import React from 'react'
import AddAddress from '@/components/common/AddAddressModel'

type AddAddressModalType = {
  isOpen: boolean
  onClose: () => void
}

const AddAddressModal: React.FC<AddAddressModalType> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <AddAddress onClose={onClose} />
      </div>
    </div>
  )
}

export default AddAddressModal
