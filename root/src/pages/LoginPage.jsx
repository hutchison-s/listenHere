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
      <section className='gridCenter' >
          
          <form style={{display: "grid", gap: "1rem"}} onSubmit={onSubmit}>
            <p>Log in to continue</p>
            <label htmlFor="newUsername" style={{display: "grid", gap: "1rem", gridTemplateColumns: "3fr 7fr"}}>Name: 
            <input type="text" name="newUserName" id="newUserName" onChange={(e)=>{
              setName(e.target.value)
            }}/>
            </label>
            <label htmlFor="newPassword" style={{display: "grid", gap: "1rem", gridTemplateColumns: "3fr 7fr"}}>Password: 
            <input type="password" name="newPassword" id="newPassword" onChange={(e)=>{
              setPass(e.target.value)
            }}/>
            </label>
            <button type='submit'>Log In</button>
          </form>
      </section>
    </>
  )
}

export default LoginPage