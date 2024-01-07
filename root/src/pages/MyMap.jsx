import './MyMap.css'
import 'leaflet/dist/leaflet.css';
import MapWindow from '../components/MapWindow';
import NewRecording from '../components/NewRecording';


function MyMap() {

  return (
    <>
          <article>
            <MapWindow />
          </article>
          <NewRecording />
    </>
  )
}

export default MyMap