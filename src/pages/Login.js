import './styles/Login.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { useApp } from '../contexts/AppContext'
import { loadCart } from '../functions/functions'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(null)
  const [wrongCredentials, setWrongCredentials] = useState(null)
  const { loggedInToken, setLoggedInToken, setUser } = useAuth()
  const { dispatch } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    setWrongCredentials(null)
    if(loggedInToken){
        navigate('/')
    }
  }, [loggedInToken, navigate])

  const loginHandler = async () => {
    if (!loggedInToken) {
      try {
        setLoading(true)
        const { data } = await axios.post(
          'https://api-agate.herokuapp.com/login',
          {
            email: email,
            password: password,
          },
        )
        if (data.success) {
          loadCart(data.success, data.token, dispatch)
          localStorage.setItem(
            'loggedInAgate',
            JSON.stringify({ token: data.token }),
          )
          setLoggedInToken(data.token)
          setUser(data.user)
          setLoading(null)
          setWrongCredentials(null)
          navigate('/')
        }
      } catch (error) {
        setWrongCredentials(true)
        setLoading(null)
        console.log(error)
      }
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem('loggedInAgate')
    setLoggedInToken(null)
    setUser(null)
    navigate('/')
  }
  return (
    <div className="loginArea">
      {loggedInToken ? (
        <div>
          <h3>You are logged in!</h3>
          <button className="btn btnSecondary" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            className="input"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(() => e.target.value)}
          />
          <br />
          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword((passowrd) => e.target.value)}
          />
          <br />
          <small>
            {wrongCredentials && <h3>Email, password does not match.</h3>}
          </small>
          <br />
          <button
            type="submit"
            className="btn btnPrimary"
            onClick={loginHandler}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </div>
      )}
      <p>
        <small>New to Agate? </small>
        <Link to="/signup">
          <bold>Signup</bold>
        </Link>
      </p>
    </div>
  )
}

export default Login
