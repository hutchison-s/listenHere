import './App.css'
import NavBar from "./components/NavBar"
import Account from './pages/Account';
import Connections from './pages/Connections';
import ErrorPage from './pages/ErrorPage';
import Help from './pages/Help';
import MyMap from './pages/MyMap'
import MySounds from './pages/MySounds';
import LoginPage from './pages/LoginPage';
import { UserContext } from './contexts/UserContext'
import {useContext} from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import NavBarNoAuth from './components/NavBarNoAuth';


function App() {

  const { user } = useContext(UserContext)

  const router = createBrowserRouter([
    {
      path: "/",
      element: user.auth ? <MyMap /> : <LoginPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "mysounds",
      element: user.auth ? <MySounds /> : <LoginPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "connections",
      element: user.auth ? <Connections /> : <LoginPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "account",
      element: user.auth ? <Account /> : <LoginPage/>,
      errorElement: <ErrorPage />
    },
    {
      path: "help",
      element: <Help />,
      errorElement: <ErrorPage />
    },
  ]
  );

  return (
    <>
      {user.auth ? <NavBar/> : <NavBarNoAuth />}
      <RouterProvider router={router} />

    </>
  )
}

export default App
