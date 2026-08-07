import { useState, type SubmitEvent } from 'react'
import { User, Mail, Calendar, Loader2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { api } from '../lib/api'
import { Button } from '../components/button'
import type { HttpError } from '../types/common'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const ProfilePage = () => {
  const { user, logout } = useAuthStore()

  const [name, setName] = useState(user?.name || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    if (!name.trim() || name === user?.name) return

    try {
      setIsSubmitting(true)

      await api.patch(`/usuarios/${user?.id}`, { name })

      return toast.success('Nombre actualizado correctamente')
    } catch (error) {
      const e = error as AxiosError<HttpError>
      return toast.error(e.response?.data.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      )
    ) {
      return
    }

    try {
      await api.delete(`/usuarios/${user?.id}`)
      await logout()
      navigate('/login')
      toast.success('Cuenta eliminada correctamente')
    } catch (error) {
      const e = error as AxiosError<HttpError>
      return toast.error(e.response?.data.message)
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4 sm:p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white shadow-sm">
            {user?.name?.charAt(0).toUpperCase() ||
              user?.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Perfil de Usuario
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Gestiona los datos de tu cuenta
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nombre completo
            </label>
            <div className="relative mt-1.5">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-transparent py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:text-white"
                placeholder="Tu nombre"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Correo electrónico
            </label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-500 cursor-not-allowed dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400"
              />
            </div>
          </div>

          {user?.createdAt && (
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                Miembro desde {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !name.trim() || name === user?.name}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Guardar Cambios</span>
            </Button>
            <Button
              variant="destructive"
              disabled={isSubmitting}
              onClick={() => handleDeleteAccount()}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Eliminar Cuenta</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
