import './NavBar.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

function NavBarNoAuth() {
  const [isExpanded, setIsExpanded] = useState(false)

  function handleToggle() {
    setIsExpanded(!isExpanded)
  }

  return (
    <header>
      <nav id='navbar'>
        <div className="leftNav">
          <img src="/earpin.png" alt="Location pin with ear symbol" />
          <h1>ListenHere</h1>
        </div>
        <div className="rightNav">
          <button id="menuToggle" onClick={handleToggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div id="hiddenMenu" className={isExpanded ? "expanded" : ""}>
          <ul>
            <a href="/">
              <li>Log In</li>
            </a> 
            <a href="/help">
              <li><FontAwesomeIcon icon={faCircleQuestion} /></li>
            </a>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default NavBarNoAuth