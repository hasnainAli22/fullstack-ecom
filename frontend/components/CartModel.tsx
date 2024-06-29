// src/components/Cart.tsx
import React from 'react'
import {
  useGetCartItemsQuery,
  useRemoveFromCartMutation,
} from '@/redux/cart/cartApiSlice'
import { useAppDispatch } from '@/redux/hooks'
import { clearCart } from '@/redux/cart/cartSlice'

const CartModel: React.FC = () => {
  const { data: cartItems, error, isLoading } = useGetCartItemsQuery()
  const [removeFromCart] = useRemoveFromCartMutation()
  const dispatch = useAppDispatch()

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId)
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (isLoading) return <p>Loading...</p>
  //   if (error) return <p>Error: {console.log(error!)}</p>; // TODO: print error

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems?.map((item) => (
          <li key={item.product.id}>
            <h3>{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleRemoveFromCart(item.product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearCart}>Clear</button>
    </div>
  )
}

export default CartModel
