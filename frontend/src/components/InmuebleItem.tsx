import type { Inmueble } from '../types/inmueble'
import { MapPin, BedDouble, Maximize2 } from 'lucide-react'
import { inmuebleStatus, statusColor } from '../utils/inmueble'

const InmuebleItem = ({
  inmueble,
  onClick,
}: {
  inmueble: Inmueble
  onClick: () => void
}) => {
  const formattedPrice = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(inmueble.price)

  return (
    <div
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 cursor-pointer"
      onClick={() => onClick()}
    >
      <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
        <img
          src="https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_600x.jpg?v=1500393334"
          alt={inmueble.address}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md ${statusColor[inmueble.status as keyof typeof statusColor]}`}
          >
            {inmuebleStatus[inmueble.status as keyof typeof inmuebleStatus]}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {formattedPrice}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
          <p className="truncate text-sm font-medium">{inmueble.address}</p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <BedDouble className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Habitaciones</p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {inmueble.rooms}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Maximize2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Superficie</p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {inmueble.squareMeters} m²
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InmuebleItem
