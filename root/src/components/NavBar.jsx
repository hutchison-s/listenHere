import './NavBar.css'
import { useContext, useState } from 'react'
import {UserContext} from '../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  const {user, logout} = useContext(UserContext)
  const [isExpanded, setIsExpanded] = useState(false)

  function handleToggle() {
    setIsExpanded(!isExpanded)
  }

  return (
    <header>
      <nav id='navbar'>
        <div className="leftNav">
          
            <a href="/">
              <img src="/earpin.png" alt="Location pin with ear symbol" />
            </a>
            <a href="/">
              <h1>ListenHere</h1>
            </a>
        </div>
        <div className="rightNav">
          {user.auth 
            ? <a href="/account" id='helloUser'>
                  <FontAwesomeIcon icon={faUser}/>
                  <small>{user.name}</small>
              </a>
            : null}
          <button id="menuToggle" onClick={handleToggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div id="hiddenMenu" className={isExpanded ? "expanded" : ""}>
          <ul>
            {user.auth 
              ? <>
                <a href="/mysounds">
                  <li>My Sounds</li>
                </a>
                <a href="/">
                  <li>Map</li>
                </a>
                <a href="/connections">
                  <li>Connections</li>
                </a>
                <a href="/account">
                  <li>Account</li>
                </a>
                  <li onClick={(e)=>{
                    e.preventDefault()
                    logout()
                    setIsExpanded(false)
                  }}>Log Out</li>
                  </>
                : <a href='/'><li onClick={()=>{setIsExpanded(false)}}>Log In</li></a>
                }
            <a href="/help">
              <li><FontAwesomeIcon icon={faCircleQuestion} /></li>
            </a>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default NavBar