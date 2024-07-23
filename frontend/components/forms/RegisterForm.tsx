'use client'

import { useRegister } from '@/hooks'
import { Form } from '@/components/forms'
import classNames from 'classnames'

export default function RegisterForm() {
  const {
    first_name,
    last_name,
    email,
    password,
    re_password,
    isLoading,
    onChange,
    onSubmit,
  } = useRegister()

  const config = [
    {
      labelText: 'First name',
      labelId: 'first_name',
      type: 'text',
      value: first_name,
      required: true,
      className: 'w-full md:w-1/2',
    },
    {
      labelText: 'Last name',
      labelId: 'last_name',
      type: 'text',
      value: last_name,
      required: true,
      className: 'w-full md:w-1/2',
    },
    {
      labelText: 'Email address',
      labelId: 'email',
      type: 'email',
      value: email,
      required: true,
      className: 'w-full mt-4',
    },
    {
      labelText: 'Password',
      labelId: 'password',
      type: 'password',
      value: password,
      required: true,
      className: 'w-full md:w-1/2 mt-4',
    },
    {
      labelText: 'Confirm password',
      labelId: 're_password',
      type: 'password',
      value: re_password,
      required: true,
      className: 'w-full md:w-1/2 mt-4',
    },
  ]

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Sign up"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}
