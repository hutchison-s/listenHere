import {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useMapEvents } from 'react-leaflet'

const MapController = ({currentLocation}) => {
        const map = useMapEvents({
          load: ()=>{
            map.locate()
            map.flyTo([51, -2], 13, {animate: true})
            console.log("loaded")
          },
          click: () =>{
            map.locate()
            console.log("clicked")
          },
          locationfound: (e) => {
            const {lat, lng} = e.latlng
            map.flyTo([lat, lng], map.getZoom(), {animate: true, duration: 1})
            console.log("flying")
          },
          locationerror: (err) => {
            console.log(err.message)
          }
        })
        useEffect(()=>{
            if (map) {
              map.locate()
              console.log("locating")
            }
        }, [map, currentLocation])
        return null;
}

MapController.propTypes = {
    currentLocation: PropTypes.array
}

export default MapController