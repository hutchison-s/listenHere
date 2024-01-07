import PropTypes from 'prop-types'
import { Marker, Popup } from 'react-leaflet'
import { earIcon } from '../assets/icons'
import {Link} from 'react-router-dom'
import AudioControlButton from './AudioControlButton'
import { useContext, useEffect, useState } from 'react'
import {UserContext} from '../contexts/UserContext'
import {AudioPlayerContext} from '../contexts/AudioPlayerContext'
import { base64toBlob, timestampToString } from '../utils/utilFuncions'
import LikeComponent from './LikeComponent'
import { viewPin } from '../api/apiCalls'

function EarPinMarker({pin}) {

    const {profile, updateProfile} = useContext(UserContext)
    const {audioRef, setSrcBlob} = useContext(AudioPlayerContext)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(()=> {
      if (profile.liked.includes(pin._id)) {
        setIsLiked(true)
      }
    }, [profile])
    
    return (
      <Marker 
        position={pin.latlng} 
        icon={earIcon} 
        eventHandlers={{
          popupopen: ()=>{
            const b = base64toBlob(pin.data)
            setSrcBlob(b);
            console.log("sent source")
            viewPin(pin, profile, ({message})=>{
              console.log(message)
            })
            updateProfile()
          },
          popupclose: ()=>{audioRef && audioRef.current.pause()}
        }}
      >
        <Popup>
          <div>
            <div className='popupHeader'>
              <div>
                <h2>{pin.title}</h2>
                <Link to={profile._id == pin.creator.id ? '/account' : `/users/${pin.creator.id}`}>
                  <h3><em>{pin.creator.displayName}</em></h3>
                </Link>
              </div>
              <AudioControlButton />
            </div>
              <p>{pin.desc}</p>
            <div className='popupFooter'>
              <p><small>{timestampToString(pin.timestamp)}</small></p>
              <LikeComponent pin={pin} profile={profile} isLiked={isLiked} setIsLiked={setIsLiked} />
            </div>
          </div>
        </Popup>
      </Marker>
    )
  }
  EarPinMarker.propTypes = {
    pin: PropTypes.object
  }

export default EarPinMarker