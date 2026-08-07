import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router'
import './index.css'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <Toaster position='top-right' />
  </>,
)
