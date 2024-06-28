import { apiSlice } from '../services/apiSlice';
export interface CartItem {
    product?: any;
    quantity: number;
  }
export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getCartItems: builder.query<CartItem[], void>({
        query: () => '/products/cart-items/',
      }),
      addToCart: builder.mutation<CartItem, { productId: number; quantity: number }>({
        query: ({ productId, quantity }) => ({
          url: '/products/cart-items/',
          method: 'POST',
          body: { product: productId, quantity },
        }),
      }),
      removeFromCart: builder.mutation<void, number>({
        query: (id) => ({
          url: `/products/cart-items/${id}/`,
          method: 'DELETE',
        }),
      }),
    }),
  });
  
  export const {
    useGetCartItemsQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
  } = cartApi;