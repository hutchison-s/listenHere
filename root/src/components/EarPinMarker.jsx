import PropTypes from 'prop-types'
import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import AudioControlButton from './AudioControlButton'
import { useContext, useEffect, useState } from 'react'
import {UserContext} from '../contexts/UserContext'
import {AudioPlayerContext} from '../contexts/AudioPlayerContext'
import axios from 'axios'

const earIcon = new Icon({
  iconUrl: "/earpin.png",
  iconSize: [50, 50]
});

function EarPinMarker({pin}) {

    const {profile} = useContext(UserContext)
    const {audioRef, setSrcBlob} = useContext(AudioPlayerContext)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(()=> {
      if (profile.liked.includes(pin._id)) {
        setIsLiked(true)
      }
    }, [])

    const likePin = ()=>{
      if (isLiked) {
        axios.put('https://listen-here-api.onrender.com/pins/'+pin._id+"/unlike", {userId: profile._id})
          .then(res => {
            console.log(res.data)
            setIsLiked(false)
          }).catch(err => {
            console.log("Error unliking pin:", err)
          })
      } else {
        axios.post('https://listen-here-api.onrender.com/pins/'+pin._id+"/like", {userId: profile._id})
          .then(res => {
            console.log(res.data)
            setIsLiked(true)
          }).catch(err => {
            console.log("Error liking pin:", err)
          })
      }
      
    }
    
    const base64toBlob = (base64Data) => {
      const base64EncodedString = base64Data.split(';base64,')[1];
      const binaryData = atob(base64EncodedString);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const blobData = new Blob([arrayBuffer], { type: 'audio/mpeg3' });

      return blobData
    }
    
    return (
      <Marker 
        position={pin.latlng} 
        icon={earIcon} 
        eventHandlers={{
          popupopen: ()=>{
            const b = base64toBlob(pin.data)
            setSrcBlob(b);
            console.log("sent source")
          },
          popupclose: ()=>{audioRef.current.pause()}
        }}
      >
        <Popup>
          <div>
            <div className='popupHeader'>
              <div>
                <h2>{pin.title}</h2>
                <h3><em>{pin.creator.displayName}</em></h3>
              </div>
              <AudioControlButton />
            </div>
              <p>{pin.desc}</p>
            <div className='popupFooter'>
              <p><small>{pin.timestamp}</small></p>
              <div className={isLiked ? "likes liked" : "likes"}>
                <FontAwesomeIcon icon={faHeart} onClick={()=>{likePin}}/>
                <span>{pin.likedBy.length}</span>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    )
  }
  EarPinMarker.propTypes = {
    pin: PropTypes.object,
    audioRef: PropTypes.object,
    setSrc: PropTypes.func
  }

export default EarPinMarker