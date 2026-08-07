import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { InmuebleWithDetails } from '../types/inmueble'
import { inmuebleStatus, statusColor, statusIcon } from '../utils/inmueble'
import { BedDouble, Mail, MapPin, Maximize2, User, X } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from './button'
import { Modal } from './modal'
import EditInmueble from './EditInmueble'

const InmuebleDetail = ({
  inmuebleId,
  closeDetail,
  getInmuebles,
}: {
  inmuebleId: string
  closeDetail: () => void
  getInmuebles: () => void
}) => {
  const [inmueble, setInmueble] = useState<InmuebleWithDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { user } = useAuthStore()

  const getInmueble = async (id: string) => {
    setLoading(true)
    try {
      const response = await api.get<InmuebleWithDetails>(`/inmuebles/${id}`)
      setInmueble(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (inmuebleId) {
      getInmueble(inmuebleId)
    }
  }, [inmuebleId])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!loading && !inmueble?.id) {
    return <div>Inmueble no encontrado</div>
  }

  if (inmueble) {
    return (
      <>
        <aside className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Precio de venta
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(inmueble?.price)}
              </h2>
            </div>
            <div className="flex flex-col items-end justify-center gap-2">
              <button
                type="button"
                className="rounded-lg bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                onClick={closeDetail}
              >
                <X className="h-3 w-3" />
              </button>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold ${statusColor[inmueble.status as keyof typeof statusColor]} `}
              >
                {statusIcon[inmueble.status as keyof typeof statusIcon]}
                {inmuebleStatus[inmueble.status as keyof typeof inmuebleStatus]}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3.5 border-t border-slate-100 pt-6 dark:border-slate-800">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Dirección</p>
                <p className="text-sm font-semibold">{inmueble.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <Maximize2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Superficie</p>
                <p className="text-sm font-semibold">
                  {inmueble.squareMeters} m²
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <BedDouble className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Habitaciones</p>
                <p className="text-sm font-semibold">{inmueble.rooms}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800/80 dark:bg-slate-800/50">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Información del Vendedor
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {inmueble.seller.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <p className="truncate text-sm">{inmueble.seller.name}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <p className="truncate">{inmueble.seller.email}</p>
                </div>
              </div>
            </div>
          </div>

          {user?.id === inmueble.seller.id && (
            <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800/80 dark:bg-slate-800/50">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Acciones
              </p>

              <div className="mt-3 flex items-center gap-3">
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                  Editar Inmueble
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => alert('Eliminar inmueble')}
                >
                  Eliminar Inmueble
                </Button>
              </div>
            </div>
          )}
        </aside>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Editar inmueble"
          size="xl"
        >
          <EditInmueble
            setIsOpen={setIsOpen}
            getInmuebles={getInmuebles}
            inmueble={inmueble}
          />
        </Modal>
      </>
    )
  }
}

export default InmuebleDetail
