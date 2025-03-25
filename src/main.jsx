import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </StrictMode>,
)
