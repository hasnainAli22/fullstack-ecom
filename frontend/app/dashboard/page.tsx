'use client'

import React, { useState } from 'react'
import {
  useRetrieveUserQuery,
  useRetrieveUserAddressesQuery,
  useDeleteAddressMutation,
  Address,
} from '@/redux/features/authApiSlice'
import { Spinner } from '@/components/common'
import ProfileForm from '@/components/common/ProfileForm'
import AddressList from '@/components/common/AddressList'
import AddAddressHandler from '@/components/common/AddAddressHandler'
import { toast } from 'react-toastify'

export default function Page() {
  const { data: user, isLoading, isFetching } = useRetrieveUserQuery()
  const { data: addresses, error, refetch } = useRetrieveUserAddressesQuery()
  const [deleteAddress] = useDeleteAddressMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [currentAddress, setCurrentAddress] = useState<Address | undefined>(
    undefined
  )

  if (error) return <div>console.log(error)</div>

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    )
  }

  const handleEdit = (address: Address) => {
    setModalMode('edit')
    setCurrentAddress(address)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    console.log(`Delete address with ID: ${id}`)
    try {
      await deleteAddress(id).unwrap()
      refetch()
      toast.info('Successfully Deleted')
    } catch (e) {
      console.log(e)
      toast.error("Can't Delete")
    }
  }

  const handleAdd = () => {
    setModalMode('add')
    setCurrentAddress(undefined)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentAddress(undefined)
  }

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 mt-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <ProfileForm user={user} />
      <AddressList
        addresses={addresses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
      <AddAddressHandler
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        address={currentAddress}
      />
    </div>
  )
}
