'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, user } = useAuth()
  const router = useRouter()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setError('Already logged in. Loggout first to login as an other user.')
      setIsRedirecting(true)
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login({ email, password })
      setMessage('Sucessful! you are being redirected.')
      // Redirect to the other page
      router.push('/')
    } catch (error) {
      setError(`${error}`)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">Login</h1>
        {message && <div className="text-green-600 text-sm">{message}</div>}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-sm underline cursor-pointer" onClick={() => {}}>
          Forgot Password?
        </div>
        <button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading || isRedirecting}
        >
          {isRedirecting
            ? 'Redirecting...'
            : isLoading
            ? 'Loading...'
            : 'Login'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        <div
          className="text-sm underline cursor-pointer"
          onClick={() => router.push('/register')}
        >
          {"Don't"} have an account?
        </div>
      </form>
    </div>
  )
}

export default Login
