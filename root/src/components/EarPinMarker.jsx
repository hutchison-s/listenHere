import PropTypes from 'prop-types'
import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function EarPinMarker({pin, likeFunc}) {

    const earPin = new Icon({
        iconUrl: "/earpin.png",
        iconSize: [50, 50]
      });

    return (
      <Marker 
        position={[pin.lat, pin.lng]} 
        icon={earPin} 
        onClick={(e)=>{e.originalEvent.preventDefault()}}
      >
        <Popup>
          <div>
            <h2>{pin.title}</h2>
            <div>
              <h3><em>{pin.user}</em></h3>
              <p>{pin.desc}</p>
            </div>
            <audio src={window.URL.createObjectURL(pin.blob)} controls preload="auto"></audio>
            <div className='popupFooter'>
              <p><small>{pin.timestamp}</small></p>
              <div className={pin.likes > 0 ? "likes liked" : "likes"}>
                <FontAwesomeIcon icon={faHeart} onClick={()=>{likeFunc(pin.id)}}/>
                <span>{pin.likes}</span>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    )
  }
  EarPinMarker.propTypes = {
    pin: PropTypes.object,
    likeFunc: PropTypes.func
  }

export default EarPinMarker