import "./NewRecording.css"
import { useContext, useEffect, useState } from "react"
import {UserContext} from '../contexts/UserContext'
import { convertBlobToBase64 } from "../utils/utilFuncions"
import AudioControlButton from "./AudioControlButton"
import RecordingForm from "./RecordingForm"
import RecordButton from "./RecordButton"
import { LocationContext } from "../contexts/LocationContext"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import { createPin } from "../api/apiCalls"

export default function NewRecording() {

    const {location, dispatch} = useContext(LocationContext)
    const {setSrcBlob} = useContext(AudioPlayerContext)

    const [isExpanded, setIsExpanded] = useState(false)
    const [tempBlob, setTempBlob] = useState(null)
    const [streamer, setStreamer] = useState(null)
    const {profile, updateProfile} = useContext(UserContext)
    const chunks = [];

    useEffect(()=>{
        dispatch({type: 'toggleTracking', payload: !isExpanded})
    }, [isExpanded, dispatch])

    const initiateAudioRecorder = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream)
                    mediaRecorder.ondataavailable = (e)=>{chunks.push(e.data)}
                    mediaRecorder.onstop = ()=>{
                        const blob = new Blob(chunks, { type: "audio/mpeg3" });
                        setTempBlob(blob)
                        chunks.length = 0;
                        setSrcBlob(blob);
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
    
    const onSubmit = async (e)=>{
        e.preventDefault()
        const creator = {id: profile._id, displayName: profile.displayName}
        const isLimited = e.target.viewLimit.value != "unlimited"
        const tags = e.target.tags.value == ''
            ? []
            : e.target.tags.value.split(",").map(x=>x.toLowerCase().trim())
        const base64Data = await convertBlobToBase64(tempBlob)
        const {lat, lng} = location
        const newPin = {
            creator: creator, 
            title: e.target.newTitle.value, 
            desc: e.target.newDesc.value,
            timestamp: Date.now(), 
            latlng: {lat: lat, lng: lng}, 
            data: base64Data,
            tags: tags,
            viewLimit: {
                isLimited: isLimited,
                limit: isLimited ? parseInt(e.target.viewLimit.value) : 0
            }
        }

        createPin(newPin, (doc)=>{
            console.log("Successfully added:", doc)
            setTempBlob(null);
            setIsExpanded(false);
            setStreamer(null)
            updateProfile()
        })
        
    }

    const onReset = (e)=>{
        e.preventDefault()
        e.target.reset()
        setTempBlob(null)
        setStreamer(null)
        setIsExpanded(false)
    }

    function RecordingInterface() {
        return ( 
            <div id="recordingInterface" className={isExpanded ? "expanded" : ""}>
                <h2>New Drop</h2>
                {tempBlob
                    ? <>
                        <AudioControlButton />
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
                        initiateAudioRecorder()        
                    } else {
                        setStreamer(null)
                    }
                }}
            ></button>
        </>
    )
}