import "./Profile.css"
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser, connect, disconnect, updateUserInfo } from "../api/apiCalls";
import ConnectionsBox from '../components/ConnectionsBox'
import LargeProfilePhoto from "../components/LargeProfilePhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPencil } from "@fortawesome/free-solid-svg-icons";

function Profile() {

    const {userId} = useParams()
    const {profile, updateProfile} = useContext(UserContext)
    const [viewingProfile, setViewingProfile] = useState(null)
    const [connections, setConnections] = useState([])
    const [updating, setUpdating] = useState(false)
    

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
    }, [profile, userId])

    const UpdateForm = ()=>{
        return (
            <form id='updateInfoForm' onSubmit={(e)=>{
                e.preventDefault();
                const {name, bio} = e.target
                if (!/[<>]/g.test(bio.value)) {
                    updateUserInfo(profile._id, {displayName: name.value, bio: bio.value}, (res)=>{
                        console.log(res)
                    })
                    setUpdating(false)
                    updateProfile()
                } else {
                    alert("Bio cannot contain characters < or >")
                }
            }}>
                <button type="button" className="closeForm" onClick={()=>{setUpdating(false)}}>
                    <FontAwesomeIcon icon={faClose}/>
                </button>
                <p>Update your profile info below</p>
                <input type="text" name="name" id="name" pattern="^[a-zA-Z0-9\s]+$" defaultValue={profile.displayName} required/>
                <textarea name="bio" id="bio" defaultValue={profile.bio} maxLength='80' rows='4' required/>
                <button type="submit">Submit</button>
            </form>
        )
    }

    return (
        viewingProfile ? <>
            <article className="alignCenter">
                    <LargeProfilePhoto profile={viewingProfile} editable={viewingProfile._id == profile._id}/>
                    {profile._id !== viewingProfile._id
                        ? !profile.connections.includes(viewingProfile._id)
                            ? <button className="connectButton" onClick={()=>{connect(profile._id, viewingProfile._id, updateProfile)}}>Connect</button> 
                            : <button className="connectButton" onClick={()=>{disconnect(profile._id, viewingProfile._id, updateProfile)}}>Remove Connection</button>
                        : null
                    }
                    <div className="accountInfoWrapper">
                        {profile._id == viewingProfile._id
                            ?   <h2>
                                    <span style={{marginRight: '1rem'}}>{profile.displayName}</span>
                                    <span className="sideEdit">
                                        <FontAwesomeIcon icon={faPencil} onClick={()=>{setUpdating(true)}}/>
                                    </span>
                                </h2>
                            : <h2>{viewingProfile.displayName}</h2>}
                        <p>Bio:<br/>{viewingProfile.bio}</p>
                        <p><small>{viewingProfile.email}</small></p>
                        <div className="soundLinks">
                            <Link to='sounds'>Active pins: {viewingProfile.pins.length}</ Link>
                            <Link to='sounds'>Viewed pins: {viewingProfile.viewed.length}</ Link>
                            <Link to='sounds'>Liked pins: {viewingProfile.liked.length}</ Link>
                        </div>
                    </div>
                    <ConnectionsBox viewingProfile={viewingProfile} profile={profile} connections={connections}/>
            </article>
            {updating ? <UpdateForm /> : null}
        </>
        : null
    )
}

export default Profile;