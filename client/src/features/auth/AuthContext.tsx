import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getMe, type User } from '../../services/auth.service'


interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const logout = () => {
    localStorage.removeItem('gmeeting_token')
    setUser(null)
    setLoading(false)
  }

  const refreshUser = async () => {
    const token = localStorage.getItem('gmeeting_token')
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const res = await getMe()
      if (res.success && res.user) {
        setUser(res.user)
      } else {
        logout()
      }
    } catch (error) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
