import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AudioPlayerContext } from "../contexts/AudioPlayerContext";
import AudioControlButton from './AudioControlButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const PinCard = ({ pin, isFeatured, setIsFeatured }) => {
    const {profile} = useContext(UserContext)
    const {audioRef, setSrcBlob} = useContext(AudioPlayerContext)
    const [isLiked, setIsLiked] = useState(false)
    const [likedBy, setLikedBy] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(()=> {
      if (profile.liked.includes(pin._id)) {
        setIsLiked(true)
      }
      for (let id of pin.likedBy) {
        axios.get('https://listen-here-api.onrender.com/users/'+id)
            .then(res => {
                setLikedBy([...likedBy, res.data])
            }).catch(err =>{
                console.log(err)
            })
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

    const LoadLogo = ()=>{
        return (
            <img src="/earpin.png" alt="Listen Hear Icon" width='40px' onClick={()=>{
                audioRef.current.pause()
                const b = base64toBlob(pin.data)
                setSrcBlob(b);
                setIsLoaded(true)
                console.log("sent source")
            }}/>
        )
    }

  return (
    <div className="pinCard" onClick={()=>{
            if (isFeatured !== pin._id) {
                setIsFeatured(pin._id)
            }
        }}>
      <div className="pinCardLeft">
        {isLoaded && isFeatured == pin._id ? <AudioControlButton /> : <LoadLogo />}
      </div>
      <div className="pinCardMiddle" onClick={()=>{setIsExpanded((isExpanded)=>!isExpanded)}}>
        <h3>{pin.title}</h3>
        <p>
          <em>{pin.desc && pin.desc.substring(0, 25)+"..."}</em>
        </p>
      </div>
      <div className="pinCardRight">
        <div className={isLiked ? "likes liked" : "likes"}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => {
              likePin;
            }}
          />
          <span>{pin.likedBy.length}</span>
        </div>
        <p>{pin.desc}</p>
      </div>
      <div className="pinCardFooter">
        <p>
          <small>{pin.timestamp}</small>
        </p>
      </div>
      {isExpanded && 
        <div className="details">
            <div className="tagsBox">Tags: {pin.tags.map((tag, idx) => <span key={idx+tag}>{tag}</span>)}</div>
            <div className="likedBy">
                Liked by: {likedBy.map((p, idx) => {
                return <span key={idx+p._id}>{p.displayName}</span>})
            }</div>
            <div className="location">Location: <span>Lat: {pin.latlng.lat}<br/>Lng: {pin.latlng.lng}</span></div>
        </div>
      }
    </div>
  );
};

PinCard.propTypes = {
  pin: PropTypes.object,
  isFeatured: PropTypes.string,
  setIsFeatured: PropTypes.func
};

export default PinCard;
