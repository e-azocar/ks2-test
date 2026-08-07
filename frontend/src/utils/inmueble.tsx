import { Bookmark, CircleDollarSign, DoorOpen } from 'lucide-react'

export const inmuebleStatus = {
  AVAILABLE: 'Disponible',
  RESERVED: 'Reservado',
  SOLD: 'Vendido',
}

export const statusColor = {
  AVAILABLE:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
  RESERVED:
    'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-400',
  SOLD: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400',
}

export const statusIcon = {
  AVAILABLE: <DoorOpen className="h-3.5 w-3.5" />,
  RESERVED: <Bookmark className="h-3.5 w-3.5" />,
  SOLD: <CircleDollarSign className="h-3.5 w-3.5" />,
}
