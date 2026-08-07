import { useEffect, useState, type SubmitEvent } from 'react'
import { FormControlInput, FormControlLabel } from './form-control'
import { toast } from 'sonner'
import { api } from '../lib/api'
import type { TipoInmueble } from '../types/inmueble'
import type { AxiosError } from 'axios'
import type { HttpError } from '../types/common'

const AddInmueble = ({
  setIsOpen,
  getInmuebles,
}: {
  setIsOpen: (isOpen: boolean) => void
  getInmuebles: () => void
}) => {
  const [types, setTypes] = useState<TipoInmueble[]>([])

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const address = formData.get('address')
    const price = formData.get('price')
    const squareMeters = formData.get('area')
    const rooms = formData.get('rooms')
    const propertyTypeId = formData.get('propertyType')

    if (!address || !price || !squareMeters) {
      return toast.error('Por favor, completa todos los campos')
    }

    if (!propertyTypeId) {
      return toast.error('Por favor, selecciona un tipo de inmueble')
    }

    if (Number(price) <= 0 || Number(squareMeters) <= 0) {
      return toast.error(
        'El precio y la superficie deben ser números positivos',
      )
    }

    try {
      await api.post('/inmuebles', {
        address: address.toString(),
        price: Number(price),
        squareMeters: Number(squareMeters),
        rooms: Number(rooms),
        propertyTypeId: propertyTypeId.toString(),
      })
      toast.success('Inmueble agregado exitosamente')
      setIsOpen(false)
      getInmuebles()
    } catch (error) {
      const e = error as AxiosError<HttpError>
      return toast.error(e.response?.data.message)
    }
  }

  const getTypes = async () => {
    try {
      const response = await api.get<TipoInmueble[]>('/tipos-inmueble')
      setTypes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTypes()
  }, [])

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <FormControlLabel htmlFor="address">Dirección</FormControlLabel>

        <FormControlInput
          id="address"
          name="address"
          type="text"
          required
          autoComplete="address"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormControlLabel htmlFor="price">Precio ($)</FormControlLabel>
          <FormControlInput
            id="price"
            name="price"
            type="number"
            required
            autoComplete="price"
          />
        </div>
        <div>
          <FormControlLabel htmlFor="area">Superficie (m²)</FormControlLabel>
          <FormControlInput
            id="area"
            name="area"
            type="number"
            required
            autoComplete="area"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormControlLabel htmlFor="rooms">Habitaciones</FormControlLabel>
          <FormControlInput
            id="rooms"
            name="rooms"
            type="number"
            placeholder='Si no tiene habitaciones, ingrese "0"'
            required
            autoComplete="rooms"
          />
        </div>
        <div>
          <FormControlLabel htmlFor="propertyType">
            Tipo de inmueble
          </FormControlLabel>
          <select
            id="propertyType"
            name="propertyType"
            required
            className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm/6 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          >
            <option value="">Selecciona un tipo</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
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
          Guardar Inmueble
        </button>
      </div>
    </form>
  )
}

export default AddInmueble
