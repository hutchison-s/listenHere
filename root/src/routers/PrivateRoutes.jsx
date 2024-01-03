import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Outlet } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export const PrivateRoutes = () => {
    const {user} = useContext(UserContext)
    console.log(user)
  return (
    user.auth ? <Outlet /> : <LoginPage/>
  )
}