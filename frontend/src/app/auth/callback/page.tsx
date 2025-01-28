'use client';

import { useEffect } from 'react';

const Callback = () => {
  useEffect(() => {
    // Get tokens from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    // Save tokens to localStorage
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    // Redirect based on token presence
    if (!accessToken || !refreshToken) {
      window.location.href = '/auth/login'; // Redirect to login if tokens are missing
    } else {
      window.location.href = '/'; // Redirect to home on success
    }
  }, []);

  return <p>Processing login...</p>;
};

export default Callback;
