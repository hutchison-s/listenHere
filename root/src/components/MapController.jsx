import {useContext, useEffect} from 'react'
import { useMap } from 'react-leaflet'
import { LocationContext } from '../contexts/LocationContext'

const MapController = () => {
    const {location} = useContext(LocationContext)
    const map = useMap()

    // useEffect(()=>{
    //   console.log("Panning map to current location")
    //   map.locate({setView: true, enableHighAccuracy: true})
    // }, [])

    useEffect(()=>{
      const {lat, lng} = location
      console.log("Panning map to current location")
      map.panTo({lat, lng}, {duration: 0.5, animate: true})
    }, [location])

        return null;
}

export default MapController