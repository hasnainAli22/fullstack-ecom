// types/cart.d.ts

export interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    quantity: number;
  }
  
  export interface CartItem {
    id?: number;
    product: Product;
    quantity: number;
    cart?: number;
  }
  
  export interface Cart {
    id: number;
    user: number;
    created_at: string;
    items: CartItem[];
  }
  