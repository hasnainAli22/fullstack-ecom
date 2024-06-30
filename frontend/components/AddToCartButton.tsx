// components/AddToCartButton.tsx
import { useAddItemToCartMutation } from '@/redux/product/productApiSlice';
import { toast } from 'react-toastify';

interface AddToCartButtonProps {
  productId: number;
  stockNumber: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId, stockNumber }) => {
  const [addItemToCart, { isLoading }] = useAddItemToCartMutation();

  const handleAddToCart = async () => {
    if (stockNumber <= 0) {
      toast.error('This product is out of stock.');
      return;
    }
    try {
      await addItemToCart({ productId, quantity: 1 }).unwrap();
      toast.success('Item added to cart!');
    } catch (err) {
      toast.error('Failed to add item to cart.');
      console.error('Failed to add item to cart: ', err);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="bg-blue-500 text-white p-2 mt-2 rounded disabled:bg-gray-400"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
