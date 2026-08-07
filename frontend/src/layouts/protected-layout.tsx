import { Outlet } from 'react-router'
import { Navbar } from '../components/navbar'

const ProtectedLayout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout
