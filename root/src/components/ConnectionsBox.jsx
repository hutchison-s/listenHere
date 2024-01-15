import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ConnectionsBox = ({viewingProfile, connections}) => {
  return (
    <div className="connectionsBox">
        <p className="connectionsHeader">{viewingProfile.connections.length} Connections</p>
        {connections && connections.map(p => 
            <Link 
                to={`/users/${p._id}`}
                style={p.photo ? {backgroundImage: `url("${p.photo}")`} : {backgroundImage: `url("/earpin.png")`}} 
                className="connectionPreview" 
                key={p._id}>
                    <span>{p.displayName}</span>
            </Link>
        )}
        {viewingProfile.connections.length > 5 ? <p className="connectionsFooter">...</p> : null}
    </div>
  )
}

ConnectionsBox.propTypes = {
    viewingProfile: PropTypes.object,
    profile: PropTypes.object,
    connections: PropTypes.array
}

export default ConnectionsBox