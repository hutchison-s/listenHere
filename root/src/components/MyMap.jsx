import './MyMap.css'
import MapLoading from "./MapLoading"
import NewRecording from "./NewRecording"
// eslint-disable-next-line no-unused-vars
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function MyMap() {
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
    
  const [currentLocation, setCurrentLocation] = useState(null)
  const [testPins, setTestPins] = useState([])
  // const initPins = [
  //   {id: 1234, lat: 40.740574, lng: -96.644046, blob: "Hello There"},
  //   {id: 1235, lat: 40.739622, lng: -96.640843, blob: "Welcome"},
  // ]
  const youPin = new Icon({
    iconUrl: "/person-rays-solid.svg",
    iconSize: [30, 30]
  });

  const earPin = new Icon({
    iconUrl: "/earpin.png",
    iconSize: [50, 50]
  });

  function onFound({coords}) {
    setCurrentLocation(coords)
    console.log(coords.latitude, coords.longitude)
  }
  function onError(err) {
    console.log(err)
    alert("There seems to be a problem. Please ensure location is enabled and you have granted permission for this website to access location on your device.")
  }
  const watcher = navigator.geolocation.watchPosition(onFound, onError)

  async function initPins() {
    const newPins = [];
    await fetch("./init1.wav")
      .then(res => res.arrayBuffer())
      .then(buf => {
        const blob = new Blob([buf], { type: "audio/wav" });
        const curPin = {id: Math.random(), user: "HutchisonMusic", title: "Guitar Loop", desc: "Guitar Loop from Logic's loop library.", timestamp: new Date().toDateString(),lat: 40.737715, lng: -96.643098, blob: blob, likes: 0}
        newPins.push(curPin)
      })
      .catch (err => {console.log(err)})
    await fetch("./init2.mp3")
      .then(res => res.arrayBuffer())
      .then(buf => {
        const blob = new Blob([buf], { type: "audio/mp3" });
        const curPin = {id: Math.random(), user: "UC_Studio", title: "Never Lost", desc: "Praise Team cover song of Never Lost.", timestamp: new Date().toDateString(), lat: 40.774520, lng: -96.653017, blob: blob, likes: 1}
        newPins.push(curPin)
      })
      setTestPins(newPins)
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
      {currentLocation 
        ?   <>
              <MapContainer center={[currentLocation.latitude, currentLocation.longitude]} zoom={18} minZoom={14}>
                {testPins.map(pin => (
                    <Marker 
                        position={[pin.lat, pin.lng]} 
                        icon={earPin} 
                        key={pin.id}
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
                                  <FontAwesomeIcon icon={faHeart} onClick={()=>{incLikes(pin.id)}}/><span>{pin.likes}</span>
                                </div>
                              </div>
                        </div>
                      </Popup>
                    </Marker>
                ))}
                <Marker position={[currentLocation.latitude, currentLocation.longitude]} icon={youPin} zIndexOffset={1000}/>
                {<TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                />}
            </MapContainer>
            <NewRecording location={currentLocation} db={testPins} addPin={setTestPins}/>
          </>
        : <MapLoading />
      }
      
    </>
  )
}

export default MyMap
