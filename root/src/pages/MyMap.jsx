import './MyMap.css'
import MapLoading from "../components/MapLoading"
import NewRecording from "../components/NewRecording"
// eslint-disable-next-line no-unused-vars
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

// Main Component
function MyMap() {

  // State
  const [currentLocation, setCurrentLocation] = useState(null)
  const [testPins, setTestPins] = useState([])

  // Populate testPins db on load and clear geolocation watcher on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.geolocation.clearWatch(watcher)
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    initPins()

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  // Geolocation Watcher & callbacks
  const watcher = navigator.geolocation.watchPosition(onFound, onError)

  function onFound({coords}) {
    if (currentLocation) { // Eliminate state change for minimal movement
      const latDelta = Math.abs(Math.abs(coords.latitude) - Math.abs(currentLocation.latitude))
      const lngDelta = Math.abs(Math.abs(coords.longitude) - Math.abs(currentLocation.longitude))
      if (latDelta > 0.0001 || lngDelta > 0.0001) {
        setCurrentLocation(coords)
        console.log("threshold reached", coords.latitude, coords.longitude)
      } else {
        console.log("minimal movement", coords.latitude, coords.longitude)
      }
    } else {
      setCurrentLocation(coords)
      console.log("location found", coords.latitude, coords.longitude)
    }
  }
  function onError(err) {
    console.log(err)
    alert("There seems to be a problem. Please ensure location is enabled and you have granted permission for this website to access location on your device.")
  }
  
  // Create two default pins for testing
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
    setTestPins(newPins)
  }

  // Marker icons
  const youPin = new Icon({
    iconUrl: "/person-rays-solid.svg",
    iconSize: [30, 30]
  });

  const earPin = new Icon({
    iconUrl: "/earpin.png",
    iconSize: [50, 50]
  });

  // Earpin functions
  function incLikes(id) {
    const pins = [...testPins]
    pins.forEach(pin => {
      if (pin.id === id) {
        pin.likes++
      }
    })
    setTestPins(pins)
  }

  // Earpin component
  function EarPinMarker({pin}) {
    return (
      <Marker 
        position={[pin.lat, pin.lng]} 
        icon={earPin} 
        onClick={(e)=>{e.originalEvent.preventDefault()}}
      >
        <Popup>
          <div>
            <h2>{pin.title}</h2>
            <div>
              <h3><em>{pin.user}</em></h3>
              <p>{pin.desc}</p>
            </div>
            <audio src={window.URL.createObjectURL(pin.blob)} controls></audio>
            <div className='popupFooter'>
              <p><small>{pin.timestamp}</small></p>
              <div className={pin.likes > 0 ? "likes liked" : "likes"}>
                <FontAwesomeIcon icon={faHeart} onClick={()=>{incLikes(pin.id)}}/>
                <span>{pin.likes}</span>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    )
  }
  EarPinMarker.propTypes = {
    pin: PropTypes.object
  }

  return (
    <>
      {currentLocation 
        ?   <>
              <MapContainer center={[currentLocation.latitude, currentLocation.longitude]} zoom={18} minZoom={14}> {/* Map currently reloads on movement, potential problems with listening while moving */}
                {testPins.map(pin => (
                    <EarPinMarker pin={pin} key={pin.id}/>
                ))}
                <Marker position={[currentLocation.latitude, currentLocation.longitude]} icon={youPin} zIndexOffset={1000}/> {/* You are here */}
                {<TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                />}
                
            </MapContainer>
            <NewRecording location={currentLocation} db={testPins} addPin={setTestPins}/> {/* Bottom button & recording interface */}
          </>
        : <MapLoading />
      }
      
    </>
  )
}

export default MyMap

