// lib/api.ts
import axios from 'axios'

const API_URL = 'http://localhost:8000/api/products'

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

export interface FetchProductsParams {
  name?: string
  category?: string
  type?: string[]
  min_price?: number
  max_price?: number
  limit?: number
  offset?: number
  sort?: string
}

export interface Category {
  id: number
  name: string
  icon: string
  created_at: string
  updated_at: string
}

export const fetchProducts = async (
  params?: FetchProductsParams
): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`, { params }) //TODO: Set Parameters
  return response.data
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/categories`)
  console.log(response)
  return response.data
}

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}/`)
  return response.data
}
