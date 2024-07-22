import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hooks'
import { useLoginMutation } from '@/redux/features/authApiSlice'
import { setAuth } from '@/redux/features/authSlice'
import { toast } from 'react-toastify'
import { useGetCartQuery } from '@/redux/product/productApiSlice'

export default function useLogin() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const { refetch } = useGetCartQuery()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    login({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth())
        refetch()
        toast.success('Logged in')
        router.push('/')
      })
      .catch((e) => {
        toast.error(`Failed to login! ${e.data.detail}`)
      })
  }

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  }
}
