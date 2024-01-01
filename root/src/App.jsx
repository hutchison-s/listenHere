import './App.css'
import NavBar from "./components/NavBar"
import MyMap from './components/MyMap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

function App() {

  

  return (
    <>
      <NavBar/>
      <MyMap/>
      <button id="dropNew"><FontAwesomeIcon icon={faMicrophone}/></button>
    </>
  )
}

export default App
