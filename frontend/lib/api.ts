// lib/api.ts
import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export interface Category {
  id: number
  name: string
  icon: string
  created_at: string
  updated_at: string
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/products/categories/`)
  return response.data
}
