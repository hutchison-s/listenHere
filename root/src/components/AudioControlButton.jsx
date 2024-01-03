import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

const AudioControlButton = ({audioRef}) => {

    const [isPlaying, setIsPlaying] = useState(false)

    audioRef.current.onended = ()=>{
        setIsPlaying(false)
      }
    audioRef.current.onpause = () =>{
        setIsPlaying(false)
    }

  return (
    <button id="pausePlay" onClick={()=>{
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying((isPlaying)=>!isPlaying)}}>
            {isPlaying ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
    </button>
  )
}

AudioControlButton.propTypes = {
    audioRef: PropTypes.object
}

export default AudioControlButton