// redux/features/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart, CartItem, Product } from '@/redux/product/productApiSlice'
import { productApi } from '@/redux/product/productApiSlice'

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
    // addToCart: (state, action: PayloadAction<CartItem>) => {
    //   const existingItem = state.items.find(item => item.product.id === action.payload.product.id);
    //   if (existingItem) {
    //     existingItem.quantity += action.payload.quantity;
    //   } else {
    //     state.items.push(action.payload);
    //   }
    // },
    // removeFromCart: (state, action: PayloadAction<{ productId: number }>) => {
    //   state.items = state.items.filter(item => item.product.id !== action.payload.productId);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApi.endpoints.getCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload.items
          state.status = 'succeeded'
        }
      )
      .addMatcher(productApi.endpoints.getCart.matchPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(
        productApi.endpoints.getCart.matchRejected,
        (state, { error }) => {
          state.status = 'failed'
          state.error = error.message || 'Failed to load cart'
        }
      )
      .addMatcher(
        productApi.endpoints.addItemToCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload.items
          state.status = 'succeeded'
        }
      )
      .addMatcher(
        productApi.endpoints.removeItemFromCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload.items
          state.status = 'succeeded'
        }
      )
  },
})

export const { setCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
