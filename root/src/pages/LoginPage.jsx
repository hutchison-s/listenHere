import './Login.css'
import {UserContext} from '../contexts/UserContext'
import { useContext, useEffect, useState, useRef } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence, setPersistence } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

function LoginPage() {

  const [email, setEmail] = useState(null)
  const [pass, setPass] = useState(null)
  const [user, setUser] = useState(null)
  const [rememberMe, setRememberMe] = useState(false)

  const {profile, getProfileFromUser} = useContext(UserContext)
  const dialogRef = useRef(null)

  useEffect(()=>{
    if (localStorage['firebase:authUser:AIzaSyBIFnE9a5XGHULxSfXgqdzvluNPSc-Wsic:[DEFAULT]']) {
      setUser(JSON.parse(localStorage['firebase:authUser:AIzaSyBIFnE9a5XGHULxSfXgqdzvluNPSc-Wsic:[DEFAULT]']))
    }
  }, [])

  useEffect(()=>{
    if (user) {
      getProfileFromUser(user)
    }
  }, [user])

  const logInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      const persistenceType = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      setUser(auth.currentUser)
      console.log(auth.currentUser)
    } catch (err) {
      console.error(err)
    }
  }

  const logIn = async (e)=>{
    e.preventDefault()
      try {
        await signInWithEmailAndPassword(auth, email, pass)
        const persistenceType = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
        await setPersistence(auth, persistenceType);
        setUser(auth.currentUser)
        console.log(auth.currentUser)
      } catch (err) {
        console.error(err)
      }
  }

  const newUser = async (displayName)=>{
    try {
      await createUserWithEmailAndPassword(auth, email, pass)
      const newUserObject = {
        displayName: displayName,
        email: auth.currentUser.email
      }
      const persistenceType = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      setUser(newUserObject)
      console.log(auth.currentUser)
    } catch (err) {
      console.error(err)
    }
  }

  function NewUserDialog() {
    return (
      <dialog id="newUserDialog" ref={dialogRef}>
        <form 
          onSubmit={(e)=>{
            e.preventDefault()
            newUser(e.target.newDisplayName.value)
            e.target.reset()
            dialogRef.current.close()
          }}
          onReset={()=>{
            dialogRef.current.close()
          }}>
          <p>Please enter a display name for your profile:</p>
          <input
            type="text"
            name="newDisplayName"
            id="newDisplayName"
            pattern="[a-zA-Z0-9\s]{1,20}"
            title="Only letters, numbers and spaces, maximum length 20 characters"
            placeholder='Display Name'
            required/>
          <button type='submit'>Submit</button>
          <button type="reset">Cancel</button>
        </form>
      </dialog>
    )
  }

  return (
    !profile.authorized 
    ? <article className="gridCenter">
         <form id="loginForm" onSubmit={logIn}>
           <p>Log in to continue</p>
           <button className="gsi-material-button" onClick={logInWithGoogle} type='button'>
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Sign in with Google</span>
              <span style={{display: "none"}}>Sign in with Google</span>
            </div>
          </button>
          <label htmlFor="remember">
              <input type="checkbox" name="remember" id="remember" onChange={(e)=>{setRememberMe(e.target.checked)}}/> 
              <span>Remember me</span>
            </label>
          <p>or...</p>
           <input type="email" name="newEmail" id="newEmail" placeholder='Email...' onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" name="newPassword" id="newPassword" placeholder='Password...' onChange={(e)=>{setPass(e.target.value)}}/>
              <button className="enter" type='submit'>Log In</button>
              <button className="new" type="button" onClick={()=>{dialogRef.current.showModal()}}>Create new account</button>
          </form>
          <NewUserDialog />
    </article>
    : <Navigate to='/' />
  )
}

export default LoginPage