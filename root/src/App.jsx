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
import Profile from './pages/Profile';
import { UserProvider } from './contexts/UserContext';
import Protected from './router/Protected';
import AwaitLocation from './router/AwaitLocation';
import { LocationProvider } from './contexts/LocationContext';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import ResetPassword from './pages/ResetPassword';
import Sandbox from './pages/Sandbox';


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
            <LocationProvider>
              <AudioPlayerProvider>
                <Routes>
                  <Route path='/' element={<Layout />}>
                    
                      <Route index element={
                        <Protected>
                          
                            <AwaitLocation>
                              <MyMap />
                            </AwaitLocation>
                          
                        </Protected>
                      }/>
                      <Route path="mysounds" element={
                        <Protected>
                          <AudioPlayerProvider>
                            <MySounds />
                          </AudioPlayerProvider>
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
                    <Route path="resetpassword" element={<ResetPassword/>} errorElement={<ErrorPage/>}/>
                    <Route path="sandbox" element={<Sandbox/>} errorElement={<ErrorPage/>}/>
                    <Route path='users'>
                      <Route path=':userId' element={<Profile />} errorElement={<ErrorPage />}/>
                    </Route>
                  </Route>
                </Routes>
              </AudioPlayerProvider>
            </LocationProvider>
          </UserProvider> 
    </>
  )
}

export default App
