import React from 'react'
import AppRoutes from './components/utils/AppRoutes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
export const API_URL = 'https://student-management-be.onrender.com/'
const App = () => {
  const routes = createBrowserRouter(AppRoutes)
  return (
    <>
    <RouterProvider router={routes} />
    </>
  )
}

export default App