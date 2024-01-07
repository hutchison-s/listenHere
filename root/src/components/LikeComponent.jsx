import PropTypes from 'prop-types'
import { togglePinLike } from '../api/apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const LikeComponent = ({pin, profile, isLiked, setIsLiked}) => {
    const {updateProfile} = useContext(UserContext)
  return (
    <div className={isLiked ? "likes liked" : "likes"}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => {
              togglePinLike(pin, profile, isLiked, setIsLiked)
              updateProfile()
            }}
          />
          <span>{pin.likedBy.length}</span>
        </div>
  )
}

LikeComponent.propTypes = {
    pin: PropTypes.object,
    profile: PropTypes.object, 
    isLiked: PropTypes.bool,
    setIsLiked: PropTypes.func
}

export default LikeComponent