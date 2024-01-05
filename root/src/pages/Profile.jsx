import "./Account.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import axios from "axios";

function Profile() {

    const {userId} = useParams()
    const [profile, setProfile] = useState(null)
    const [connections, setConnections] = useState([])

    useEffect(()=>{
        if (profile) {
            setInfo()
        }
    })

    function setInfo() {
        axios.get("https://listen-here-api.onrender.com/users/"+userId)
        .then(res => {
            setProfile(res.data)
            const {connects} = res.data
            const first5 = connects.slice(0, 5)
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
        }).catch(err => {
            console.log(err)
        })
    }
    

    return (
        profile && <>
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
                        {connections.map(p => 
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

export default Profile;

Profile.propTypes = {
    profile: PropTypes.object.isRequired
}