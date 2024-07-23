'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useLogoutMutation } from '@/redux/features/authApiSlice'
import { useGetCartQuery } from '@/redux/product/productApiSlice'
import { setCart, clearCart } from '@/redux/features/cartSlice'
import { logout as setLogout } from '@/redux/features/authSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import CartModel from './CartModel'
import { toast } from 'react-toastify'

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const cartItems = useAppSelector((state) => state.cart.items)

  const { data: cart } = useGetCartQuery()

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (cart) {
      dispatch(setCart(cart.items))
    }
  }, [cart, dispatch])

  const [logout] = useLogoutMutation()

  const handleProfile = () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    } else {
      setIsProfileOpen((prev) => !prev)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout())
      })
    setIsProfileOpen((prev) => !prev)
    setIsLoading(false)
    dispatch(clearCart())
    toast.info('Sad to see you go!')
  }
  const handleDashboard = () => {
    router.push('/dashboard')
    setIsProfileOpen((prev) => !prev)
  }

  const handleCartIconClick = () => {
    setIsCartOpen((prev) => !prev)
  }

  // Calculate total quantity of items in the cart
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const Profile = () => {
    return (
      <>
        <Image
          src="/profile.png"
          alt="Profile"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleProfile}
        />
        {isProfileOpen && (
          <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
            <div className="cursor-pointer" onClick={handleDashboard}>
              Profile
            </div>
            <div className="mt-2 cursor-pointer" onClick={handleLogout}>
              {isLoading ? 'Logging out...' : 'Logout'}
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {isAuthenticated ? <Profile /> : <Link href="/auth/login">Login</Link>}
      <div className="relative cursor-pointer" onClick={handleCartIconClick}>
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {itemCount}
        </div>
      </div>
      {isCartOpen && <CartModel />}
    </div>
  )
}

export default NavIcons
