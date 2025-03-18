import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Pages User
import LayoutUser from './layouts/layoutUser';
import LayoutAdmin from './layouts/layoutAdmin';
import HomePage from './pages/HomePage';
import SignPage from './pages/SignPage';
import AccountPage from './pages/AccountPage';
import CardsPage from './pages/CardsPage';
import CardSelected from './pages/CardSelected';
import DecksPage from './pages/DecksPage';
import DeckSelected from './pages/DeckSelected';
import Deckbuilding from './pages/Deckbuilding';
import CardsDeckPage from './pages/CardsDeckPage';
import UsersPage from './pages/UserPage';
import NewDeck from './pages/NewDeck';
// Pages admin
import NewCard from './pages/NewCard';
import UsersList from './pages/UsersList'; 

// On réalise une function qui fonctione avec le Router de React

const Router = createBrowserRouter([
  {path:"/",
  element : <LayoutUser/>,
  children: 
  [{path:"/",
      element : <HomePage/>},
    {path:"/sign",
      element : <SignPage/>}, 
      {path: "/myspace",
        element: <AccountPage/>},
    {path: "/cards",
      element: <CardsPage/>},
    {path: "/cards/:id",
      element: <CardSelected/>},
    {path: "/decks",
      element: <DecksPage/>},
    {path: "/decks/:id",
      element: <DeckSelected/>},
    {path: "/deckbuilding",
      element: <Deckbuilding/>},
    {path: "/cardsDeck",
      element: <CardsDeckPage/>},
    {path: "/users",
       element: <UsersPage/>},
    {path: "/addDeck",
        element: <NewDeck/>}
    ]
  },


  {path:"/admin", 
    element : <LayoutAdmin/>,
    children: 
  [
    {path:"admin/", element : <HomePage/>},
    {path:"admin/addCard", element : <NewCard/>},
    {path:"admin/users", element : <UsersList/>}   
    ]
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