// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { loginUser, fetchUserProfile, registerUser } from '../lib/api';

// export const useAuth = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             fetchUserProfile(token)
//                 .then(data => {
//                     setUser(data);
//                     setLoading(false);
//                 })
//                 .catch(() => {
//                     localStorage.removeItem('token');
//                     setLoading(false);
//                 });
//         } else {
//             setLoading(false);
//         }
//     }, []);

//     const login = async (credentials) => {
//         const data = await loginUser(credentials);
//         localStorage.setItem('token', data.token);
//         setUser(data.user);
//         router.push('/profile');
//     };

//     const register = async (userData) => {
//         const data = await registerUser(userData);
//         localStorage.setItem('token', data.token);
//         setUser(data.user);
//         router.push('/profile');
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         router.push('/login');
//     };

//     return { user, loading, login, register, logout };
// };
