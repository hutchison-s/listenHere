import { createContext, useEffect, useState } from "react";

export const LocationContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const LocationProvider = ({children}) => {

    const [location, setLocation] = useState(null)

    useEffect(()=>{
        console.log("Using navigator to search for current location.")
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
            const position = {lat: latitude, lng: longitude}
            setLocation(position)
            console.log("GetPosition acquired location:", position)
        })
        const watcher = navigator.geolocation.watchPosition(({coords: {latitude, longitude}})=>{
            const position = {lat: latitude, lng: longitude}
            setLocation(position)
            console.log("Watcher acquired location:", position)
        }, (error)=>{
            console.log("Error detecting location to set context", error)
            console.log("Setting location to default: 40, -96")
            setLocation({lat: 40, lng: -96})
        }, {enableHighAccuracy: true})

        return navigator.geolocation.clearWatch(watcher)
    }, [])

    useEffect(()=>{
        console.log("state change => location set to:", location)
    }, [location])
    
    return (
        <LocationContext.Provider value={{location, setLocation}}>
            {children}
        </LocationContext.Provider>

    )
}