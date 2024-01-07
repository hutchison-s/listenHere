import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deletePin } from '../api/apiCalls'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const DeleteButton = ({pin}) => {
    const {updateProfile} = useContext(UserContext)
  return (
    <button className='deleteButton' onClick={()=>{
        deletePin(pin._id, (message)=>{
            console.log(message)
            updateProfile()
        })
    }}>
        <FontAwesomeIcon icon={faTrash}/>
    </button>
  )
}

DeleteButton.propTypes = {
    pin: PropTypes.object
}

export default DeleteButton