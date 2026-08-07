import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 3) {
        end = 4
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3
      }

      if (start > 2) pages.push('...')
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPages - 1) pages.push('...')

      pages.push(totalPages)
    }

    return pages
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <nav className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6 dark:border-slate-800">
      <div className="hidden sm:block">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Página{' '}
          <span className="font-semibold text-slate-900 dark:text-white">
            {currentPage}
          </span>{' '}
          de{' '}
          <span className="font-semibold text-slate-900 dark:text-white">
            {totalPages}
          </span>
        </p>
      </div>

      <div className="flex flex-1 justify-between sm:justify-end gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage || isLoading}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Anterior</span>
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (typeof page === 'string') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1 text-sm font-medium text-slate-400"
                >
                  {page}
                </span>
              )
            }

            const isActive = page === currentPage

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={isLoading}
                className={`h-9 min-w-9 rounded-xl px-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage || isLoading}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span>Siguiente</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  )
}
