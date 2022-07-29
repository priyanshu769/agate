import React, { useState } from 'react'
import './LoginSignup.css'
import { Link } from 'react-router-dom'
import { signupHandle } from '../../Utils'
import { useAuth } from '../../Context/AuthContext'

export const Signup = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePasswrod] = useState('')
  const { auth, authDispatch } = useAuth()

  const signup = () => {
    if (password === rePassword) {
      signupHandle(
        auth.loggedInToken,
        name,
        username,
        email,
        rePassword,
        authDispatch,
      )
    }
  }

  return (
    <div className="loginSignupBox">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        placeholder="Name"
        type="text"
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="inputBox"
        placeholder="Username"
        type="text"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        placeholder="Email"
        type="text"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        placeholder="New Password"
        type="password"
      />
      <input
        value={rePassword}
        onChange={(e) => setRePasswrod(e.target.value)}
        className="inputBox"
        placeholder="Confirm Password"
        type="password"
      />
      <button onClick={() => signup()} className="loginSignupBtn">
        Signup
      </button>
      <p>
        Already a user, <Link to="/login">Login</Link>.
      </p>
    </div>
  )
}
