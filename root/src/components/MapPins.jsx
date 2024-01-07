import { useEffect, useState } from 'react'
import { getAllPins } from '../api/apiCalls'
import EarPinMarker from './EarPinMarker'

const MapPins = () => {

    const [pins, setPins] = useState([])
    useEffect(()=>{
        getAllPins((docs)=>{setPins(docs)})
    }, [])

  return (
    <>
        {pins.map(pin => <EarPinMarker key={pin._id} pin={pin}/>)}
    </>
  )
}

export default MapPins