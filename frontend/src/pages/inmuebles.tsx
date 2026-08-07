import { useEffect, useState } from 'react'
import InmuebleDetail from '../components/InmuebleDetalle'
import InmuebleList from '../components/InmuebleList'
import { Button } from '../components/button'
import { Modal } from '../components/modal'
import AddInmueble from '../components/AddInmueble'
import type { Inmueble, InmuebleFilters, TipoInmueble } from '../types/inmueble'
import { api } from '../lib/api'
import { Pagination } from '../components/pagination'
import { PropertyFilters } from '../components/FilterInmuebles'
import type { ListResponse } from '../types/common'

const Inmuebles = () => {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([])
  const [metadata, setMetadata] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  })
  const [selectedInmueble, setSelectedInmueble] = useState('')
  const [types, setTypes] = useState<TipoInmueble[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<
    Partial<InmuebleFilters> | InmuebleFilters
  >({
    search: '',
    status: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    onlyMine: false,
    orderBy: 'createdAt',
    order: 'desc',
  })

  const getTypes = async () => {
    try {
      const response = await api.get<TipoInmueble[]>('/tipos-inmueble')
      setTypes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getInmuebles = async () => {
    const params = {
      page: metadata.page.toString(),
      limit: metadata.limit.toString(),
      search: filters.search || '',
      status: filters.status || '',
      propertyTypeId: filters.propertyType || '',
      minPrice: filters.minPrice || '',
      maxPrice: filters.maxPrice || '',
      orderBy: filters.orderBy || 'createdAt',
      order: filters.order || 'desc',
      onlyMine: filters.onlyMine ? 'true' : '',
    }

    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== '',
      ),
    )

    const query = new URLSearchParams(cleanParams).toString()

    try {
      const response = await api.get<ListResponse<Inmueble>>(
        `/inmuebles?${query}`,
      )
      setMetadata({
        totalPages: response.data.meta.totalPages,
        page: response.data.meta.page,
        limit: response.data.meta.limit,
        total: response.data.meta.total,
      })
      setInmuebles(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > metadata.totalPages) return
    setMetadata((prev) => ({ ...prev, page: newPage }))
  }

  useEffect(() => {
    getInmuebles()
    getTypes()
  }, [])

  useEffect(() => {
    getInmuebles()
  }, [filters, metadata.page])

  return (
    <>
      <div className="container mx-auto mt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Inmuebles</h1>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Agregar Inmueble
          </Button>
        </div>

        <PropertyFilters
          filters={filters as InmuebleFilters}
          onFilterChange={setFilters}
          onSearch={getInmuebles}
          tiposInmueble={types}
          onReset={() => {
            setFilters({
              search: '',
              status: '',
              propertyType: '',
              minPrice: '',
              maxPrice: '',
              onlyMine: false,
              orderBy: 'createdAt',
              order: 'desc',
            })
            getInmuebles()
          }}
        />

        <div className="grid grid-cols-3 grid-rows-1 gap-8 mt-6">
          <div
            className={` ${selectedInmueble ? 'col-span-2' : 'col-span-3'} `}
          >
            <InmuebleList
              inmuebles={inmuebles}
              setSelectedInmueble={setSelectedInmueble}
              selectedInmueble={selectedInmueble}
            />
            <Pagination
              currentPage={metadata.page}
              totalPages={metadata.totalPages}
              onPageChange={onPageChange}
            />
          </div>
          {selectedInmueble && (
            <div className="col-span-1 ">
              <InmuebleDetail
                inmuebleId={selectedInmueble}
                closeDetail={() => setSelectedInmueble('')}
                getInmuebles={getInmuebles}
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Añadir inmueble"
        size="xl"
      >
        <AddInmueble setIsOpen={setIsOpen} getInmuebles={getInmuebles} />
      </Modal>
    </>
  )
}

export default Inmuebles
