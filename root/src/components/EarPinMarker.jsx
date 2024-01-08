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
import { viewPin, getPin } from '../api/apiCalls'

function EarPinMarker({pin}) {

    const {profile, updateProfile} = useContext(UserContext)
    const {audioRef, setSrcBlob} = useContext(AudioPlayerContext)
    const [thisPin, setThisPin] = useState(null)

    useEffect(()=> {
      getPin(pin._id, (doc)=>{
          console.log('retrieved', doc)
          setThisPin(doc)
      })
    }, [profile])
    
    return (
      thisPin ? <Marker 
        position={thisPin.latlng} 
        icon={earIcon} 
        eventHandlers={{
          popupopen: ()=>{
            const b = base64toBlob(thisPin.data)
            setSrcBlob(b);
            console.log("sent source")
            viewPin(thisPin, profile, ({message})=>{
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
                <h2>{thisPin.title}</h2>
                <Link to={profile._id == thisPin.creator.id ? '/account' : `/users/${thisPin.creator.id}`}>
                  <h3><em>{thisPin.creator.displayName}</em></h3>
                </Link>
              </div>
              <AudioControlButton />
            </div>
              <p>{thisPin.desc}</p>
            <div className='popupFooter'>
              <p><small>{timestampToString(thisPin.timestamp)}</small></p>
              <LikeComponent pin={thisPin} profile={profile} />
            </div>
          </div>
        </Popup>
      </Marker> : null
    )
  }
  EarPinMarker.propTypes = {
    pin: PropTypes.object
  }

export default EarPinMarker