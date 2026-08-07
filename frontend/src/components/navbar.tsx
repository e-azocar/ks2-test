import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router'
import { Building2, LogOut, User, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

export function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const user = useAuthStore((state) => state.user)
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Gestión de Inmuebles
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClasses}>
            Inmuebles
          </NavLink>
          <NavLink to="/usuarios" className={navLinkClasses}>
            Usuarios
          </NavLink>
        </nav>

        <div className="items-center gap-4 flex">
          <>
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                  {user?.email.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate text-xs font-semibold">
                  {user?.email}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <Link
                    to="/perfil"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <User className="h-4 w-4" />
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      logout().then(() => {
                        navigate('/login')
                      })
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </header>
  )
}
