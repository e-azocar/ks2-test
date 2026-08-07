import { createBrowserRouter } from 'react-router'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import { protectedLoader, publicOnlyLoader } from './store/authLoader'
import ProtectedLayout from './layouts/protected-layout'
import InmueblesPage from './pages/inmuebles'
import UsersPage from './pages/usuarios'
import ProfilePage from './pages/profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    loader: protectedLoader,
    children: [
      {
        path: '/',
        element: <InmueblesPage />,
      },
      {
        path: '/usuarios',
        element: <UsersPage />,
      },
      {
        path: '/perfil',
        element: <ProfilePage />,
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
