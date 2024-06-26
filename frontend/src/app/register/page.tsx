'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/context/authContext'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const { register, user } = useAuth()

  const router = useRouter()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (user) {
    setError('Already Logged In!')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const data = {
        email,
        password1: password,
        password2: password,
        first_name,
        last_name,
      }
      await register(data)
      setMessage('Sucess, redirecting to verfiy email.')
      router.push(`/verify-email?email=${email}`)
    } catch (error) {
      setError(`${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className=" px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">Register</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="Enter your First Name"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Enter your Last Name"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
        <button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Register'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        <div
          className="text-sm underline cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Already have an account?
        </div>
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  )

  // return (
  //     <form onSubmit={handleSubmit}>
  //         <div>
  //             <label>Email:</label>
  //             <input
  //                 type="email"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //             />
  //         </div>
  //         <div>
  //             <label>First Name:</label>
  //             <input
  //                 type="text"
  //                 value={first_name}
  //                 onChange={(e) => setFirstName(e.target.value)}
  //             />
  //         </div>
  //         <div>
  //             <label>Last Name:</label>
  //             <input
  //                 type="text"
  //                 value={last_name}
  //                 onChange={(e) => setLastName(e.target.value)}
  //             />
  //         </div>
  //         <div>
  //             <label>Password:</label>
  //             <input
  //                 type="password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //             />
  //         </div>
  //         <button type="submit">Register</button>
  //     </form>
  // );
}

export default Register
