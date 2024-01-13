import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faUser } from '@fortawesome/free-solid-svg-icons'
import { uploadFileToUserDirectory } from '../api/firebaseFuncs'
import { updateUserInfo } from '../api/apiCalls'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const LargeProfilePhoto = ({profile, editable}) => {

  const {updateProfile} = useContext(UserContext)

  return (
    <div className="profileLarge">
        {profile.photo
            ? <img src={profile.photo} alt="profile photo" />
            : <FontAwesomeIcon icon={faUser}/>
        }
        {editable 
        ? <label id='editPhoto'>
            <FontAwesomeIcon icon={faPencil}/>
            <input 
              type="file" 
              name="photoFile" 
              id="photoFile" 
              accept='image/png, image/jpeg'
              onChange={(e)=>{
                uploadFileToUserDirectory(e.target.files[0], profile.firebase)
                  .then(response => {
                    updateUserInfo(profile._id, {photo: response.data}, ()=>{
                      console.log('profile photo added successfully')
                      updateProfile()
                    })
                  }).catch(err => {
                    console.log(err)
                  })
              }}
              hidden/>
          </label>
        : null}
    </div>
  )
}

LargeProfilePhoto.propTypes = {
    profile: PropTypes.object,
    editable: PropTypes.bool
}

export default LargeProfilePhoto