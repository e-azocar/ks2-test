import { create } from 'zustand'
import { api } from '../lib/api'
import type { User, UserLogin } from '../types/user'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: UserLogin) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    const { data } = await api.post<{ user: User }>('/auth/login', credentials)
    set({ user: data.user, isAuthenticated: true })
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      set({ user: null, isAuthenticated: false })
    }
  },

  refresh: async () => {
    try {
      const { data } = await api.get<User>('/auth/me')
      set({ user: data, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false })
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true })
      const { data } = await api.get<User>('/auth/me')
      set({ user: data, isAuthenticated: true })
    } catch {
      set({ user: null, isAuthenticated: false })
    } finally {
      set({ isLoading: false })
    }
  },
}))
