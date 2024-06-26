"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { confirmEmail as apiConfirmEmail } from '@/lib/api';

const ConfirmEmailPage = ({ params }: { params: { token: string } }) => {
  const { token } = params;
  const router = useRouter();
  const [message, setMessage] = useState('Confirming your email...');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await apiConfirmEmail(token);

        if (response.detail) {
          setMessage('Your email has been confirmed successfully!');
        } else {
          setMessage('Failed to confirm your email. The token may be invalid or expired.');
        }
      } catch (error) {
        setMessage('An error occurred while confirming your email.');
      }
    };

    if (token) {
      confirmEmail();
    // console.log("THis is the token",token)
    }
  }, [token]);

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>{message}</p>
    </div>
  );
};

export default ConfirmEmailPage;