import { useContext, useEffect, useState } from 'react'
import { getAllPins } from '../api/apiCalls'
import EarPinMarker from './EarPinMarker'
import { UserContext } from '../contexts/UserContext'

const MapPins = () => {
    const {profile} = useContext(UserContext)
    const [pins, setPins] = useState([])
    useEffect(()=>{
        getAllPins((docs)=>{setPins(docs)})
    }, [profile])

  return (
    <>
        {pins.map(pin => <EarPinMarker key={pin._id} pin={pin}/>)}
    </>
  )
}

export default MapPins