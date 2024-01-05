import { useContext, useState } from "react";
import axios from "axios";
import "./Account.css"
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Account() {

    const {profile} = useContext(UserContext)
    const [connections, setConnections] = useState([])

    const first5 = profile.connections.slice(0, 5)
    const connectPreviews = [];
    first5.forEach(id => {
        axios.get("https://listen-here-api.onrender.com/users/"+id)
            .then(res => {
                connectPreviews.push(res.data)
            }).catch(err => {
                console.log(err)
            })
    })
    setConnections(connectPreviews)
    
    return (
        <>
            <article className="alignCenter">
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
                                style={{backgroundImage: `url("${p.photo}")`}} 
                                className="connectionPreview" 
                                key={p._id}>
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