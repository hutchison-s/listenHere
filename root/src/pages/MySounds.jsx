import { useContext } from 'react'
import './MySounds.css'
import { UserContext } from '../contexts/UserContext'

function MySounds() {

    const {user} = useContext(UserContext)

    return (
        <>
            <article className="gridCenter">
                <h2>My Sounds page for {user.name} is pending</h2>
            </article>
        </>
    )
}

export default MySounds