'use client'

import { useLogin } from '@/hooks'
import { Form } from '@/components/forms'
import classNames from 'classnames'

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin()

  const config = [
    {
      labelText: 'Email address',
      labelId: 'email',
      type: 'email',
      value: email,
      required: true,
      className: 'w-full',
    },
    {
      labelText: 'Password',
      labelId: 'password',
      type: 'password',
      value: password,
      link: {
        linkText: 'Forgot password?',
        linkUrl: '/password-reset',
      },
      required: true,
      className: 'w-full mt-4',
    },
  ]

  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Sign in"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}
