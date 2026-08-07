import { Outlet } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'

const ProtectedLayout = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="app-container">
      <header>
        <span>Usuario: {user?.email}</span>
        <button onClick={logout}>Cerrar Sesión</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout
