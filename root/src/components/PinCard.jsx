import PropTypes from "prop-types";
import { getUser, getPin } from "../api/apiCalls";
import { base64toBlob, timestampToString } from "../utils/utilFuncions";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AudioPlayerContext } from "../contexts/AudioPlayerContext";
import AudioControlButton from './AudioControlButton'
import LikeComponent from "./LikeComponent";
import DeleteButton from './DeleteButton'

const PinCard = ({ pinId, isFeatured, setIsFeatured }) => {
    const {profile} = useContext(UserContext)
    const {audioRef, setSrcBlob} = useContext(AudioPlayerContext)
    const [likedBy, setLikedBy] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [pin, setPin] = useState(null)

    useEffect(()=> {
      getPin(pinId, (thisPin)=>{
          console.log('retrieved', thisPin.title)
          setPin(thisPin)
      })
    }, [profile])

    useEffect(()=>{
      if (pin) {
        if (isFeatured == pin._id) {
          loadThis()
          for (let id of pin.likedBy) {
            getUser(id, (doc => {
              setLikedBy([...likedBy, doc])
            }))
          }
        } else {
          setIsLoaded(false)
        }
      }

      return ()=>{
        setLikedBy([])
      }
      
    }, [pin, isFeatured])

    const loadThis = ()=>{
      audioRef.current.pause()
      const b = base64toBlob(pin.data)
      setSrcBlob(b);
      setIsLoaded(true)
      console.log("sent source")
  }
    const LoadLogo = ()=>{
        return (
            <img src="/earpin.png" alt="Listen Hear Icon" width='40px' onClick={()=>{
              setIsFeatured(pin._id)
              setIsExpanded(true)
            }}/>
        )
    }

  return (
    pin 
    ? <div className="pinCard">
      <div className="pinCardLeft">
        {isLoaded ? <AudioControlButton /> : <LoadLogo />}
      </div>
      <div className="pinCardMiddle" onClick={()=>{
          setIsExpanded((isExpanded)=>!isExpanded)
          if (isFeatured !== pin._id) {
            setIsFeatured(pin._id)
          } else {
            audioRef.current.pause()
            setIsFeatured(null)}
        }}>
        <h3>{pin.title}</h3>
        <p>
          <em>{pin.desc && pin.desc.substring(0, 25)+"..."}</em>
        </p>
      </div>
      <div className="pinCardRight">
        <LikeComponent pin={pin} profile={profile} />
        <DeleteButton pin={pin}/>
      </div>
      <div className="pinCardFooter">
        <p>
          <small>{timestampToString(pin.timestamp)}</small>
        </p>
      </div>
      {isExpanded && 
        <div className="details">
            <div className="tagsBox">Tags: {pin.tags.map((tag, idx) => <span key={idx+tag}>{tag}</span>)}</div>
            {likedBy.length > 0 && <div className="likedBy">
                Liked by: {likedBy.map((p, idx) => {
                return <span key={idx+p._id}>{p.displayName}</span>})
            }</div>}
            <div className="location">Location: <span>Lat: {pin.latlng.lat}<br/>Lng: {pin.latlng.lng}</span></div>
        </div>
      }
    </div>
    : <div className="pinCard">
      <div className="pinCarLeft"><p> </p></div>
      <div className="pinCardMiddle"><h3>...</h3></div>
      <div className="pinCardRight"><p> </p></div>
      <div className="pinCardFooter"><p><small>...</small></p></div>
    </div>
  );
};

PinCard.propTypes = {
  pinId: PropTypes.string,
  isFeatured: PropTypes.string,
  setIsFeatured: PropTypes.func
};

export default PinCard;
