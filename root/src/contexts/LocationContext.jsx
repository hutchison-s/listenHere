import { createContext, useEffect, useReducer } from "react";

export const LocationContext = createContext(null)

const locationReducer = (state, action) => {
    let status;
    switch (action.type) {
        case 'updateLocation':
            console.log('location update fired')
            return {
                ...state,
                lat: action.payload.latitude,
                lng: action.payload.longitude,
                lastUpdated: action.payload.timestamp
            };
        case 'updateOrientation':
            console.log('orientation update fired', action.payload.heading)
            return {
                ...state,
                heading: action.payload.heading || 0,
                timestamp: action.payload.timestamp
            };
        case 'toggleTracking':
            status = action.payload ? 'on' : 'off'
            console.log("tracking turned", status)
            return {
                ...state,
                tracking: action.payload
            };
        case 'error':
            console.log("Error occured while attempting to update global location state:", action.payload.error);
            return state
        default:
            return state
    }
}

const initialLocation = {
    lat: null,
    lng: null,
    heading: 0,
    lastUpdated: Date.now(),
    tracking: true
}

let locationWatcher;
let orientationWatcher;

// eslint-disable-next-line react/prop-types
export const LocationProvider = ({children}) => {

    // const [location, setLocation] = useState(null)
    // const [heading, setHeading] = useState(0)

    const [location, dispatch] = useReducer(locationReducer, initialLocation)

        

    useEffect(()=>{
        if (location.tracking) {
            console.log("Using navigator to search for current location.")
            locationWatcher = navigator.geolocation.watchPosition((position)=>{

                console.log("from watcher:",position)
                const {latitude, longitude} = position.coords;
                const {timestamp} = position
                dispatch({type: 'updateLocation', payload: {latitude, longitude, timestamp}})
            }, (error)=>{
                dispatch({type: 'error', payload: {error}})
            }, {enableHighAccuracy: true})

            orientationWatcher = window.addEventListener('deviceorientation', (e)=>{
                const heading = e.alpha
                dispatch({type: 'updateOrientation', payload: {heading, timestamp: Date.now()}})
            })
        }
        

        return ()=>{
            navigator.geolocation.clearWatch(locationWatcher);
            window.removeEventListener('deviceorientation', orientationWatcher)
        }
    }, [location.tracking])

    useEffect(()=>{
        console.log("state change => location set to:", location)
    }, [location])
    
    return (
        <LocationContext.Provider value={{location, dispatch}}>
            {children}
        </LocationContext.Provider>

    )
}