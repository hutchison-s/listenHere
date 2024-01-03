import PropTypes from 'prop-types'
import { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

const YouAreHere = ({currentLocation}) => {

    const youIcon = new Icon({
        iconUrl: "/person-rays-solid.svg",
        iconSize: [30, 30]
      });

  return (
    <Marker 
        position={currentLocation || [40,-96]} 
        icon={youIcon}>
            <Popup><h2>You are here</h2></Popup>
    </Marker>
  )
}

YouAreHere.propTypes = {
    currentLocation: PropTypes.array
}

export default YouAreHere