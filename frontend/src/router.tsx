import { createBrowserRouter } from 'react-router'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import { protectedLoader, publicOnlyLoader } from './store/authLoader'
import ProtectedLayout from './layouts/protected-layout'
import Inmuebles from './pages/inmuebles'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    loader: protectedLoader,
    children: [
      {
        path: '/',
        element: <Inmuebles />,
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
