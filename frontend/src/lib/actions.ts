// lib/api.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const fetchData = async (url: string, options = {}) => {
  try {
    const response = await axiosInstance.get(url, options)
    return response.data
  } catch (errors) {
    console.log(`Error retriving data ${errors}`)
    throw new Error('Could not get data')
  }
}

const API_URL = 'http://localhost:8000/api'
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
  category?: number
  sort?: string
  page?: string
}

export interface Category {
  id: number
  name: string
  icon: string
  created_at: string
  updated_at: string
}

// Authorization
export interface UserRegistrationData {
  email: string
  password1: string
  password2: string
  first_name: string
  last_name: string
}

export interface UserLoginData {
  email: string
  password: string
}

export interface AuthResponse {
  access: string
  refresh: string
  user: object
}

interface ResendEmailResponse {
  detail: string
}
interface ConfirmEmailResponse {
  detail: string
}

export const registerUser = async (
  userData: UserRegistrationData
): Promise<void> => {
  const response = await axios.post(`${API_URL}/user/register/`, userData)
  return response.data
}

export const resendEmail = async (
  userEmail: string
): Promise<ResendEmailResponse> => {
  const response = await axios.post(`${API_URL}/resend-email/`, {
    email: userEmail,
  })
  return response.data
}

export const confirmEmail = async (
  token: string
): Promise<ConfirmEmailResponse> => {
  const response = await axios.post(
    `${API_URL}/account-confirm-email/${token}/`
  )
  return response.data
}

export const loginUser = async (
  userData: UserLoginData
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/user/login/`, userData)
  return response.data
}

export const logoutUser = async (): Promise<void> => {
  const response = await axios.post(`${API_URL}/logout`)
  return response.data
}

export const fetchUserProfile = async (token: string): Promise<any> => {
  const response = await axios.get(`${API_URL}/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const fetchProducts = async (
  params?: FetchProductsParams
): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products/products/`, { params })
  return response.data
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/products/categories/`)
  return response.data
}

export const fetchProductsById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/products/${id}`)
  return response.data
}
