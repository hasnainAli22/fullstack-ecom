// // app/cartTest/page.tsx
// 'use client'

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { addToCart, removeFromCart, setCart } from '@/redux/features/cartSlice';
// import { useFetchProductsQuery, useGetCartQuery, useAddItemToCartMutation, useRemoveItemFromCartMutation } from '@/redux/product/productApiSlice';

// const CartTestPage = () => { const { data: cart, error, isLoading } = useGetCartQuery();
// const [removeItemFromCart] = useRemoveItemFromCartMutation();
// const dispatch = useDispatch();

// useEffect(() => {
//   if (cart) {
//     dispatch(setCart(cart.items));
//   }
// }, [cart, dispatch]);

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (error) {
//   return <div>Some error occurred...</div>;
// }

// const handleRemove = (productId: number) => {
//   removeItemFromCart({ productId });
// };

// return (
//   <div>
//     <h2>Your Cart</h2>
//     {cart?.items.length ? (
//       <ul>
//         {cart.items.map(item => (
//           <li key={item.id}>
//             <img src={item.product.image} alt={item.product.name} width={50} />
//             <span>{item.product.name}</span>
//             <span>Quantity: {item.quantity}</span>
//             <button onClick={() => handleRemove(item.product.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     ) : (
//       <div>Your cart is empty</div>
//     )}
//   </div>
// );
// };

// export default CartTestPage;
