import PropTypes from 'prop-types'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { AudioPlayerContext } from '../contexts/AudioPlayerContext'
import { viewPin } from '../api/apiCalls'
import { UserContext } from '../contexts/UserContext'

const AudioControlButton = ({pin}) => {

    const {playAudio, pauseAudio, isPlaying} = useContext(AudioPlayerContext)
    const {profile, updateProfile} = useContext(UserContext)

    const onClick = (e)=>{
        e.preventDefault()
        if (isPlaying) {
          pauseAudio()
        } else {
          playAudio()
          if (pin) {
            viewPin(pin, profile, ({message})=>{
              console.log(message)
            })
            updateProfile()
          }
          
        } 
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