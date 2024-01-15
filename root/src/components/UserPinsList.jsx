import { useState } from 'react'
import PinCard from './PinCard'
import PropTypes from 'prop-types'

const UserPinsList = ({profile}) => {

    const [isFeatured, setIsFeatured] = useState('')
    const [filter, setFilter] = useState('Dropped')

    const menuBtnStyle = {flex: 1, border: 'none', background: 'transparent', color: 'var(--softwhite)', padding: '0.5rem'}
    const selectedStyle = {flex: 1, border: '2px solid transparent', background: 'var(--darker-75)', borderBottom: '2px solid var(--poolside)', color: 'var(--softwhite)', padding: '0.5rem'}

    const filterKeys = {
        'Dropped': {key: 'pins', title: 'Dropped'},
        'Liked': {key: 'liked', title: 'Liked'},
        'Viewed': {key: 'viewed', title: 'Viewed'},
    }

    const MenuBtn = ({title}) => {
        return (
            <button 
                className="filterMenuOpt"
                style={filterKeys[filter].title == title ? selectedStyle : menuBtnStyle}
                onClick={()=>{setFilter(title)}}
            >
                {title}
            </button>
        )
    }
    MenuBtn.propTypes = {
        title: PropTypes.string
    }

  return (
    <>
        <h2>Sounds for {profile.displayName}</h2>
            <div className='pinFilterMenu' style={{display: 'flex', width: '100%'}}>
                {Object.values(filterKeys).map(each => <MenuBtn key={each.title} title={each.title} />)}
            </div>
            {/*  */}
            <div 
                className="verticalScrollContainer"
                style={{display: 'grid', width: '100%', gap: '0.5rem', overflow: 'auto', textAlign: 'center'}}
            >
            <h3>{profile[filterKeys[filter].key].length} Pin{profile[filterKeys[filter].key].length !== 1 && "s"}</h3>
            {profile[filterKeys[filter].key].map(pinId => <PinCard key={pinId} pinId={pinId} isFeatured={isFeatured} setIsFeatured={setIsFeatured}/>)}
        </div>
    </>
  )
}

UserPinsList.propTypes = {
    profile: PropTypes.object
}

export default UserPinsList