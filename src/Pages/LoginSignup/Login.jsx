import React, { useState } from 'react'
import './LoginSignup.css'
import { Link } from 'react-router-dom'
import { loginHandler, showToast } from '../../Utils'
import { useAuth } from '../../Context/AuthContext'
import { useApp } from '../../Context/AppContext'
import { useNavigate } from 'react-router'
import { useToast } from '../../Context/ToastContext'
import { LoadingSmall } from '../../Components'

export const Login = () => {
  const { auth, authDispatch } = useAuth()
  const { appDispatch } = useApp()
  const { toastDispatch } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const loggingIn = () => {
    if (email.includes('@')) {
      loginHandler(
        auth.loggedInToken,
        email,
        password,
        authDispatch,
        appDispatch,
        toastDispatch,
        setLoader,
        navigate
      )
    } else { showToast(toastDispatch, "Please add a valid email") }
  }

  const guestLogIn = () => {
    setEmail('prynsu@yahoo.com')
    setPassword('priyanshu')
  }

  return (
    <div className="loginSignupBox">
      <h2>Log In</h2>
      <input
        className="inputBox"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        placeholder="Password"
        type={showPass ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label className='showPasswordChecker'>
        <input
          onChange={() => setShowPass(showPass => !showPass)}
          checked={showPass}
          type='checkbox' />
        Show Password</label>
      <button className="loginSignupBtn" onClick={() => loggingIn()}>
        {loader ? <LoadingSmall /> : "Login"}
      </button>
      <button className="loginSignupBtn" onClick={() => guestLogIn()}>
        Fill Guest Credentials
      </button>
      <p>
        Not a user, <Link className='loginSignupLink' to="/signup">Signup</Link>.
      </p>
    </div>
  )
}
