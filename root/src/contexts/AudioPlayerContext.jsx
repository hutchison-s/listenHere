import { createContext, useEffect, useState, useRef } from "react";

export const AudioPlayerContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const AudioPlayerProvider = ({children}) => {

    const [srcBlob, setSrcBlob] = useState(null)
    const [url, setUrl] = useState(null)
    const [controls, setControls] = useState({play: null, pause: null})
    const audioRef = useRef()

    useEffect(()=>{
        setControls({
            play: audioRef.current.play,
            pause: audioRef.current.pause
        })
    }, [])
    
    useEffect(()=>{
        if (srcBlob) {
            let str = window.URL.createObjectURL(srcBlob)
                setUrl(str)
                console.log("source is set to", str)
            }
    }, [srcBlob])
    
    return (
        <AudioPlayerContext.Provider value={{audioRef, controls, setSrcBlob}}>
            <audio src={url} ref={audioRef}/>
            {children}
        </AudioPlayerContext.Provider>

    )
}