import "./Account.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser, updateUserInfo } from "../api/apiCalls";
import LargeProfilePhoto from "../components/LargeProfilePhoto";
import ConnectionsBox from "../components/ConnectionsBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPencil } from "@fortawesome/free-solid-svg-icons";

function Account() {

    const {profile, updateProfile} = useContext(UserContext)
    const [connections, setConnections] = useState([])
    const [updating, setUpdating] = useState(false)

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
        <>
            <article className="alignCenter">
                    <img src="/earpin.png" alt="logo" width='80px'/>
                    <LargeProfilePhoto profile={profile} editable={true}/>
                    <div className="accountInfoWrapper">
                        <h2>
                            <span style={{marginRight: '1rem'}}>{profile.displayName}</span>
                            <span className="sideEdit">
                                <FontAwesomeIcon icon={faPencil} onClick={()=>{setUpdating(true)}}/>
                            </span>
                        </h2>
                        <p>Bio:<br/>{profile.bio}</p>
                        <p><small>{profile.email}</small></p>
                        <p>Active pins: {profile.pins.length}</p>
                        <p>Viewed pins: {profile.viewed.length}</p>
                        <p>Liked pins: {profile.liked.length}</p>
                    </div>
                    <ConnectionsBox viewingProfile={profile} profile={profile} connections={connections}/>
                    
            </article>
            {updating ? <UpdateForm /> : null}
        </>
    )
}

export default Account;