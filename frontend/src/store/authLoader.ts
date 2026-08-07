import { redirect } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'

export const protectedLoader = async () => {
  const { isAuthenticated, checkAuth } = useAuthStore.getState()

  if (!isAuthenticated) {
    await checkAuth()
  }

  if (!useAuthStore.getState().isAuthenticated) {
    throw redirect('/login')
  }

  return null
}

export const publicOnlyLoader = async () => {
  const { isAuthenticated, checkAuth } = useAuthStore.getState()

  if (!isAuthenticated) {
    await checkAuth()
  }

  if (useAuthStore.getState().isAuthenticated) {
    throw redirect('/')
  }

  return null
}
