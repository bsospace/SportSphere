'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import { api } from '../utils/api.util'
import { useRouter, useSearchParams } from 'next/navigation'

export interface User {
  id: string
  username: string
  email: string
  avatar: string
  roles: string[]
  premissions: string[]
}

interface AuthContextProps {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => Promise<void>
  getProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      localStorage.removeItem('accessToken') // Clear token
      localStorage.removeItem('refreshToken')
      setUser(null) // Clear user state
      setIsAuthenticated(false)
      router.push('/auth/login') // Redirect to login
    } finally {
      setIsLoading(false)
    }
  }

  // Redirect if `redirect` is specified
  const searchParams = useSearchParams()
  const redirect = searchParams ? searchParams.get('redirect') : null
  
  // Fetch user profile
  const getProfile = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) throw new Error('No token found')

      const response = await api.get('/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = response.data as User

      setUser(data)
      setIsAuthenticated(true)

      router.push(redirect ? (redirect as string) : '/')
    } catch (error) {
      console.error('Error fetching profile:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-fetch profile on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      getProfile()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        logout,
        getProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
