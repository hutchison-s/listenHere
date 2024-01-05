import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const UserContext = createContext({authorized: false})

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {

    const [profile, setProfile] = useState({authorized: false})

    useEffect(()=>{
        console.log(profile)
    }, [profile])

    function getProfileFromUser(user) {
        axios.get('https://listen-here-api.onrender.com/confirm/'+user.email)
            .then(res => {
                if (res.status === 200) {
                    setProfile(res.data)
                    console.log("Logged in as", res.data.displayName)
                }                 
            }).catch(err => {
                if (err.response.status === 404) {
                    newUser(user)
                } else {
                    console.error("Error in retrieving profile data from server:", err)
                }
                
            })
    }

    function newUser(user) {
        const newUserObject = {
            email: user.email,
            displayName: user.displayName || user.email.split("@")[0],
            bio: 'No bio created yet',
            photo: user.photoURL || null,
            pins: [],
            liked: [],
            viewed: [],
            connections: []
        }
        axios.post('https://listen-here-api.onrender.com/users', newUserObject)
            .then(res => {
                if (res.status === 201) {
                    setProfile(res.data)
                    console.log("Logged in as", res.data.displayName)
                } else {
                    console.log("Could not set profile to", res.data)
                    console.log(res.status, res.statusText)
                }
            }).catch(err => {
                console.error("Error in creating new profile on the server", err)
            })
    }


    
    return (
        <UserContext.Provider value={{profile, setProfile, getProfileFromUser}}>
            {children}
        </UserContext.Provider>

    )
}