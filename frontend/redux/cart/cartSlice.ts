// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '@/redux/cart/cartApiSlice'
import { RootState } from '@/redux/store'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product?: any; quantity: number }>
    ) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ product, quantity })
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      )
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items

export default cartSlice.reducer
