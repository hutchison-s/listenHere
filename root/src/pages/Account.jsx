import "./Account.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../api/apiCalls";
import LargeProfilePhoto from "../components/LargeProfilePhoto";
import ConnectionsBox from "../components/ConnectionsBox";

function Account() {

    const {profile} = useContext(UserContext)
    const [connections, setConnections] = useState([])

    useEffect(()=>{
        if (connections.length == 0) {
            const first5 = profile.connections.slice(0, 5)
            first5.forEach(id => {
                getUser(id, (doc)=>{
                    setConnections([...connections, doc])
                })
            })
        }
    }, [])
    
    return (
        <>
            <article className="alignCenter">
                    <img src="/earpin.png" alt="logo" width='80px'/>
                    <LargeProfilePhoto profile={profile} />
                    <h2>{profile.displayName}</h2>
                    <p><small>{profile.email}</small></p>
                    <p>Active pins: {profile.pins.length}</p>
                    <p>Viewed pins: {profile.viewed.length}</p>
                    <p>Liked pins: {profile.liked.length}</p>
                    <ConnectionsBox viewingProfile={profile} profile={profile} connections={connections}/>
            </article>
        </>
    )
}

export default Account;