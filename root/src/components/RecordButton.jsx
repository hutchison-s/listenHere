import PropTypes from 'prop-types'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons'

const RecordButton = ({streamer}) => {
    const [isRecording, setIsRecording] = useState(false)

    function record() {
        console.log(streamer)
            if (isRecording) {
                streamer.stop()
                setIsRecording(false)
            } else {
                streamer.start()
                setIsRecording(true)
            }
    }
    
  return (
    <button 
        id="recordStart" 
        onClick={record} 
        className={isRecording ? "recording" : ""}
    >
        {isRecording ? <FontAwesomeIcon icon={faStop}/> : <FontAwesomeIcon icon={faMicrophone}/>}
    </button>
  )
}

RecordButton.propTypes = {
    streamer: PropTypes.object
}

export default RecordButton