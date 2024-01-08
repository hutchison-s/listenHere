import { useContext } from "react";
import MapLoading from '../components/MapLoading'
import { LocationContext } from "../contexts/LocationContext";


// eslint-disable-next-line react/prop-types
export default function Protected({children}) {
    const {location} = useContext(LocationContext)
    if (location.lat && location.lng) {
        return children
    }
    else {
        return <MapLoading />
    }
  }