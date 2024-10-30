import '@/styles/reset.scss'
import '@/styles/global.scss'
import '@/styles/tailwindcss-output.css'

import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { dynamicRoutes } from '@/lib/dynamic-routes-with-vite'

const browserRouter = createBrowserRouter( dynamicRoutes )

export default function App() {
  return (
    <StrictMode>
      <RouterProvider router={browserRouter} />
    </StrictMode>
  )
}
