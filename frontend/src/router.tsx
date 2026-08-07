import { createBrowserRouter } from 'react-router'
import App from './App'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import { protectedLoader, publicOnlyLoader } from './store/authLoader'
import ProtectedLayout from './layouts/protected-layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    loader: protectedLoader,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: publicOnlyLoader,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    loader: publicOnlyLoader,
  },
])

export default router
