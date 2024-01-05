import './App.css'
import {Outlet, Route, Routes} from 'react-router-dom';
import MyMap from './pages/MyMap'
import MySounds from './pages/MySounds'
import Connections from './pages/Connections'
import Account from './pages/Account'
import Help from './pages/Help'
import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage'
import NavBar from './components/NavBar'
import { UserProvider } from './contexts/UserContext';
import Protected from './router/Protected';


function App() {


  function Layout() {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    )
  }

  return (
    <>
          <UserProvider>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route index element={
                    <Protected>
                      <MyMap />
                    </Protected>
                  }/>
                  <Route path="mysounds" element={
                    <Protected>
                      <MySounds />
                    </Protected>
                  }/>
                  <Route path="connections" element={
                    <Protected>
                      <Connections/>
                    </Protected>
                  }/>
                  <Route path="account" element={
                    <Protected>
                      <Account/>
                    </Protected>
                  }/>
                  <Route path="help" element={<Help/>} errorElement={<ErrorPage/>}/>,
                  <Route path="login" element={<LoginPage/>} errorElement={<ErrorPage/>}/>
                </Route>
              </Routes>
          </UserProvider> 
    </>
  )
}

export default App
