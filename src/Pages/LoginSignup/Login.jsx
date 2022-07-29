import React, { useState } from 'react'
import './LoginSignup.css'
import { Link } from 'react-router-dom'
import { loginHandler } from '../../Utils'
import { useAuth } from '../../Context/AuthContext'
import { useApp } from '../../Context/AppContext'
import {useNavigate} from 'react-router'

export const Login = () => {
  const { auth, authDispatch } = useAuth()
  const { appDispatch } = useApp()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [wrongCredentials, setWrongCredentials] = useState(false)
  const navigate = useNavigate()

  const loggingIn = () => {
    loginHandler(
      auth.loggedInToken,
      email,
      password,
      authDispatch,
      appDispatch,
      setWrongCredentials,
      navigate
    )
  }

  return (
    <div className="loginSignupBox">
      <input
        className="inputBox"
        placeholder="Email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="loginSignupBtn" onClick={() => loggingIn()}>
        Login
      </button>
      <p
        style={
          wrongCredentials
            ? { display: 'block', color: 'red' }
            : { display: 'none' }
        }
      >
        Wrong Credentials
      </p>
      <p>
        Already a user, <Link to="/signup">Signup</Link>.
      </p>
    </div>
  )
}
