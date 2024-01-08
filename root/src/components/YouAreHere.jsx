import { youIcon } from '../assets/icons';
import { Marker, Popup } from 'react-leaflet';
import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';
import { timestampToString } from '../utils/utilFuncions';

const YouAreHere = () => {
    const {location} = useContext(LocationContext)

  return (
    <div className="rotationBox" style={{rotate: location.heading+'deg', maxWidth: '200px'}}>
      <Marker
          position={{lat: location.lat, lng: location.lng}}
          icon={youIcon}>
              <Popup>
                <strong>
                  <p style={{textAlign: 'center'}}>Lat: {location.lat}</p>
                  <p style={{textAlign: 'center'}}>Lng: {location.lng}</p>
                  <p style={{textAlign: 'center'}}>Heading: {location.heading}</p>
                  <p style={{textAlign: 'center'}}>Updated: {timestampToString(location.lastUpdated)}</p>
                </strong>
              </Popup>
      </Marker>
    </div>
  )
}

export default YouAreHere