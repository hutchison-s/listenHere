import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MyMap from '../pages/MyMap'
import MySounds from '../pages/MySounds'
import Connections from '../pages/Connections'
import Account from '../pages/Account'
import Help from '../pages/Help'
import LoginPage from '../pages/LoginPage'
import ErrorPage from '../pages/ErrorPage'
import { PrivateRoutes } from './PrivateRoutes'

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" errorElement={<ErrorPage />} element={<PrivateRoutes/>}>
        <Route path="/" element={<MyMap />}/>
        <Route path="mysounds" element={<MySounds />}/>
        <Route path="connections" element={<Connections/>}/>
        <Route path="account" element={<Account/>}/>
    </Route>
    <Route path="help" element={<Help/>} errorElement={<ErrorPage/>}/>,
    <Route path="login" element={<LoginPage/>} errorElement={<ErrorPage/>}/>
    </>
  )
)

export default appRouter