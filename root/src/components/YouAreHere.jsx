import { youIcon } from '../assets/icons';
import { Marker, Popup } from 'react-leaflet';
import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const YouAreHere = () => {
    const {location, heading} = useContext(LocationContext)

  return (
    <div className="rotationBox" style={{rotate: heading+'deg', maxWidth: '200px'}}>
      <Marker
          position={location}
          icon={youIcon}>
              <Popup>
                <strong>
                  <p style={{textAlign: 'center'}}>Lat: {location.lat}</p>
                  <p style={{textAlign: 'center'}}>Lng: {location.lng}</p>
                  <p style={{textAlign: 'center'}}>Heading: {heading}</p>
                </strong>
              </Popup>
      </Marker>
    </div>
  )
}

export default YouAreHere