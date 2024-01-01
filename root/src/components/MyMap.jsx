import './MyMap.css'
import MapLoading from "./MapLoading"
// eslint-disable-next-line no-unused-vars
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from 'leaflet';
// later add TileLayer, Marker, Popup 

function MyMap() {
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
    iconUrl: "/person-rays-solid.svg",
    iconSize: [40, 40]
  });

  const earPin = new Icon({
    iconUrl: "/earpin.png",
    iconSize: [50, 50]
  });

  const testPins = [
    {id: 1234, lat: 40.7378845, lng: -96.638, msg: "Hello There"},
    {id: 1235, lat: 40.7376, lng: -96.640, msg: "Welcome"},
    {id: 1236, lat: 40.73717, lng: -96.6503, msg: "Happy New Year"},
    {id: 1237, lat: 40.73783, lng: -96.6429, msg: "2024 is Here!"},
]

  function onFound({coords}) {
    setCurrentLocation(coords)
    console.log(coords.latitude, coords.longitude)
  }
  function onError(err) {
    console.log(err)
    alert("There seems to be a problem. Please ensure location is enabled and you have granted permission for this website to access location on your device.")
  }
  const watcher = navigator.geolocation.watchPosition(onFound, onError)

  return (
    <>
      {currentLocation 
        ?   <MapContainer center={[currentLocation.latitude, currentLocation.longitude]} zoom={18} zoomControl={false} dragging={false} doubleClickZoom={false} scrollWheelZoom={false}>
                {testPins.map(pin => (
                    <Marker 
                        position={[pin.lat, pin.lng]} 
                        icon={earPin} 
                        key={pin.id}
                    >
                      <Popup>
                        <div>
                            <h2>{pin.id} says</h2>
                            <p>{pin.msg}</p>
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
        :   <MapLoading />
      }
    </>
  )
}

export default MyMap
