import PropTypes from 'prop-types'
import { UserContext } from '../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

const ConnectionCard = ({viewingProfile}) => {

    const {profile} = useContext(UserContext)
    const [newPins, setNewPins] = useState(0)

    useEffect(()=>{
        if (newPins == 0) {
            if (viewingProfile.pins.length > 0) {
                const {pinList} = viewingProfile.pins;
                pinList.forEach(id => {
                    if (!profile.viewed.includes(id)) {
                        setNewPins((newPins => newPins+1))
                    }
                })
            }
        }
    }, [])

  return (
    <div className='userCard'>
        <Link to={'/users/'+viewingProfile._id}>
            <div className="userImage">
                {viewingProfile.photo
                    ? <img src={viewingProfile.photo} alt="profile photo" />
                    : <FontAwesomeIcon icon={faUser}/>
                }
            </div>
            <div className="userInfo">
                <h3>{viewingProfile.displayName}</h3>
                <p>{newPins} new pins</p>
            </div>
        </Link>

    </div>
  )
}

ConnectionCard.propTypes = {
    viewingProfile: PropTypes.object
}

export default ConnectionCard