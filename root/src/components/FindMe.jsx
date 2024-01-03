import {useMap} from 'react-leaflet'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'

const FindMe = ({currentLocation}) => {
    const map = useMap()
    const onClick = ()=>{
        map.panTo(currentLocation,{animate: true, duration: 0.5})
    }
    const style = {
        zIndex: "1000",
        position: "absolute",
        top: '10px',
        right: '10px',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        fontSize: "22px",
        fontWeight: '200',
        textAlign: 'center',
        aspectRatio: '1',
        textDecoration: 'none'
    }
  return (
    <button id='findMe' onClick={onClick} style={style}><FontAwesomeIcon icon={faLocationCrosshairs}/></button>
  )
}

export default FindMe

FindMe.propTypes = {
    currentLocation: PropTypes.array
}