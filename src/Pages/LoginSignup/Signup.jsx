import React, { useEffect, useRef, useState } from 'react'
import './LoginSignup.css'
import { Link } from 'react-router-dom'
import { showToast, signupHandle } from '../../Utils'
import { useAuth } from '../../Context/AuthContext'
import { useToast } from '../../Context/ToastContext'
import { LoadingSmall } from "../../Components"

export const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loader, setLoader] = useState(false)
  const nameRef = useRef()
  const { auth, authDispatch } = useAuth()
  const { toastDispatch } = useToast()

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const signup = () => {
    if (email.includes('@')) {
      if (password === rePassword) {
        signupHandle(
          auth.loggedInToken,
          name,
          email,
          rePassword,
          authDispatch,
          toastDispatch,
          setLoader
        )
      } else { showToast(toastDispatch, "Paswords does not match") }
    } else { showToast(toastDispatch, "Please add a valid email") }
  }

  const fillDummyData = () => {
    setName("Priyanshu")
    setEmail("prynsu@yahoo.com")
    setPassword("priyanshu")
    setRePassword("priyanshu")
  }

  return (
    <div className="loginSignupBox">
      <h2>Sign Up</h2>
      <input
        ref={nameRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        placeholder="Name"
        type="text"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        placeholder="Email"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        placeholder="New Password"
        type={showPass ? 'text' : 'password'}
      />
      <input
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        className="inputBox"
        placeholder="Confirm Password"
        type={showPass ? 'text' : 'password'}
      />
      <br />
      <label className='showPasswordChecker'>
        <input
          onChange={() => setShowPass(showPass => !showPass)}
          checked={showPass}
          type='checkbox' />
        Show Password</label>
      <button onClick={() => signup()} className="loginSignupBtn">
        {loader ? <LoadingSmall /> : "Signup"}
      </button>
      <button onClick={() => fillDummyData()} className="loginSignupBtn">
        Fill Dummy Data
      </button>
      <p>
        Already a user, <Link className='loginSignupLink' to="/login">Login</Link>.
      </p>
    </div>
  )
}
