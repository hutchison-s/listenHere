import "./NewRecording.css"
import { useContext, useState } from "react"
import {UserContext} from '../contexts/UserContext'
import PropTypes from 'prop-types'
import AudioControlButton from "./AudioControlButton"
import RecordingForm from "./RecordingForm"
import RecordButton from "./RecordButton"

export default function NewRecording({location, db, addPin, setSrc, audioRef}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [tempBlob, setTempBlob] = useState(null)
    const [streamer, setStreamer] = useState(null)
    const {profile} = useContext(UserContext)
    const chunks = [];

    function initiateStream() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream)
                    mediaRecorder.ondataavailable = (e)=>{chunks.push(e.data)}
                    mediaRecorder.onstop = ()=>{
                        const blob = new Blob(chunks, { type: "audio/mpeg3" });
                        setTempBlob(blob)
                        chunks.length = 0;
                        setSrc(blob);
                    }
                    setStreamer(mediaRecorder)
                    console.log(mediaRecorder)
                })
                .catch((err) => {
                    console.error(`The following getUserMedia error occurred: ${err}`);
                    alert("Microphone access not allowed. Please check your device's settings.")
                });
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }

    
    const onSubmit = (e)=>{
        e.preventDefault()
        console.log(tempBlob)
        console.log(e.target.newDesc)
        const newPin = {
            creator: {id: profile._id, displayName: profile.displayName}, 
            title: e.target.newTitle.value, 
            desc: e.target.newDesc.value, 
            tags: e.target.tags.value.split(",").map(x=>x.toLowerCase().trim()),
            timestamp: new Date().toString(), 
            latlng: [location[0], location[1]], 
            blob: tempBlob, 
            likedBy: [],
            viewedBy: [],
            viewLimit: e.target.viewLimit.value == "unlimited" ? null : parseInt(e.target.viewLimit.value)
        }
        addPin([...db, newPin]);
        setTempBlob(null);
        setIsExpanded(false);
        setStreamer(null)
    }

    const onReset = (e)=>{
        e.preventDefault()
        e.target.reset()
        setTempBlob(null)
        setIsExpanded(false)
    }

    function RecordingInterface() {
        return ( 
            <div id="recordingInterface" className={isExpanded ? "expanded" : ""}>
                <h2>New Drop</h2>
                {tempBlob
                    ? <>
                        <AudioControlButton audioRef={audioRef}/>
                        <RecordingForm onReset={onReset} onSubmit={onSubmit} />
                      </>
                    : <RecordButton streamer={streamer}/>}
            </div>)
    }

    return (
        <>
            <RecordingInterface/>
             <button 
                id="dropNew"
                className={isExpanded ? "open" : ""}
                onClick={()=>{
                    setIsExpanded(!isExpanded)
                    if (!streamer) {
                        initiateStream()
                    } else {
                        setStreamer(null)
                    }
                }}
            ></button>
        </>
    )
}

NewRecording.propTypes = {
    location: PropTypes.array,
    db: PropTypes.array,
    addPin: PropTypes.func,
    setSrc: PropTypes.func,
    audioRef: PropTypes.object
}