import PropTypes from 'prop-types'

const RecordingForm = ({onReset, onSubmit}) => {
  return (
    <form 
        id="postRecording" 
        onSubmit={onSubmit}
        onReset={onReset}
    >
        <label htmlFor="newTitle">
            <span>*Title: </span>
            <input type="text" name="newTitle" id="newTitle" placeholder='required' required/></label>
        <label htmlFor="newDesc">
            <span>Description: </span>
            <textarea name="newDesc" id="newDesc" width="30" height="2" maxLength='80' placeholder='optional'/></label>
        <label htmlFor="tags">
            <span>Tags: </span>
            <input 
                type="text" 
                name="tags" 
                id="tags" 
                placeholder='comma,separated,optional' 
                pattern='[a-zA-Z0-9,]+' 
                onInvalid={(e)=>{e.target.setCustomValidity('Only letters, numbers, and commas alowed.')}} 
                onInput={(e)=>{e.target.setCustomValidity('')}}/>
            </label>
        <label htmlFor="viewLimit"><span>View Limit:</span>
            <select name="viewLimit" id="viewLimit">
                <option value="unlimited">Unlimited</option>
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </label>
        <button id="dropRecording" type="submit">DROP</button>
        <button id="deleteRecording" type="reset">DELETE</button>
    </form>
  )
}

RecordingForm.propTypes = {
    onSubmit: PropTypes.func,
    onReset: PropTypes.func
}

export default RecordingForm