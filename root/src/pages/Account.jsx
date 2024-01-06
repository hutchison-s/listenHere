import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Account.css"
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Account() {

    const {profile} = useContext(UserContext)
    const [connections, setConnections] = useState([])

    useEffect(()=>{
        const first5 = profile.connections.slice(0, 5)
        first5.forEach(id => {
            axios.get("https://listen-here-api.onrender.com/users/"+id)
                .then(res => {
                    setConnections([...connections, res.data])
                }).catch(err => {
                    console.log(err)
                })
        })
    }, [])
    
    
    return (
        <>
            <article className="alignCenter">
                    <img src="/earpin.png" alt="logo" width='80px'/>
                    <div className="profileLarge">
                        {profile.photo
                            ? <img src={profile.photo} alt="profile photo" />
                            : <FontAwesomeIcon icon={faUser}/>
                        }
                    </div>
                    <h2>{profile.displayName}</h2>
                    <p><small>{profile.email}</small></p>
                    <p>Active pins: {profile.pins.length}</p>
                    <p>Viewed pins: {profile.viewed.length}</p>
                    <p>Liked pins: {profile.liked.length}</p>
                    <div className="connectionsBox">
                        <p className="connectionsHeader">{profile.connections.length} Connections</p>
                        {connections.length > 0 && connections.map(p => 
                            <Link 
                                to={`/users/${p._id}`}
                                style={p.photo ? {backgroundImage: `url("${p.photo}")`} : {backgroundImage: `url("/earpin.png")`}} 
                                className="connectionPreview" 
                                key={p._id}
                                >
                                    <span>{p.displayName}</span>
                            </Link>
                        )}
                        {profile.connections.length > 5 ? <p className="connectionsFooter">...</p> : null}
                    </div>
            </article>
        </>
    )
}

export default Account;