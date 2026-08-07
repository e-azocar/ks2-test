import { type SubmitEvent } from 'react'
import { FormControlInput, FormControlLabel } from './form-control'
import { toast } from 'sonner'
import { api } from '../lib/api'
import type { AxiosError } from 'axios'
import type { HttpError } from '../types/common'

const AddUser = ({
  setIsOpen,
  getUsers,
}: {
  setIsOpen: (isOpen: boolean) => void
  getUsers: () => void
}) => {
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirm-password')

    if (!name || !email || !password || !confirmPassword) {
      return toast.error('Por favor, completa todos los campos')
    }

    if (password.toString().length < 8) {
      return toast.error('La contraseña debe tener al menos 8 caracteres')
    }

    if (password !== confirmPassword) {
      return toast.error('Las contraseñas no coinciden')
    }

    try {
      await api.post('/auth/register', {
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
        confirmPassword: confirmPassword.toString(),
      })
      toast.success('Usuario agregado exitosamente')
      setIsOpen(false)
      getUsers()
    } catch (error) {
      const e = error as AxiosError<HttpError>
      return toast.error(e.response?.data.message)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <FormControlLabel htmlFor="name">Nombre</FormControlLabel>

        <FormControlInput
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
        />
      </div>

      <div>
        <FormControlLabel htmlFor="email">Email</FormControlLabel>

        <FormControlInput
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormControlLabel htmlFor="password">Contraseña</FormControlLabel>
          <FormControlInput
            id="password"
            name="password"
            type="password"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <FormControlLabel htmlFor="confirm-password">
            Confirmar Contraseña
          </FormControlLabel>
          <FormControlInput
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Guardar Usuario
        </button>
      </div>
    </form>
  )
}

export default AddUser
