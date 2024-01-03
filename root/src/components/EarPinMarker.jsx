import PropTypes from 'prop-types'
import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import AudioControlButton from './AudioControlButton'

function EarPinMarker({pin, likeFunc, audioRef, setSrc}) {

    const earPin = new Icon({
        iconUrl: "/earpin.png",
        iconSize: [50, 50]
      });
    return (
      <Marker 
        position={[pin.lat, pin.lng]} 
        icon={earPin} 
        eventHandlers={{
          popupopen: ()=>{setSrc(pin.blob); console.log("sent source")},
          popupclose: ()=>{audioRef.current.pause();}
        }}
      >
        <Popup>
          <div>
            <div className='popupHeader'>
              <div>
                <h2>{pin.title}</h2>
                <h3><em>{pin.user}</em></h3>
              </div>
              <AudioControlButton audioRef={audioRef}/>
            </div>
              <p>{pin.desc}</p>
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
    likeFunc: PropTypes.func,
    audioRef: PropTypes.object,
    setSrc: PropTypes.func
  }

export default EarPinMarker