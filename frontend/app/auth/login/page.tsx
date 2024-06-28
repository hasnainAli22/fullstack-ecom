import Link from 'next/link'
import { LoginForm } from '@/components/forms'
import { SocialButtons } from '@/components/common'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',
}

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <SocialButtons />

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
