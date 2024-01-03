import { createContext, useState } from "react";

export const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {

    const [user, setUser] = useState({user: "", auth: false})

    const userDB = {
        "Steven": "password"
    }

    function login(creds) {
        console.log("evaluating", creds)
        if (userDB[creds.name] === creds.pass) {
            const obj = {
                name: creds.name,
                auth: true
            }
            setUser(obj)
            localStorage.setItem("listenUser", JSON.stringify(obj))
        } else {
            setUser({
                name: '',
                auth: false
            })
            localStorage.setItem("listenUser", "")
        }
    }

    function logout() {
        setUser({
            name: '',
            auth: false
        })
        localStorage.removeItem("listenUser")
    }
    
    return (
        <UserContext.Provider value={{user, login, logout, setUser}}>
            {children}
        </UserContext.Provider>

    )
}