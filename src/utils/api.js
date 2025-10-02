import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication API calls
export const loginUser = async (email, password) => {
  // Simulate API call - replace with actual endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          user: { id: 1, name: 'Admin User', email },
          token: 'mock-jwt-token'
        }
      })
    }, 1000)
  })
}

export const registerUser = async (userData) => {
  // Simulate API call - replace with actual endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          user: { id: 1, ...userData },
          token: 'mock-jwt-token'
        }
      })
    }, 1000)
  })
}

// Requests API calls
export const getRequests = async (page = 1, limit = 10, search = '') => {
  // Simulate API call - replace with actual endpoint
  return api.get(`/requests?page=${page}&limit=${limit}&search=${search}`)
}

export const createRequest = async (requestData) => {
  // Simulate API call - replace with actual endpoint
  return api.post('/requests', requestData)
}

export const updateRequest = async (id, requestData) => {
  // Simulate API call - replace with actual endpoint
  return api.put(`/requests/${id}`, requestData)
}

export const deleteRequest = async (id) => {
  // Simulate API call - replace with actual endpoint
  return api.delete(`/requests/${id}`)
}

// Export the configured axios instance for custom calls
export default api