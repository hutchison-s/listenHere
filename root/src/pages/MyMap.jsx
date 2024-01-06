import './MyMap.css'
// eslint-disable-next-line no-unused-vars
import 'leaflet/dist/leaflet.css';
import MapWindow from '../components/MapWindow';
import NewRecording from '../components/NewRecording';
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext';


// Main Component
function MyMap() {

  return (
    <>
      <AudioPlayerProvider>
          <article>
            <MapWindow />
          </article>
          <NewRecording />
      </AudioPlayerProvider>
    </>
  )
}

export default MyMap

  // useEffect(()=>{
  //   initPins()
  //   return navigator.geolocation.clearWatch(watcher)
  // }, [])

  //   useEffect(()=>{
  //       if (src) {
  //         let str = window.URL.createObjectURL(src)
  //           setUrl(str)
  //           console.log("source is set to", str)
  //       }
  //   }, [src])

  // async function initPins() {
  //   const newPins = [];
  //   await fetch("./init1.wav")
  //     .then(res => res.arrayBuffer())
  //     .then(buf => {
  //       const blob = new Blob([buf], { type: "audio/wav" });
  //       const curPin = {
  //         id: Math.random(), 
  //         user: "HutchisonMusic", 
  //         title: "Guitar Loop", 
  //         desc: "Guitar Loop from Logic's loop library.", 
  //         timestamp: "Fri Oct 28 2023",
  //         lat: 40.737715, 
  //         lng: -96.643098, 
  //         blob: blob, 
  //         likes: 0
  //       }
  //       newPins.push(curPin)
        
  //     })
  //     .catch (err => {console.log(err)})
  //   await fetch("./init2.mp3")
  //     .then(res => res.arrayBuffer())
  //     .then(buf => {
  //       const blob = new Blob([buf], { type: "audio/mp3" });
  //       const curPin = {
  //         id: Math.random(), 
  //         user: "UC_Studio", 
  //         title: "Never Lost", 
  //         desc: "Praise Team cover song of Never Lost.", 
  //         timestamp: "Mon Jan 01 2024", 
  //         lat: 40.774520, 
  //         lng: -96.653017, 
  //         blob: blob, 
  //         likes: 1
  //       }
  //       newPins.push(curPin)
        
  //     })
  //     console.log(newPins)
  //   setTestPins(newPins)
  // }
  // const watcher = navigator.geolocation.watchPosition(onFound, onError)

  // function onFound ({coords}) {
  //   const {latitude, longitude} = coords;
  //   let threshold = 0.00003;
  //   if (currentLocation) {
  //     let xMoved = Math.abs(Math.abs(currentLocation[0])-Math.abs(latitude)) > threshold
  //     let yMoved = Math.abs(Math.abs(currentLocation[1])-Math.abs(longitude)) > threshold
  //     if (xMoved || yMoved) {
  //       if (!document.querySelector("#recordingInterface.expanded")) {
  //         console.log(document.querySelector("#recordingInterface.expanded"))
  //         setCurrentLocation([latitude, longitude])
  //       } else {
  //         console.log("location will not update while recording interface is expanded")
  //       }
  //     } else {
  //       console.log("minimal movement prevented")
  //     }
  //   } else {
  //     setCurrentLocation([latitude, longitude])
  //     console.log("setting initial location state")
  //   }
  // }
  // function onError(err) {
  //   console.log(err)
  // }
