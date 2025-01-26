"use client";

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SPORT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to dynamically attach the token to every request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Access localStorage only on the client
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
