import InmuebleItem from './InmuebleItem'
import type { Inmueble } from '../types/inmueble'

const InmuebleList = ({
  inmuebles,
  setSelectedInmueble,
  selectedInmueble,
}: {
  inmuebles: Inmueble[]
  setSelectedInmueble: (inmuebleId: string) => void
  selectedInmueble: string
}) => {
  

  return (
    <div className="rounded-xl text-gray-900">
      <div
        className={`grid ${selectedInmueble ? 'grid-cols-3' : 'grid-cols-4'} gap-4`}
      >
        {inmuebles.map((inmueble) => (
          <InmuebleItem
            key={inmueble.id}
            inmueble={inmueble}
            onClick={() => setSelectedInmueble(inmueble.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default InmuebleList
