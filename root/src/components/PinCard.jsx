import PropTypes from "prop-types";
import { getUser, getPin } from "../api/apiCalls";
import { base64toBlob, timestampToString } from "../utils/utilFuncions";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AudioPlayerContext } from "../contexts/AudioPlayerContext";
import AudioControlButton from './AudioControlButton'
import LikeComponent from "./LikeComponent";
import DeleteButton from './DeleteButton'
import { Link } from "react-router-dom";
import { LocationContext } from "../contexts/LocationContext";

const PinCard = ({ pinId, isFeatured, setIsFeatured }) => {
    const {profile} = useContext(UserContext)
    const {dispatch} = useContext(LocationContext)
    const {audioRef, setSrcBlob} = useContext(AudioPlayerContext)
    const [likedBy, setLikedBy] = useState([])
    const [isSoundSet, setIsSoundSet] = useState(false)
    const [pin, setPin] = useState(null)

    useEffect(()=> {
      getPin(pinId, (thisPin)=>{
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
          setIsSoundSet(false)
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
      setIsSoundSet(true)
      console.log("sent source")
  }

  const findThis = () => {
      dispatch({type: 'setActivePinLocation', payload: pin.latlng})
  }

    const LoadLogo = ()=>{
        return (
            <img src="/earpin.png" alt="Listen Hear Icon" width='40px' onClick={()=>{
              setIsFeatured(pin._id)
            }}/>
        )
    }

  return (
    pin 
    ? <div className="pinCard">
      <div className="pinCardLeft">
        {isSoundSet && (profile.viewed.includes(pin._id) || profile.pins.includes(pin._id)) ? <AudioControlButton /> : <LoadLogo />}
      </div>
      <div className="pinCardMiddle" onClick={()=>{
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
        {profile._id == pin.creator.id ? <DeleteButton pin={pin}/> : null}
      </div>
      <div className="pinCardFooter">
          <small>{timestampToString(pin.timestamp)}</small>
          <small>{pin.viewedBy.length} view{pin.viewedBy.length != 1 ? 's' : ''}</small>
      </div>
      {isFeatured == pin._id && 
        <div className="details">
            {pin.creator.id != profile._id && <div className="creatorBox">Creator: <Link to={`/users/${pin.creator.id}`}>{pin.creator.displayName}</Link></div>}
            {pin.tags.length > 0 && <div className="tagsBox">Tags: {pin.tags.map((tag, idx) => <span key={idx+tag}>{tag}</span>)}</div>}
            {likedBy.length > 0 && <div className="likedBy">
                Liked by: {likedBy.map((p, idx) => {
                return <Link to={`/users/${p._id}`} key={idx+p._id}>{p.displayName}</Link>})
            }</div>}
            <div className="location">Location: <Link  to='/' onClick={findThis}>Lat: {pin.latlng.lat}<br/>Lng: {pin.latlng.lng}</Link></div>
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
