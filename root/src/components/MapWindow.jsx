import { MapContainer, TileLayer } from 'react-leaflet'
import MapController from './MapController'
import FindMe from './FindMe'
import YouAreHere from './YouAreHere'

const MapWindow = () => {
  return (
    <MapContainer center={[41.7378961, -96.0426487]} zoom={18} minZoom={14} >
        <MapController />
        <FindMe />
        <YouAreHere />
        <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
    </MapContainer>
  )
}

export default MapWindow