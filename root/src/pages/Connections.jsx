import { useContext, useEffect, useState } from "react";
import "./Connections.css"
import { UserContext } from "../contexts/UserContext";
import ConnectionCard from '../components/ConnectionCard'
import axios from "axios";

function Connections() {

    const {profile} = useContext(UserContext)
    
    const [connections, setConnections] = useState([])

    useEffect(()=>{
        if (connections.length == 0) {
            if (profile.connections.length > 0) {
                console.log(typeof(profile.connections))
                const temp = [...profile.connections]
            for (let id of temp) {
            axios.get("https://listen-here-api.onrender.com/users/"+id)
                .then(res => {
                    setConnections([...connections, res.data])
                }).catch(err => {
                    console.log(err)
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
                <h2>{profile.connections.length} Connections</h2>
                {connections.length > 0 && connections.map(p => <ConnectionCard key={p._id} viewingProfile={p}/>)}
            </article>
        </>
    )
}

export default Connections;