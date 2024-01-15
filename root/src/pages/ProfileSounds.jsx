import './ProfileSounds.css'
import UserPinsList from '../components/UserPinsList'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { getUser } from '../api/apiCalls'
import { UserContext } from '../contexts/UserContext'


function ProfileSounds() {

    const {profile} = useContext(UserContext)
    const {userId} = useParams()
    const [viewingProfile, setViewingProfile] = useState(null)
    useEffect(()=>{
        if (userId) {
            getUser(userId, (doc)=>{
                setViewingProfile(doc)
            })
        }
    }, [userId, profile])

    return (
        <>
            <article className="alignCenter">
                {viewingProfile && <UserPinsList profile={viewingProfile} />}
            </article>
        </>
    )
}

export default ProfileSounds