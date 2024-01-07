import { useContext, useEffect, useState } from "react";
import "./Connections.css"
import { UserContext } from "../contexts/UserContext";
import ConnectionCard from '../components/ConnectionCard'
import { getUser } from "../api/apiCalls";

function Connections() {

    const {profile} = useContext(UserContext)
    
    const [connections, setConnections] = useState([])

    useEffect(()=>{
        if (connections.length == 0) {
            if (profile.connections.length > 0) {
                for (let id of profile.connections) {
                    getUser(id, (doc)=>{
                        setConnections([...connections, doc])
                    })
                }
            } else {
                console.log("No pins associated with user")
            }
        }
    }, [])

    return (
        <>
            <article className="alignCenter">
                <h2>{profile.connections.length} Connection{profile.connections.length > 1 && "s"}</h2>
                {connections.length > 0 && connections.map(p => <ConnectionCard key={p._id} viewingProfile={p}/>)}
            </article>
        </>
    )
}

export default Connections;