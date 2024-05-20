import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'
import { Toaster } from 'react-hot-toast'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Home />} />
        <Route path='editor/:roomId' element={<EditorPage />}/>
      </>
    )
  )

  return (
    <>
      <div>
        <Toaster
          position='top-right'
        >
        </Toaster>
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
