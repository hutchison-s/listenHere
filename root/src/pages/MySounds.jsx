import { useContext, useState } from 'react'
import './MySounds.css'
import { UserContext } from '../contexts/UserContext'
import PinCard from '../components/PinCard'

function MySounds() {

    const {profile} = useContext(UserContext)
    const [isFeatured, setIsFeatured] = useState('')

    const userPins = profile.pins.map(pinId => <PinCard key={pinId} pinId={pinId} isFeatured={isFeatured} setIsFeatured={setIsFeatured}/>)

    return (
        <>
            <article className="alignCenter">
                <h2>{profile.pins.length} Active Pin{profile.pins.length !== 1 && "s"}</h2>
                {userPins}
            </article>
        </>
    )
}

export default MySounds