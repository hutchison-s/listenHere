import "./NewRecording.css"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons'

export default function NewRecording() {
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
                        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
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
                {tempRecording && <audio src={tempRecording} controls></audio>}
                {tempRecording
                    ? (<div id="postRecording">
                        <button id="dropRecording" onClick={()=>{console.log(tempBlob)}}>DROP</button>
                        <button id="deleteRecording" onClick={()=>{setTempRecording(null); setTempBlob(null)}}>DELETE</button>
                      </div>)
                    : (<button id="recordStart" onClick={record} className={isRecording ? "recording" : ""}>
                    {isRecording ? <FontAwesomeIcon icon={faStop}/> : <FontAwesomeIcon icon={faMicrophone}/>}
                </button>)}
            </div>
        )
    }

    return (
        <>
            <RecordingInterface/>
             <button 
                id="dropNew"
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