import { Search, ArrowUpDown, RotateCcw } from 'lucide-react'
import type { InmuebleFilters, TipoInmueble } from '../types/inmueble'

interface PropertyFiltersProps {
  filters: InmuebleFilters
  onFilterChange: (newFilters: Partial<InmuebleFilters>) => void
  onReset: () => void
  tiposInmueble?: TipoInmueble[]
  onSearch: () => void
}

export function PropertyFilters({
  filters,
  onFilterChange,
  onReset,
  tiposInmueble = [],
}: PropertyFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por dirección"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-transparent py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:text-white"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="">Todos los Estados</option>
            <option value="AVAILABLE">Disponible</option>
            <option value="RESERVED">Reservado</option>
            <option value="SOLD">Vendido</option>
          </select>

          <select
            value={filters.propertyType}
            onChange={(e) => onFilterChange({ propertyType: e.target.value })}
            className="rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="">Todos los tipos</option>
            {tiposInmueble.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
          <input
            type="number"
            placeholder="Precio Mín ($)"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Precio Máx ($)"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:text-white"
          />

          <select
            value={filters.orderBy}
            onChange={(e) => onFilterChange({ orderBy: e.target.value })}
            className="rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <option value="createdAt">Ordenar por Fecha</option>
            <option value="price">Ordenar por Precio</option>
          </select>

          <button
            type="button"
            onClick={() =>
              onFilterChange({
                order: filters.order === 'asc' ? 'desc' : 'asc',
              })
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowUpDown className="h-4 w-4 text-slate-400" />
            <span>
              {filters.order === 'asc' ? 'Ascendente' : 'Descendente'}
            </span>
          </button>

          <label className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyMine}
              onChange={(e) => onFilterChange({ onlyMine: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Solo Míos</span>
          </label>
        </div>
        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  )
}
