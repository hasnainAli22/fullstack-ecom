'use client'

import { toast } from 'react-toastify'

//available on experimental version
//import { useFormStatus } from 'react-dom'

const UpdateButton = () => {
  //const { pending } = useFormStatus()
  return (
    <button
      onClick={() => toast.error('Under Development!')}
      //disabled={pending}
      className="bg-lama text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96"
    >
      {/* {pending ? 'Updating...' : 'Update'} */}
      Update
    </button>
  )
}

export default UpdateButton
