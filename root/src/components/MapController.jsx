import {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useMapEvents } from 'react-leaflet'

const MapController = ({currentLocation}) => {
        const map = useMapEvents({
          loading: ()=>{
            document.querySelector(".leaflet-container").width = document.querySelector("article").offsetWidth;
            document.querySelector(".leaflet-container").height = document.querySelector("article").offsetHeight;
            console.log("resized map")
          },
          click: () =>{
            map.locate()
            console.log("clicked")
          },
          locationfound: (e) => {
            const {lat, lng} = e.latlng
            if (currentLocation) {
              let threshold = 0.00003
              let xMoved = Math.abs(Math.abs(currentLocation[0])-Math.abs(lat)) > threshold;
              let yMoved = Math.abs(Math.abs(currentLocation[1])-Math.abs(lng)) > threshold;
              if (xMoved || yMoved) {
                map.flyTo([lat, lng], map.getZoom(), {animate: true, duration: 1});
                console.log("flying");
              }
            } else {
                map.flyTo([lat, lng], map.getZoom(), {animate: true, duration: 1});
                console.log("flying");
            }
            
            
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