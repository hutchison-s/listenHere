import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { AudioPlayerContext } from '../contexts/AudioPlayerContext'

const AudioControlButton = () => {

    const [isPlaying, setIsPlaying] = useState(false)
    const {audioRef} = useContext(AudioPlayerContext)

    audioRef.current.onended = ()=>{
        setIsPlaying(false)
      }
    audioRef.current.onpause = () =>{
        setIsPlaying(false)
    }
    const onClick = ()=>{
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
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
    audioRef: PropTypes.object
}

export default AudioControlButton