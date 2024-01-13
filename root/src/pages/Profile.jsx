import "./Account.css"
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser, connect, disconnect } from "../api/apiCalls";
import ConnectionsBox from '../components/ConnectionsBox'
import LargeProfilePhoto from "../components/LargeProfilePhoto";

function Profile() {

    const {userId} = useParams()
    const {profile, updateProfile} = useContext(UserContext)
    const [viewingProfile, setViewingProfile] = useState(null)
    const [connections, setConnections] = useState([])
    

    useEffect(()=>{
        getUser(userId, (primary)=>{
            setViewingProfile(primary)
            if (connections.length == 0) {
                const first5 = primary.connections.slice(0, 5)
                first5.forEach(id => {
                    getUser(id, (secondary)=>{
                        setConnections([...connections, secondary])
                    })
                })
            }
        })
    }, [])

    return (
        viewingProfile ? <>
            <article className="alignCenter">
                    <LargeProfilePhoto profile={viewingProfile} />
                    {profile._id !== viewingProfile._id
                        ? !profile.connections.includes(viewingProfile._id)
                            ? <button className="connectButton" onClick={()=>{connect(profile._id, viewingProfile._id, updateProfile)}}>Connect</button> 
                            : <button className="connectButton" onClick={()=>{disconnect(profile._id, viewingProfile._id, updateProfile)}}>Remove Connection</button>
                        : null
                    }
                    <h2>{viewingProfile.displayName}</h2>
                    <p>Bio:<br/>{viewingProfile.bio}</p>
                    <p><small>{viewingProfile.email}</small></p>
                    <p>Active pins: {viewingProfile.pins.length}</p>
                    <p>Viewed pins: {viewingProfile.viewed.length}</p>
                    <p>Liked pins: {viewingProfile.liked.length}</p>
                    <ConnectionsBox viewingProfile={viewingProfile} profile={profile} connections={connections}/>
            </article>
            
        </>
        : null
    )
}

export default Profile;