// components/Add.js
'use client';

import {Product, useAddItemToCartMutation } from '@/redux/product/productApiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';
import { addToCart } from '@/redux/features/cartSlice';
interface AddProps {
  product: Product;
  productId: number;
  stockNumber: number;
}

const Add: React.FC<AddProps> = ({ product, productId, stockNumber })=> {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const [addItemToCart] = useAddItemToCartMutation();

  const handleQuantity = (type:string) => {
    if (type === 'd' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
    if (type === 'i' && quantity < stockNumber) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleAddToCart = async (productId:number) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: product.quantity

    }
    try {
      const cartItem = await addItemToCart({ productId, quantity }).unwrap();
      dispatch(addToCart({ product, quantity }));
      console.log('Added to cart:', cartItem);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity('d')}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity('i')}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span> left!<br />{"Don't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={() => handleAddToCart(productId)}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
