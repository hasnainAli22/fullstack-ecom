import React from 'react'
import UpdateButton from '@/components/common/UpdateButton'
import { User } from '@/redux/features/authApiSlice'

interface ProfileFormProps {
  user?: User
}
const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  return (
    <div className="w-full md:w-1/2 flex-1">
      <h1 className="text-2xl">Profile</h1>
      <form className="mt-4 flex flex-col gap-4">
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
  )
}

export default ProfileForm
