import './App.css';
import LayoutUser from './layouts/layoutUser';
import LayoutAdmin from './layouts/layoutAdmin';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// On réalise une function qui fonctione avec le Router de React

const Router = createBrowserRouter([
  {path:"/",
    element : <LayoutUser/>
  },
  {path:"/admin",
    element : <LayoutAdmin/>
  }

])


const App = function () {
  return (
      <>
      <RouterProvider router={Router}/>
      </>
  )
}

export default App