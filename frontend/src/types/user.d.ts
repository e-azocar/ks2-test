export type User = {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export type UserLogin = {
  email: string
  password: string
}

export type UserRegister = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (credentials: UserLogin) => Promise<User>
  logout: () => void
  refreshUser: () => Promise<User>
  setCurrentUser: (user: User | null) => void
}
