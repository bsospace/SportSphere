/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-empty-object-type*/
"use client";
import { useEffect } from 'react';

type Props = {}

function Callback ({}: Props) {
  useEffect(() => {
    // get access token and refresh token from url query parameters
    const urlParams = new URLSearchParams(window.location.search)

    const accessToken = urlParams.get('accessToken')
    const refreshToken = urlParams.get('refreshToken')
    
    // set access token to local storage
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }

    if(!accessToken || !refreshToken){
      window.location.href = '/login'
    }

    window.location.href = '/'
  }, [])

  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}

export default Callback