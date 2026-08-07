import type { User } from './user'

export type Inmueble = {
  id: string
  address: string
  price: number
  rooms: number
  squareMeters: number
  propertyTypeId: string
  sellerId: string
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD'
  createdAt: string
  updatedAt: string
}

export type InmuebleWithDetails = Inmueble & {
  seller: User
}

export type TipoInmueble = {
  id: string
  code: string
  name: string
  createdAt: string
  updatedAt: string
}

export type InmuebleFilters = {
  search?: string
  status: string
  propertyType: string
  minPrice: string
  maxPrice: string
  onlyMine: boolean
  orderBy: string
  order: string
}
