import axios, { AxiosError } from 'axios'
import { useAuthStore } from '../store/useAuthStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const isSigninRoute =
        error.config?.url?.includes('/login') ||
        error.config?.url?.includes('/register')

      if (!isSigninRoute) {
        useAuthStore.setState({ user: null, isAuthenticated: false })
      }
    }

    return Promise.reject(error)
  },
)
