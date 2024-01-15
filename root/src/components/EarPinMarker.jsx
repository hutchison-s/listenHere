import PropTypes from 'prop-types'
import { Marker, Popup } from 'react-leaflet'
import { earIcon, viewedIcon, myIcon } from '../assets/icons'
import {Link} from 'react-router-dom'
import AudioControlButton from './AudioControlButton'
import { useContext, useEffect, useState } from 'react'
import {UserContext} from '../contexts/UserContext'
import {AudioPlayerContext} from '../contexts/AudioPlayerContext'
import {LocationContext} from '../contexts/LocationContext'
import { base64toBlob, timestampToString } from '../utils/utilFuncions'
import LikeComponent from './LikeComponent'

function EarPinMarker({pin}) {

    const {profile} = useContext(UserContext)
    const {audioRef, setSrcBlob} = useContext(AudioPlayerContext)
    const {location} = useContext(LocationContext)
    const [isClose, setIsClose] = useState(false)


    useEffect(()=>{
        setIsClose(proximity(location, pin.latlng))
    }, [location])

    const proximity = (loc, pinLoc) => {
        let x = Math.abs(loc.lat - pinLoc.lat)
        let y = Math.abs(loc.lng - pinLoc.lng)
        let h = Math.sqrt((x ** 2) + (y ** 2))
        return h < 0.00075
    }
    
    return (
      isClose ? <Marker 
        position={pin.latlng} 
        icon={profile.pins.includes(pin._id) ? myIcon : profile.viewed.includes(pin._id) ? viewedIcon : earIcon}
        opacity={1}
        eventHandlers={{
          popupopen: ()=>{
            const b = base64toBlob(pin.data)
            setSrcBlob(b);
            console.log("sent source")
          },
          popupclose: ()=>{
            audioRef && audioRef.current.pause()
          }
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
                {pin.viewLimit.isLimited ? <p className='viewsRemaining'>{pin.viewLimit.limit} views remaining</p> : null}
              </div>
              <AudioControlButton pin={pin}/>
            </div>
              <p>{pin.desc}</p>
            <div className='popupFooter'>
              <p><small>{timestampToString(pin.timestamp)}</small></p>
              <LikeComponent pin={pin} profile={profile} />
            </div>
          </div>
        </Popup>
      </Marker>
      : <Marker position={pin.latlng} icon={earIcon} opacity={0.4}>
          <Popup>
          <div className='faded'>
            <div className='popupHeader'>
              <div>
                <h2>{pin.title}</h2>
                <Link to={profile._id == pin.creator.id ? '/account' : `/users/${pin.creator.id}`}>
                  <h3><em>{pin.creator.displayName}</em></h3>
                </Link>
                {pin.viewLimit.isLimited ? <p className='viewsRemaining'>{pin.viewLimit.limit} views remaining</p> : null}
              </div>
            </div>
              <p>{pin.desc}</p>
            <div className='popupFooter'>
              <p><small>{timestampToString(pin.timestamp)}</small></p>
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