import PropTypes from 'prop-types'
import { UserContext } from '../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { useContext, useEffect } from 'react'

const ConnectionCard = ({viewingProfile}) => {

    const {profile} = useContext(UserContext)
    let newPins = 0;

    useEffect(()=>{
        const {pinList} = viewingProfile;
        pinList.forEach(id => {
            if (!profile.viewed.includes(id)) {
                newPins++
            }
        })
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