import "./Account.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function Profile() {

    const {userId} = useParams()
    const {profile, updateProfile} = useContext(UserContext)
    const [viewingProfile, setViewingProfile] = useState(null)
    const [connections, setConnections] = useState([])

    useEffect(()=>{
        axios.get("https://listen-here-api.onrender.com/users/"+userId)
        .then(res => {
            setViewingProfile(res.data)
            return res.data
        }).then(p => {
            const first5 = p.connections.slice(0, 5)
            first5.forEach(id => {
                axios.get("https://listen-here-api.onrender.com/users/"+id)
                    .then(res => {
                        setConnections([...connections, res.data])
                    }).catch(err => {
                        console.log(err)
                    })
            })
            console.log(viewingProfile)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function connect() {
        axios.post("https://listen-here-api.onrender.com/users/"+viewingProfile._id+"/connect", {userId: profile._id})
            .then(res => {
                console.log(res.status, "successful connection")
                updateProfile()
            }).catch(err => {
                console.log(err)
            })
    }

    function disconnect() {
        axios.put("https://listen-here-api.onrender.com/users/"+viewingProfile._id+"/disconnect", {userId: profile._id})
            .then(res => {
                console.log(res.status, "successful disconnect")
                updateProfile()
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        viewingProfile ? <>
            <article className="alignCenter">
                    <div className="profileLarge">
                        {viewingProfile.photo
                            ? <img src={viewingProfile.photo} alt="profile photo" />
                            : <FontAwesomeIcon icon={faUser}/>
                        }
                    </div>
                    {profile._id !== viewingProfile._id
                        ? !profile.connections.includes(viewingProfile._id)
                            ? <button className="connectButton" onClick={connect}>Connect</button> 
                            : <button className="connectButton" onClick={disconnect}>Remove Connection</button>
                        : null
                    }
                    <h2>{viewingProfile.displayName}</h2>
                    <p><small>{viewingProfile.email}</small></p>
                    <p>Active pins: {viewingProfile.pins.length}</p>
                    <p>Viewed pins: {viewingProfile.viewed.length}</p>
                    <p>Liked pins: {viewingProfile.liked.length}</p>
                    <div className="connectionsBox">
                        <p className="connectionsHeader">{viewingProfile.connections.length} Connections</p>
                        {connections.map(p => 
                            <Link 
                                to={`/users/${p._id}`}
                                style={{backgroundImage: `url("${p.photo}")`}} 
                                className="connectionPreview" 
                                key={p._id}>
                                    <span>{p.displayName}</span>
                            </Link>
                        )}
                        {viewingProfile.connections.length > 5 ? <p className="connectionsFooter">...</p> : null}
                    </div>
            </article>
        </>
        : null
    )
}

export default Profile;