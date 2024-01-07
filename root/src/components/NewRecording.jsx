import "./NewRecording.css"
import { useContext, useState } from "react"
import {UserContext} from '../contexts/UserContext'
import { convertBlobToBase64, initiateAudioRecorder } from "../utils/utilFuncions"
import AudioControlButton from "./AudioControlButton"
import RecordingForm from "./RecordingForm"
import RecordButton from "./RecordButton"
import { LocationContext } from "../contexts/LocationContext"
import { AudioPlayerContext } from "../contexts/AudioPlayerContext"
import { createPin } from "../api/apiCalls"

export default function NewRecording() {

    const {location} = useContext(LocationContext)
    const {setSrcBlob} = useContext(AudioPlayerContext)

    const [isExpanded, setIsExpanded] = useState(false)
    const [tempBlob, setTempBlob] = useState(null)
    const [streamer, setStreamer] = useState(null)
    const {profile} = useContext(UserContext)
    const chunks = [];

    function newRecorder() {
        initiateAudioRecorder(
            (e)=>{chunks.push(e.data)},
            ()=>{
                const blob = new Blob(chunks, { type: "audio/mpeg3" });
                setTempBlob(blob)
                chunks.length = 0;
                setSrcBlob(blob);
            },
            (newRecorder)=>{
                setStreamer(newRecorder)
                console.log(newRecorder)
            }
        )
    }
    
    const onSubmit = async (e)=>{
        e.preventDefault()
        console.log(tempBlob)
        console.log(e.target.newDesc)
        const creator = {id: profile._id, displayName: profile.displayName}
        const isLimited = e.target.viewLimit.value != "unlimited"
        const tags = e.target.tags.value == ''
            ? []
            : e.target.tags.value.split(",").map(x=>x.toLowerCase().trim())
        const base64Data = await convertBlobToBase64(tempBlob)

        const newPin = {
            creator: creator, 
            title: e.target.newTitle.value, 
            desc: e.target.newDesc.value,
            timestamp: new Date().toString(), 
            latlng: location, 
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
                        newRecorder()
                    } else {
                        setStreamer(null)
                    }
                }}
            ></button>
        </>
    )
}