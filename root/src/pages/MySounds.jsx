import { useContext, useEffect, useState } from 'react'
import { getPin } from '../api/apiCalls'
import './MySounds.css'
import { UserContext } from '../contexts/UserContext'
import PinCard from '../components/PinCard'

function MySounds() {

    const {profile} = useContext(UserContext)
    const [userPins, setUserPins] = useState([])
    const [isFeatured, setIsFeatured] = useState('')

    useEffect(()=>{
        if (profile.pins.length > 0) {
            profile.pins.forEach((id) => {
                getPin(id, (doc)=>{
                    setUserPins([...userPins, doc])
                })
            })
        } else {
            console.log("No pins associated with user")
        }
    }, [])

    useEffect(()=>{
        if (profile.pins.length > 0) {
            const existingPins = userPins.map(doc=>doc._id)
            const newPins = profile.pins.filter(id => !existingPins.includes(id))
            newPins.forEach((id) => {
                getPin(id, (doc)=>{
                    setUserPins([...userPins, doc])
                })
            })
        } else {
            console.log("No pins associated with user")
            setUserPins([])
        }
    }, [profile])

    return (
        <>
            <article className="alignCenter">
                <h2>{userPins.length} Active Pin{profile.pins.length > 1 && "s"}</h2>
                {userPins.map(pin => <PinCard key={pin._id} pin={pin} isFeatured={isFeatured} setIsFeatured={setIsFeatured}/>)}
            </article>
        </>
    )
}

export default MySounds