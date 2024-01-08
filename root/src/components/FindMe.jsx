import {useMap} from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { LocationContext } from '../contexts/LocationContext'

const FindMe = () => {

    const map = useMap()
    const {location} = useContext(LocationContext)

    const onClick = ()=>{
      const {lat, lng} = location;
        map.flyTo({lat, lng}, 18, {animate: true})
    }
  return (
    <button id='findMe' onClick={onClick} >
      <FontAwesomeIcon icon={faLocationCrosshairs}/>
    </button>
  )
}

export default FindMe