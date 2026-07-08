import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gmeeting_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface LoginResponse {
  success: boolean
  message: string
  token: string
  user: {
    _id: string
    fullName: string
    email: string
    avatar: string
    role: string
    isVerified: boolean
    createdAt: string
    updatedAt: string
  }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', { email, password })
  if (response.data && response.data.token) {
    localStorage.setItem('gmeeting_token', response.data.token)
  }
  return response.data
}

export interface SignupResponse {
  success: boolean
  message: string
  token: string
  user: {
    _id: string
    fullName: string
    email: string
    avatar: string
    role: string
    isVerified: boolean
    createdAt: string
    updatedAt: string
  }
}

export const signup = async (
  fullName: string,
  email: string,
  password: string
): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>('/auth/signup', {
    fullName,
    email,
    password,
  })
  if (response.data && response.data.token) {
    localStorage.setItem('gmeeting_token', response.data.token)
  }
  return response.data
}

export interface User {
  _id: string
  fullName: string
  email: string
  avatar: string
  role: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface MeResponse {
  success: boolean
  user: User
}

export const getMe = async (): Promise<MeResponse> => {
  const response = await api.get<MeResponse>('/auth/me')
  return response.data
}

