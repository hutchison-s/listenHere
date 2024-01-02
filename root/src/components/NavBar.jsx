import './NavBar.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

function NavBar() {

  const [isExpanded, setIsExpanded] = useState(false)

  function handleToggle() {
    setIsExpanded(!isExpanded)
  }

  return (
    <header>
      <nav id='navbar'>
        <div className="logo">
          <img src="/earpin.png" alt="Location pin with ear symbol" />
          <h1>Listen&nbsp;Here</h1>
        </div>
        <button id="menuToggle" onClick={handleToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div id="hiddenMenu" className={isExpanded ? "expanded" : ""}>
          <ul>
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