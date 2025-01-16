import './App.css';
import LayoutUser from './layouts/layoutUser';
import LayoutAdmin from './layouts/layoutAdmin';
import HomePage from './pages/HomePage';
import SignPage from './pages/SignPage';
import LogPage from './pages/LogPage';
import CardsPage from './pages/CardsPage';
import CardSelected from './pages/CardSelected';
import DecksPage from './pages/DecksPage';
import UsersPage from './pages/UserPage';import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// On réalise une function qui fonctione avec le Router de React

const Router = createBrowserRouter([
  {path:"/",
  element : <LayoutUser/>,
  children: 
  [{path:"/home",
      element : <HomePage/>},
    {path:"/sign",
      element : <SignPage/>}, 
    {path: "/log",
      element: <LogPage/>},
    {path: "/cards",
      element: <CardsPage/>},
    {path: "/cards/:id",
      element: <CardSelected/>},
    {path: "/decks",
      element: <DecksPage/>},
    {path: "/users",
       element: <UsersPage/>} 
    ]
  },


  {path:"/admin",
    element : <LayoutAdmin/>}
])


const App = function () {
  return (
      <>
      <RouterProvider router={Router}/>
      </>
  )
}

export default App