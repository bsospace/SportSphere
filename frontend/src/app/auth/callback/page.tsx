'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { useEffect } from 'react'

const Callback = () => {
  const { setIsLoading, setIsAuthenticated} =
    useAuth()

  useEffect(() => {
    // Get tokens from query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const accessToken = urlParams.get('accessToken')
    const refreshToken = urlParams.get('refreshToken')

    const redirectParam = localStorage.getItem('redirect') || null

    // Save tokens to localStorage
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      setIsLoading(false)
      setIsAuthenticated(true)
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
      setIsLoading(false)
      setIsAuthenticated(true)
    }

    if (redirectParam) {
      window.location.href = redirectParam
    }else {
      localStorage.removeItem('redirect');
      window.location.href = '/sport'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <p>Processing login...</p>
}

export default Callback
