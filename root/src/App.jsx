import './App.css'
import NavBar from "./components/NavBar"
// eslint-disable-next-line no-unused-vars
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import { Icon } from 'leaflet';
// later add TileLayer, Marker, Popup 

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.geolocation.clearWatch(watcher)
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const [currentLocation, setCurrentLocation] = useState(null)

  const youPin = new Icon({
    iconUrl: "./src/assets/person-rays-solid.svg",
    iconSize: [40, 40]
  });

  const earPin = new Icon({
    iconUrl: "/earpin.png",
    iconSize: [50, 50]
  });

  const pins = [
    {user: 1234, lat: 40.7378845, lng: -96.638, msg: "Hello There"},
    {user: 1235, lat: 40.7376, lng: -96.640, msg: "Hello There"},
    {user: 1236, lat: 40.73717, lng: -96.6503, msg: "Hello There"},
    {user: 1237, lat: 40.73783, lng: -96.6429, msg: "Hello There"},
  ]

  function onFound({coords}) {
    setCurrentLocation(coords)
    console.log(coords.latitude, coords.longitude)
  }
  function onError(err) {
    console.log(err)
  }
  const watcher = navigator.geolocation.watchPosition(onFound, onError)
  const latlng = ()=>[currentLocation.latitude, currentLocation.longitude]

  return (
    <>
      <NavBar/>
      {currentLocation && (
        <MapContainer center={latlng()} zoom={16}>
          <Marker position={latlng()} icon={youPin}/>
          {pins.map(pin => (
            <Marker position={[pin.lat, pin.lng]} icon={earPin} key={pin.user}/>
          ))}
          {<TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          />}
        </MapContainer>
      )}
    </>
  )
}

export default App
