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
        console.log(profile)
        if (userPins.length == 0) {
            if (profile.pins.length > 0) {
                profile.pins.forEach((id) => {
                    getPin(id, (doc)=>{
                        setUserPins([...userPins, doc])
                    })
                })
            } else {
                console.log("No pins associated with user")
            }
        } else {
            userPins.length = 0;
            if (profile.pins.length > 0) {
                profile.pins.forEach((id) => {
                    getPin(id, (doc)=>{
                        setUserPins([...userPins, doc])
                    })
                })
            } else {
                console.log("No pins associated with user")
            }
        }
    }, [])

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