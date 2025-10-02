import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
    setLoading(false)
  }, [])

  // LOGIN: store token + user
  const login = async (email, password) => {
    try {

      const data = { email, password };
      const response = await loginUser(data)
      const userData = response.data?.data
      const token = response.data?.token

      if (!userData || !token) throw new Error('Invalid login response')

      const { password: _, ...safeUser } = userData

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(safeUser))
      setUser(safeUser)
      navigate('/dashboard')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' }
    }
  }

  const register = async ({ name, email, password }) => {
    try {
      const userdata = { full_name: name, email, password }
      await registerUser(userdata) 

      navigate('/login', { state: { successMessage: 'Registration successful. Please log in.' } })

      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
