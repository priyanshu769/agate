import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import WishList from './pages/WishList'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './contexts/AuthContext'
import { useEffect } from 'react'
import { useApp } from './contexts/AppContext'
import {loadUser, loadCart} from "./functions/functions"

function App() {
  const { user, loggedInToken, setUser, setLoggedInToken } = useAuth()
  const { app, dispatch } = useApp()
  console.log(app)
  console.log(user, loggedInToken)

  useEffect(() => {
    if (!loggedInToken) {
      const tokenfromLocalStorage = JSON.parse(
        localStorage.getItem('loggedInAgate'),
      )
      if (tokenfromLocalStorage) {
        setLoggedInToken(tokenfromLocalStorage.token)
        loadUser(tokenfromLocalStorage.token, setUser)
        loadCart(tokenfromLocalStorage.token, dispatch)
      }
    }
  })

  return (
    <div className="App">
      <nav className="navbar">
        <ul className="navPills listStyleNone listInline">
          <li className="navPill listInline">
            <Link className="link" activeclassname="selectedNavPill" to="/">
              Home
            </Link>
          </li>
          <li className="navPill listInline">
            <Link
              className="link"
              activeclassname="selectedNavPill"
              to="wishlist"
            >
              WishList
            </Link>
          </li>
          <li className="navPill listInline">
            <Link className="link" activeclassname="selectedNavPill" to="cart">
              Cart
            </Link>
          </li>
          <li className="navPill listInline">
            <Link className="link" activeclassname="selectedNavPill" to="login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/wish-list" element={<WishList />} /> */}
        <PrivateRoute
          login={loggedInToken}
          element={<WishList />}
          path="/wishlist"
        />
        {/* <Route path="/cart" element={<Cart />} />*/}
        <PrivateRoute login={loggedInToken} element={<Cart />} path="/cart" />
      </Routes>
    </div>
  )
}

export default App
