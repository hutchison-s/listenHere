import {useContext, useEffect} from 'react'
import { useMap, useMapEvent } from 'react-leaflet'
import { LocationContext } from '../contexts/LocationContext'

const MapController = () => {
    const {location, dispatch} = useContext(LocationContext)
    const map = useMap()

    useMapEvent('drag', ()=>{
      if (location.tracking) {
        dispatch({type: 'toggleTracking', payload: false})
      }

    })

    useEffect(()=>{
      const {lat, lng} = location
      console.log("Panning map to current location")
      map.panTo({lat, lng}, {duration: 2, animate: true})
    }, [location.latlng])

    useEffect(()=>{
      if (location.activePinLoc) {
        console.log("Found pin on map")
        map.panTo(location.activePinLoc)
        dispatch({type: 'toggleTracking', payload: false})
      }
      
    }, [location.activePinLoc])

        return null;
}

export default MapController