import {useMap} from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { LocationContext } from '../contexts/LocationContext'

const FindMe = () => {

    const map = useMap()
    const {location, dispatch} = useContext(LocationContext)
    const [isRecording, setIsRecording] = useState(false)

    const onClick = ()=>{
      const {lat, lng} = location;
        map.flyTo({lat, lng}, 18, {animate: true, duration: 1})
        setTimeout(()=>{
          dispatch({type: 'toggleTracking', payload: true})
          dispatch({type: 'setLocation', payload: null})
        }, 1000)
        
    }

    useEffect(()=>{
      if (!location.tracking && !document.querySelector(".open")) {
        setIsRecording(true)
      } else {
        setIsRecording(false)
      }
    }, [location.tracking])

  return (
    !isRecording
      ? null
      : <button id='findMe' onClick={onClick} >
          <span>Resume Tracking </span><FontAwesomeIcon icon={faLocationCrosshairs}/>
        </button>
  )
}

export default FindMe