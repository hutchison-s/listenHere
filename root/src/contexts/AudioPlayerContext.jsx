import { createContext, useEffect, useState, useRef } from "react";

export const AudioPlayerContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const AudioPlayerProvider = ({children}) => {

    const [srcBlob, setSrcBlob] = useState(null)
    const [url, setUrl] = useState(null)
    const audioRef = useRef()

    useEffect(()=>{
        if (srcBlob) {
            let str = window.URL.createObjectURL(srcBlob)
                setUrl(str)
                console.log("source is set to", str)
            }
    }, [srcBlob])
    
    return (
        <AudioPlayerContext.Provider value={{audioRef, setSrcBlob}}>
            <audio src={url} ref={audioRef} preload="true"/>
            {children}
        </AudioPlayerContext.Provider>

    )
}