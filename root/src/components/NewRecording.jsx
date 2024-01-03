import "./NewRecording.css"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

export default function NewRecording({location, db, addPin}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [tempRecording, setTempRecording] = useState(null)
    const [tempBlob, setTempBlob] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const [streamer, setStreamer] = useState(null)
    const chunks = [];

    function initiateStream() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream)
                    mediaRecorder.ondataavailable = (e)=>{chunks.push(e.data)}
                    mediaRecorder.onstop = ()=>{
                        const blob = new Blob(chunks, { type: "audio/wav" });
                        setTempBlob(blob)
                        chunks.length = 0;
                        const audioURL = window.URL.createObjectURL(blob);
                        setTempRecording(audioURL)
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

    function RecordingInterface() {
        return ( 
            <div id="recordingInterface" className={isExpanded ? "expanded" : "collapsed"}>
                <h2>New Drop</h2>
                {tempRecording
                    ? <>
                        <audio src={tempRecording} controls preload="auto"></audio>
                        <form 
                            id="postRecording" 
                            onSubmit={(e)=>{
                                e.preventDefault()
                                console.log(tempBlob)
                                console.log(e.target.newDesc)
                                const newPin = {
                                    id: Math.random(), 
                                    user: 1234, 
                                    title: e.target.newTitle.value, 
                                    desc: e.target.newDesc.value, 
                                    timestamp: new Date().toDateString(), 
                                    lat: location[0], 
                                    lng: location[1], 
                                    blob: tempBlob, 
                                    likes: 0
                                }
                                addPin([...db, newPin]);
                                setTempRecording(null); 
                                setTempBlob(null);
                                setIsExpanded(false);
                                setStreamer(null)
                            }}
                            onReset={(e)=>{
                                e.preventDefault()
                                e.target.reset()
                                setTempRecording(null);
                                setTempBlob(null)
                                initiateStream()
                            }}
                            >
                            <label htmlFor="newTitle">Title: <input type="text" name="newTitle" id="newTitle" required/></label>
                            <label htmlFor="newDesc">Description: <textarea name="newDesc" id="newDesc" width="30" height="2"/></label>
                            <button id="dropRecording" type="submit">DROP</button>
                            <button id="deleteRecording" type="reset">DELETE</button>
                        </form>
                      </>
                    : (<button id="recordStart" onClick={record} className={isRecording ? "recording" : ""}>
                    {isRecording ? <FontAwesomeIcon icon={faStop}/> : <FontAwesomeIcon icon={faMicrophone}/>}
                </button>)}
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
    addPin: PropTypes.func
}