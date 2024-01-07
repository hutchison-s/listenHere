import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const LargeProfilePhoto = ({profile}) => {
  return (
    <div className="profileLarge">
        {profile.photo
            ? <img src={profile.photo} alt="profile photo" />
            : <FontAwesomeIcon icon={faUser}/>
        }
    </div>
  )
}

LargeProfilePhoto.propTypes = {
    profile: PropTypes.object
}

export default LargeProfilePhoto