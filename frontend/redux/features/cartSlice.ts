// redux/features/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '@/redux/product/productApiSlice'

interface CartState {
  items: CartItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { setCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
