"use client";

import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SPORT,
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + accessToken
    },
});
