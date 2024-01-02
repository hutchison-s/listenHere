import './App.css'
import NavBar from "./components/NavBar"
import Account from './pages/Account';
import Connections from './pages/Connections';
import ErrorPage from './pages/ErrorPage';
import Help from './pages/Help';
import MyMap from './pages/MyMap'
import MySounds from './pages/MySounds';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MyMap />,
      errorElement: <ErrorPage />
    },
    {
      path: "mysounds",
      element: <MySounds />,
      errorElement: <ErrorPage />
    },
    {
      path: "connections",
      element: <Connections />,
      errorElement: <ErrorPage />
    },
    {
      path: "account",
      element: <Account />,
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
      <NavBar/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
