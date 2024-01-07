import { youIcon } from '../assets/icons';
import { Marker, Popup } from 'react-leaflet';
import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const YouAreHere = () => {
    const {location} = useContext(LocationContext)

  return (
    <Marker 
        position={location} 
        icon={youIcon}>
            <Popup><h2>You are here</h2></Popup>
    </Marker>
  )
}

export default YouAreHere