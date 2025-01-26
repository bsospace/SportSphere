/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
"use client";

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react'
import { api } from '../utils/api.util'

export interface User {
    id: string
    username: string
    first_name: string
    last_name: string
    email: string
    avatar: string
    roles: string[]
    premissions: string[]
}

interface AuthContextProps {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    accessToken: string | null
    refreshToken: string | null
    logout: () => Promise<void>
    getProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)

    const logout = async () => {
        setIsLoading(true)
        try {
            localStorage.clear()
            window.location.reload()
        } finally {
            setIsLoading(false)
        }
    }

    const getProfile = async () => {
        setIsLoading(true)
        try {
            const response = await api.get('/api/v1/auth/me')
            const data = response.data as User
            setUser({
                id: data.id,
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                avatar: '',
                roles: data.roles,
                premissions: data.premissions
            })
            console.log(response)
            setIsAuthenticated(true)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])  // เรียก getProfile ทุกครั้งที่ isAuthenticated หรือ user เปลี่ยนแปลง

    const hasRole = (role: string) => {
        return user?.roles.includes(role) ?? false
    }

    const hasPermission = (permission: string) => {
        return user?.premissions.includes(permission) ?? false
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                accessToken,
                refreshToken,
                logout,
                getProfile,
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