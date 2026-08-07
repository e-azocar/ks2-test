import { type SubmitEvent } from 'react'
import { Link } from 'react-router'
import { FormControlInput, FormControlLabel } from '../components/form-control'
import { Button } from '../components/button'
import { api } from '../lib/api'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { HttpError } from '../types/common'

const RegisterPage = () => {
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
      return toast.success('Registro exitoso, por favor inicia sesión')
    } catch (error) {
      const e = error as AxiosError<HttpError>
      return toast.error(e.response?.data.message)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Crea una cuenta nueva
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <FormControlLabel htmlFor="name">Nombre</FormControlLabel>
              <div className="mt-2">
                <FormControlInput
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <FormControlLabel htmlFor="email">Email address</FormControlLabel>
              <div className="mt-2">
                <FormControlInput
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <FormControlLabel htmlFor="password">
                  Contraseña
                </FormControlLabel>
              </div>
              <div className="mt-2">
                <FormControlInput
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <FormControlLabel htmlFor="confirm-password">
                  Confirmar contraseña
                </FormControlLabel>
              </div>
              <div className="mt-2">
                <FormControlInput
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div>
              <Button variant="primary" type="submit">
                Registrarse
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
