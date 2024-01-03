import './MyMap.css'
// eslint-disable-next-line no-unused-vars
import 'leaflet/dist/leaflet.css';
import MapLoading from '../components/MapLoading';
import YouAreHere from '../components/YouAreHere';
import EarPinMarker from '../components/EarPinMarker';
import MapController from '../components/MapController';
import NewRecording from '../components/NewRecording';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';

// Main Component
function MyMap() {

  const [currentLocation, setCurrentLocation] = useState(null)
  const [testPins, setTestPins] = useState([])

  useEffect(()=>{
    initPins()
    return navigator.geolocation.clearWatch(watcher)
  }, [])

  async function initPins() {
    const newPins = [];
    await fetch("./init1.wav")
      .then(res => res.arrayBuffer())
      .then(buf => {
        const blob = new Blob([buf], { type: "audio/wav" });
        const curPin = {
          id: Math.random(), 
          user: "HutchisonMusic", 
          title: "Guitar Loop", 
          desc: "Guitar Loop from Logic's loop library.", 
          timestamp: "Fri Oct 28 2023",
          lat: 40.737715, 
          lng: -96.643098, 
          blob: blob, 
          likes: 0
        }
        newPins.push(curPin)
        
      })
      .catch (err => {console.log(err)})
    await fetch("./init2.mp3")
      .then(res => res.arrayBuffer())
      .then(buf => {
        const blob = new Blob([buf], { type: "audio/mp3" });
        const curPin = {
          id: Math.random(), 
          user: "UC_Studio", 
          title: "Never Lost", 
          desc: "Praise Team cover song of Never Lost.", 
          timestamp: "Mon Jan 01 2024", 
          lat: 40.774520, 
          lng: -96.653017, 
          blob: blob, 
          likes: 1
        }
        newPins.push(curPin)
        
      })
      console.log(newPins)
    setTestPins(newPins)
  }
  const watcher = navigator.geolocation.watchPosition(onFound, onError)

  function onFound ({coords}) {
    const {latitude, longitude} = coords;
    let threshold = 0.00003;
    if (currentLocation) {
      let xMoved = Math.abs(Math.abs(currentLocation[0])-Math.abs(latitude)) > threshold
      let yMoved = Math.abs(Math.abs(currentLocation[1])-Math.abs(longitude)) > threshold
      if (xMoved || yMoved) {
        setCurrentLocation([latitude, longitude])
      }
    } else {
      setCurrentLocation([latitude, longitude])
      console.log("setting initial location state")
    }
  }
  function onError(err) {
    console.log(err)
  }

  function incLikes(id) {
    const pins = [...testPins]
    pins.forEach(pin => {
      if (pin.id === id) {
        pin.likes++
      }
    })
    setTestPins(pins)
  }

  return (
    <>
      {!currentLocation && <MapLoading/>}
      <MapContainer center={[41.7378961, -96.0426487]} zoom={18} minZoom={14} >
        <MapController currentLocation={currentLocation} />
        <YouAreHere currentLocation={currentLocation} />
        {testPins && testPins.map(pin=>
          <EarPinMarker key={pin.id} pin={pin} likeFunc={incLikes}/>
        )}
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
      </MapContainer>
      {currentLocation 
        ? <NewRecording location={currentLocation} db={testPins} addPin={setTestPins}/> 
        : null
      }
    </>
  )
}

export default MyMap

