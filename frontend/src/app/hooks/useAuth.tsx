'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
import { api } from '../utils/api.util'
import { useRouter } from 'next/navigation'
import { showCustomToast } from '@/components/CustomToast'

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
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  logout: () => Promise<void>
  getProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
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

  // Fetch user profile
  const getProfile = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
      }

      const response = await api.get('/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = response.data as User

      setUser(data)
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error downloading file:', error)
      if (error.response.status === 403) {
        showCustomToast('danger', 'กรุณาเข้าสู่ระบบอีกครั้งด้วย email @go.buu.ac.th เท่านั้น')
        router.push('/auth/login')
      }
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-fetch profile on mount
  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        setIsLoading,
        setIsAuthenticated,
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
