import { apiSlice } from '../services/apiSlice'

export interface Product {
  id: number
  seller: string
  category: string
  name: string
  desc: string
  image: string
  price: string
  quantity: number
  created_at: string
  updated_at: string
  discounted_price: string
}

export interface Category {
  id: number
  name: string
  icon: string
  created_at: string
  updated_at: string
}
// types.ts
export interface CartProduct {
  id: number
  name: string
  image: string
  discounted_price: string
  quantity: number
}

export interface CartItem {
  id?: number
  product: CartProduct
  quantity: number
  cart?: number
}

export interface Cart {
  id: number
  user: number
  created_at: string
  items: CartItem[]
}

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<
      Product[],
      { categoryId?: number; search?: string }
    >({
      query: ({ categoryId, search }) => {
        let url = '/products/products/'

        if (search !== undefined) {
          url += `?search=${search}`
        }

        if (!Number.isNaN(categoryId) && categoryId !== undefined) {
          url += `?category=${categoryId}`
        }

        return url
      },
    }),
    fetchProductsById: builder.query<Product, number>({
      query: (productId) => `/products/products/${productId}`,
    }),
    fetchCategory: builder.query<Category[], void>({
      query: () => `/products/categories/`,
    }),
    getCart: builder.query<Cart, void>({
      query: () => '/products/carts/my-cart/',
    }),
    addItemToCart: builder.mutation<
      Cart,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: '/products/carts/add-item/',
        method: 'POST',
        body: { product_id: productId, quantity },
      }),
    }),
    removeItemFromCart: builder.mutation<Cart, { productId: number }>({
      query: ({ productId }) => ({
        url: '/products/carts/remove-item/',
        method: 'POST',
        body: { product_id: productId },
      }),
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: '/products/carts/clear-cart/',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useFetchProductsQuery,
  useFetchProductsByIdQuery,
  useFetchCategoryQuery,
  useGetCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useClearCartMutation,
} = productApi
