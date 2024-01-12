import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { AudioPlayerContext } from '../contexts/AudioPlayerContext'
import { viewPin } from '../api/apiCalls'
import { UserContext } from '../contexts/UserContext'

const AudioControlButton = ({pin}) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const {audioRef} = useContext(AudioPlayerContext)
    const {profile, updateProfile} = useContext(UserContext)

    audioRef.current.onended = ()=>{
        setIsPlaying(false)
      }
    audioRef.current.onpause = () =>{
        setIsPlaying(false)
    }
    const onClick = (e)=>{
      e.preventDefault()
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
        viewPin(pin, profile, ({message})=>{
          console.log(message)
        })
        updateProfile()
      } 
      setIsPlaying((isPlaying)=>!isPlaying)
    }
  return (
    <button 
      id="pausePlay" 
      onClick={onClick}
      className={isPlaying ? 'playing' : ''}>
        {isPlaying ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
    </button>
  )
}

AudioControlButton.propTypes = {
  pin: PropTypes.object
}

export default AudioControlButton