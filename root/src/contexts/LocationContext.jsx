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
                heading: action.payload.heading || 'No heading available',
                lastUpdated: action.payload.timestamp
            };
        // case 'updateOrientation':
        //     console.log('orientation update fired', action.payload.heading)
        //     return {
        //         ...state,
        //         heading: action.payload.heading,
        //         timestamp: action.payload.timestamp
        //     };
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
    heading: null,
    lastUpdated: Date.now(),
    tracking: true
}

let locationWatcher;
// let orientationWatcher;

// function grantPermission() {
//             // feature detect
//             if (typeof DeviceOrientationEvent.requestPermission === 'function') {
//               DeviceOrientationEvent.requestPermission()
//                 .then(permissionState => {
//                   console.log("orientation permission:", permissionState)
//                 })
//                 .catch(console.error);
//             } else {
//               // handle regular non iOS 13+ devices
//             }
//           }

// eslint-disable-next-line react/prop-types
export const LocationProvider = ({children}) => {

    // const [location, setLocation] = useState(null)
    // const [heading, setHeading] = useState(0)

    const [location, dispatch] = useReducer(locationReducer, initialLocation)

    // useEffect(()=>{
    //     let confirmed = confirm('Use device orientation?')
    //     if (confirmed) {
    //         grantPermission()
    //     }
    // }, [])

    useEffect(()=>{
        if (location.tracking) {
            console.log("Using navigator to search for current location.")
            locationWatcher = navigator.geolocation.watchPosition((position)=>{

                console.log("from watcher:",position)
                const {latitude, longitude, heading} = position.coords;
                const {timestamp} = position
                dispatch({type: 'updateLocation', payload: {latitude, longitude, heading, timestamp}})
            }, (error)=>{
                dispatch({type: 'error', payload: {error}})
            }, {enableHighAccuracy: true})

            // orientationWatcher = window.addEventListener('deviceorientation', (e)=>{
            //     const heading = e.alpha
            //     dispatch({type: 'updateOrientation', payload: {heading, timestamp: Date.now()}})
            // })
        }
        

        return ()=>{
            navigator.geolocation.clearWatch(locationWatcher);
            // window.removeEventListener('deviceorientation', orientationWatcher)
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