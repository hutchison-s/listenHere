import "./NewRecording.css"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

export default function NewRecording() {
    const [isExpanded, setIsExpanded] = useState(false)
    function RecordingInterface() {
        return (
            <div id="recordingInterface" className={isExpanded ? "expanded" : ""}>
                <h2>Start Recording</h2>
                <button><FontAwesomeIcon icon={faMicrophone}/></button>
            </div>
        )
    }

    return (
        <>
            <RecordingInterface/>
            <button 
                id="dropNew"
                onClick={()=>{setIsExpanded(!isExpanded)}}
            ></button>
        </>
    )
}