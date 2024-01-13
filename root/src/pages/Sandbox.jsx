import { useState } from "react";
import { storage } from "../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Sandbox = () => {

    const [imgUrl, setImgUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const onSubmit = (e, user) => {
        e.preventDefault()
        
        try {
            const file = e.target.file.files[0]
            console.log('files:', e.target.file.value)
            if (!file) return
            const now = new Date()
            const fileName = file.name.split(".")[0]+now.getFullYear()+now.getMonth()+now.getDate()+now.getTime()+"."+file.name.split(".")[1]
            const storageRef = ref(storage, `${user}/files/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
                if (selectedFile) {
                    setSelectedFile(null)
                }
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setImgUrl(downloadURL)
                        setProgresspercent(0)
                    });
            }
            );
        } catch (error) {
            console.log(error)
        }
    }

    const formStyle = {
        display: 'grid',
        gap: '1rem'
    }
    const labelStyle = {
        border: '1px solid var(--poolside)',
        borderRadius: '1rem',
        padding: '1rem',
        background: 'var(--darker-25)',
        cursor: 'pointer'
    }
    const buttonStyle = {
        border: 'none',
        borderRadius: '0.25rem',
        padding: '0.5rem',
        width: '60%',
        background: 'var(--yellow)',
        color: 'var(--jet)',
        margin: 'auto'
    }

  return (
    <article className="alignCenter">
        <h2 style={{textAlign: 'center'}}>Upload and display photo using <br/>Firebase Storage</h2>
        {progresspercent > 0 ? `Upload ${progresspercent}% complete` : null}
        <form onSubmit={(e)=>{
            onSubmit(e, '012340235023508')
        }} style={formStyle}>
            <label htmlFor="file" style={labelStyle}>
                <span>Choose file</span>
                <input type="file" name="file" id="file" accept="image/jpeg, image/png" hidden onChange={(e)=>{
                    let path = String(e.target.value).split('\\')
                    let fileName = path[path.length-1]
                    console.log(fileName)
                    setSelectedFile(fileName)
                }}/>
            </label>
            {selectedFile ? <p>{selectedFile}</p> : null}
            <button type="submit" style={buttonStyle}>submit</button>
        </form>
        {imgUrl && <img src={imgUrl} alt="uploaded photo" />}
    </article>
  )
}

export default Sandbox