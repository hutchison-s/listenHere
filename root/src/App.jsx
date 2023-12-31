import './App.css'
import NavBar from "./components/NavBar"
// eslint-disable-next-line no-unused-vars
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
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
  function onFound({coords}) {
    setCurrentLocation(coords)
  }
  function onError(err) {
    console.log(err)
  }
  const watcher = navigator.geolocation.watchPosition(onFound, onError)

  return (
    <>
      <NavBar/>
      {currentLocation && (<MapContainer center={[currentLocation.latitude, currentLocation.longitude]} zoom={13} style={{ height: '400px' }}>
        {<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
/>}
    </MapContainer>)}
    </>
  )
}

export default App
