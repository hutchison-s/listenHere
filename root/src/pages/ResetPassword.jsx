import { auth } from '../config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './ResetPassword.css'
import { useState } from 'react'

const ResetPassword = () => {

    const navigate = useNavigate()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [statMsg, setStatMsg] = useState('Please check your email for a link to reset your password.')

    const reset = (e)=>{
        e.preventDefault()
        sendPasswordResetEmail(auth, e.target.email.value)
        setIsSubmitted(true)
        setTimeout(()=>{
            setStatMsg('Redirecting to Login Page')
            setTimeout(()=>{
                navigate('/')
            }, 1500)
            
        }, 2000)
    }

    return (
        <article className="gridCenter">
            {isSubmitted
            ?<p style={{textAlign: 'center'}}>{statMsg}</p>
            :<form onSubmit={reset} id='resetPasswordForm'>
                <input type="email" name="email" id="email" placeholder='email...'/>
                <button type="submit">Reset Password</button>
            </form>}
            
        </article>
    )
}

export default ResetPassword