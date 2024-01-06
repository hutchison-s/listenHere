import { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const YouAreHere = () => {
    const {location} = useContext(LocationContext)
    const youIcon = new Icon({
        iconUrl: "/person-rays-solid.svg",
        iconSize: [30, 30]
      });

  return (
    <Marker 
        position={location} 
        icon={youIcon}>
            <Popup><h2>You are here</h2></Popup>
    </Marker>
  )
}

export default YouAreHere