import { type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { FormControlInput, FormControlLabel } from '../components/form-control'
import { Button } from '../components/button'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { HttpError } from '../types/common'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')
    const { login, refresh } = useAuthStore.getState()

    if (!email || !password) {
      return toast.error('Por favor, completa todos los campos')
    }

    try {
      await login({
        email: email.toString(),
        password: password.toString(),
      })
      await refresh()
      navigate('/')
      return toast.success('Inicio de sesión exitoso')
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
            Inicia sesión en tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Regístrate ahora
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
