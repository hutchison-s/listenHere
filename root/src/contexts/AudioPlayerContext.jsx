import { createContext, useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types'
export const AudioPlayerContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const AudioPlayerProvider = ({children}) => {

    const [srcBlob, setSrcBlob] = useState(null)
    const [player, setPlayer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)

    useEffect(()=>{
        loadAudio()
    }, [srcBlob])

    const loadAudio = ()=>{
        if (srcBlob) {
            let str = window.URL.createObjectURL(srcBlob)
            console.log("source is set to", str)
            setPlayer(<NewAudio src={str}/>)
        }
    }

    const playAudio = ()=>{
        console.log(player, audioRef)
        if (player) {
            audioRef.current.play().catch(err=>{
                console.log('audio player error:', err)
            })
        }
    }

    const pauseAudio = ()=>{
        if (player) {
            audioRef.current.pause()
        }
    }
    const NewAudio = ({src})=> (
        <audio
        src={src}
        ref={audioRef} 
        onEnded={()=>{
            setIsPlaying(false)
            console.log('end of audio')
        }}
        onPause={()=>{
            setIsPlaying(false)
            console.log('pausing')
        }}
        onPlay={()=>{
            setIsPlaying(true)
            console.log('playing')
        }} 
        onLoadedData={(e)=>{
            e.target.play().then(()=>{
                e.target.pause()
                e.target.currentTime = 0
            })
        }}/>
        
    )
    NewAudio.propTypes = {
        src: PropTypes.string
    }
    
    return (
        <AudioPlayerContext.Provider value={{audioRef, setSrcBlob, playAudio, pauseAudio, isPlaying}}>
            {player}
            {children}
        </AudioPlayerContext.Provider>

    )
}