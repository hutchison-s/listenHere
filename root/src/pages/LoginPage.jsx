import './Login.css'
import {UserContext} from '../contexts/UserContext'
import { useContext, useEffect, useState } from 'react'

function LoginPage() {
    const [name, setName] = useState(null)
    const [pass, setPass] = useState(null)

    const {user, login, setUser} = useContext(UserContext)

    const onSubmit = (e)=>{
        e.preventDefault()
        login({name: name, pass: pass})
    }

    useEffect(()=>{
      if (!user.auth) {
        let user = null;
        try {
          if (localStorage["listenUser"]) {
            let item = localStorage.getItem("listenUser")
            user = JSON.parse(item)
            if (user) {
              console.log("autologin" , user)
              setUser(user)
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
    }, [])

  return (
    <>
      <article className='gridCenter' >
          
          <form id="loginForm" onSubmit={onSubmit}>
            <p>Log in to continue</p>
            <label htmlFor="newUsername" >Name: 
            <input type="text" name="newUserName" id="newUserName" onChange={(e)=>{
              setName(e.target.value)
            }}/>
            </label>
            <label htmlFor="newPassword" >Password: 
            <input type="password" name="newPassword" id="newPassword" onChange={(e)=>{
              setPass(e.target.value)
            }}/>
            </label>
            <button type='submit'>Log In</button>
          </form>
      </article>
    </>
  )
}

export default LoginPage