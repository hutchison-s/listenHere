import './App.css'
import {Outlet, Route, Routes} from 'react-router-dom';
import MyMap from './pages/MyMap'
import Connections from './pages/Connections'
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
import ProfileSounds from './pages/ProfileSounds';


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
                    <Route path="connections" element={
                      <Protected>
                        <Connections/>
                      </Protected>
                    }/>
                    <Route path='users'>
                        <Route path=':userId'>
                          <Route index element={<Protected><Profile /></Protected>} errorElement={<ErrorPage />}/>
                          <Route path='sounds' element={<Protected><ProfileSounds /></Protected>} errorElement={<ErrorPage />}/>
                        </Route>
                    </Route>
                    <Route path="help" element={<Help/>} errorElement={<ErrorPage/>}/>,
                    <Route path="login" element={<LoginPage/>} errorElement={<ErrorPage/>}/>
                    <Route path="resetpassword" element={<ResetPassword/>} errorElement={<ErrorPage/>}/>
                    <Route path="sandbox" element={<Sandbox/>} errorElement={<ErrorPage/>}/>
                  </Route>
                </Routes>
              </AudioPlayerProvider>
            </LocationProvider>
          </UserProvider> 
    </>
  )
}

export default App
