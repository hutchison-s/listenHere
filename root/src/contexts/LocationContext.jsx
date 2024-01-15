import { createContext, useEffect, useReducer } from "react";
import { isSignificant } from "../utils/utilFuncions";

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
        case 'setActivePinLocation':
            console.log('Active pin location set')
            return {
                ...state,
                activePinLoc: action.payload
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
    heading: null,
    lastUpdated: Date.now(),
    tracking: true,
    activePinLoc: null
}

let locationWatcher;

// eslint-disable-next-line react/prop-types
export const LocationProvider = ({children}) => {

    const [location, dispatch] = useReducer(locationReducer, initialLocation)

    useEffect(()=>{
        if (location.tracking) {
            console.log("Using navigator to search for current location.")
            locationWatcher = navigator.geolocation.watchPosition((position)=>{

                console.log("from watcher:")
                const {latitude, longitude, heading} = position.coords;
                const {timestamp} = position
                    if (!location.lat || isSignificant(0.0001, {lat: location.lat, lng: location.lng}, {lat: latitude, lng: longitude})) {
                        dispatch({type: 'updateLocation', payload: {latitude, longitude, heading, timestamp}})
                    } else {
                        console.log("Minimal movement detected. Location updating skipped.")
                    }
                
            }, (error)=>{
                dispatch({type: 'error', payload: {error}})
            }, {enableHighAccuracy: true})
        }
        

        return ()=>{
            navigator.geolocation.clearWatch(locationWatcher);
        }
    }, [location.tracking])
    
    return (
        <LocationContext.Provider value={{location, dispatch}}>
            {children}
        </LocationContext.Provider>

    )
}