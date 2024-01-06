import {useMap} from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { LocationContext } from '../contexts/LocationContext'

const FindMe = () => {

    const map = useMap()
    const {location} = useContext(LocationContext)

    const onClick = ()=>{
        map.flyTo(location, 18, {animate: true})
    }

    const style = {
        zIndex: "1000",
        position: "absolute",
        top: '10px',
        right: '10px',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        fontSize: "22px",
        fontWeight: '200',
        textAlign: 'center',
        aspectRatio: '1',
        textDecoration: 'none'
    }
  return (
    <button id='findMe' onClick={onClick} style={style}>
      <FontAwesomeIcon icon={faLocationCrosshairs}/>
    </button>
  )
}

export default FindMe