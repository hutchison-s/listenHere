import './App.css'
import NavBar from "./components/NavBar"
import {RouterProvider} from 'react-router-dom';
import appRouter from './routers/AppRouter';




function App() {
  const router = appRouter
  

  return (
    <>
      <NavBar/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
