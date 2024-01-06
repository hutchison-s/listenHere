import { useEffect, useState } from 'react'
import axios from 'axios'
import EarPinMarker from './EarPinMarker'

const MapPins = () => {

    const [pins, setPins] = useState([])
    useEffect(()=>{
        axios.get('https://listen-here-api.onrender.com/pins')
            .then(res => {
                setPins(res.data)
            }).catch(err => {
                console.log("Error retrieving pins from API:", err)
            })
    }, [])

  return (
    <>
        {pins.map(pin => <EarPinMarker key={pin._id} pin={pin}/>)}
    </>
  )
}

export default MapPins