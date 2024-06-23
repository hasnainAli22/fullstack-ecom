import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your Django backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products/products');
    // print("Response", response)
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add more API functions as needed
