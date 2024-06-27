'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { resendEmail } from '@/lib/api'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const VerifyEmail = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') // Get email from query parameter
  const [message, setMessage] = useState('')

  const router = useRouter()

  const resendVerificationEmail = async () => {
    try {
      if (!email) {
        setMessage('Email Not Found try again')
        return
      }
      const response = await resendEmail(email)

      if (response.detail == 'ok') {
        setMessage(
          'Verification email has been resent. Please check your inbox.'
        )
      } else {
        setMessage(
          'Failed to resend verification email. Please try again later.'
        )
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100">
      <section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="py-4 flex justify-center w-full">
          <Image
            src="https://www.tailwindtap.com/_next/static/media/nav-logo.371aaafb.svg"
            alt="tailwindtaplogo"
          />
        </header>
        <div className="text-center">
          <div className="text-xl font-bold mb-4">Thanks for Signing Up!</div>
          <div className="text-gray-700 mb-4">
            {email ? (
              <>
                We have sent a verification email to{' '}
                <span className="font-semibold">{email}</span>. Please check
                your inbox and click on the verification link to activate your
                account.
              </>
            ) : (
              'We have sent a verification email. Please check your inbox and click on the verification link to activate your account.'
            )}
          </div>
          <div className="text-sm text-gray-500">
            If you {"don't"} see the email, check your spam folder or{' '}
            <button
              onClick={resendVerificationEmail}
              className="text-blue-500 underline"
            >
              resend the verification email
            </button>
            . If you have already confirmed you email,{' '}
            <button onClick={() => router.push('/login')}>login here.</button>
          </div>
          {message && <div className="mt-4 text-gray-700">{message}</div>}
        </div>
      </section>
    </div>
  )
}

export default VerifyEmail
