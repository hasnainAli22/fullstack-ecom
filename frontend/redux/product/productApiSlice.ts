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
  }),
})

export const {
  useFetchProductsQuery,
  useFetchProductsByIdQuery,
  useFetchCategoryQuery,
} = productApi
