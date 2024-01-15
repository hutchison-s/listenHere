import './NavBar.css'
import { useContext, useState } from 'react'
import {UserContext} from '../contexts/UserContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { auth } from '../config/firebase'
import { signOut } from '@firebase/auth'

function NavBar() {
  const {profile, setProfile} = useContext(UserContext)
  const [isExpanded, setIsExpanded] = useState(false)

  function handleToggle() {
    setIsExpanded(!isExpanded)
  }

  const logOut = async ()=> {
    try {
      await signOut(auth)
      setProfile({authorized: false})
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header>
      <nav id='navbar'>
        <div className="leftNav">
          
            <Link to="/" onClick={()=>{setIsExpanded(false)}}>
              <img src="/earpin.png" alt="Location pin with ear symbol" />
            </Link>
            <Link to="/" onClick={()=>{setIsExpanded(false)}}>
              <h1>ListenHere</h1>
            </Link>
        </div>
        <div className="rightNav">
          {profile.authorized 
            ? <Link to={`/users/${profile._id}`} id='helloUser' onClick={()=>{setIsExpanded(false)}}>
                  {profile.photo ? <img src={profile.photo} alt='profile photo'/> : <FontAwesomeIcon icon={faUser}/>}
              </Link>
            : null}
          <button id="menuToggle" onClick={handleToggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div id="hiddenMenu" className={isExpanded ? "expanded" : ""}>
          <ul>
                {profile.authorized 
                  ? <>
                  <Link to="/" onClick={()=>{setIsExpanded(false)}}>
                    <li>Map</li>
                  </Link>
                  <Link to={`/users/${profile._id}/sounds`} onClick={()=>{setIsExpanded(false)}}>
                    <li>My Sounds</li>
                  </Link>
                  <Link to="/connections" onClick={()=>{setIsExpanded(false)}}>
                    <li>Connections</li>
                  </Link>
                  <Link to={`/users/${profile._id}`} onClick={()=>{setIsExpanded(false)}}>
                    <li>Account</li>
                  </Link>
                      <li onClick={(e)=>{
                        e.preventDefault()
                        logOut()
                        setIsExpanded(false)
                        window.location.href = "/"
                      }}>Log Out</li>
                  </>
                  : <Link to='/' onClick={()=>{setIsExpanded(false)}}><li>Log In</li></Link>}
            <Link to="/help" onClick={()=>{setIsExpanded(false)}}>
              <li><FontAwesomeIcon icon={faCircleQuestion} /></li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default NavBar