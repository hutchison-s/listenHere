import PropTypes from 'prop-types'

const AudioPlayer = ({url, audioRef}) => {
    
  return (
    <audio src={url} ref={audioRef}></audio>
  )
}

AudioPlayer.propTypes = {
    url: PropTypes.string,
    audioRef: PropTypes.object
}

export default AudioPlayer