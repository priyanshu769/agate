import './App.css'
import { ProductsPage, Cart, Wishlist, Login, Signup, Checkout } from './Pages'
import { Routes, Route, Link } from 'react-router-dom'
import {
  PrivateRoute,
  ReversePrivateRoute,
  loadUser,
  loadCart,
  logoutHandle,
  hideToast
} from './Utils'
import { useEffect, useState } from 'react'
import { useAuth } from './Context/AuthContext'
import { useApp } from './Context/AppContext'
import { useToast } from './Context/ToastContext'
import { Toast } from './Components'
import agateLogo from "./Assets/Images/agateLogo.png"
import { BsCart3, BsFillHeartFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'

function App() {
  const { auth, authDispatch } = useAuth()
  const { app, appDispatch } = useApp()
  const { toast, toastDispatch } = useToast()
  const [userFeat, setUserFeat] = useState(false)
  useEffect(() => {
    const localStorageLoggedInToken = JSON.parse(
      localStorage.getItem('loggedInAgate'),
    )
    if (localStorageLoggedInToken) {
      authDispatch({
        TYPE: 'set_loggedInToken',
        PAYLOAD: localStorageLoggedInToken.token,
      })
      loadUser(localStorageLoggedInToken.token, authDispatch)
      loadCart(localStorageLoggedInToken.token, appDispatch)
    }
  }, [authDispatch, appDispatch])

  useEffect(() => {
    if (toast.showToast) {
      setTimeout(() => hideToast(toastDispatch), 4000)
    }
  }, [toast, toastDispatch])


  return (
    <div className="App">
      <nav className="navbar">
        <div className='logoContainer'>
          <Link className="navLink" activeclassname="selectedNavPill" to="/">
            <img className='logoImg' src={agateLogo} alt="Agate Logo" />
          </Link>
        </div>
        <div className='navBulletsContainer'>
          <ul className="navBullets">
            <li className="navBullet">
              <Link
                className="navLink"
                activeclassname="selectedNavPill"
                to="/wishlist"
              >
                <BsFillHeartFill size={25} />
                <span classname="navIconBadge">{auth.user?.wishlist.length}</span>
              </Link>
            </li>
            <li className="navBullet">
              <Link
                className="navLink"
                activeclassname="selectedNavPill"
                to="/cart"
              >
                <BsCart3 size={25} />
                <span classname="navIconBadge">{app.cart?.length}</span>
              </Link>
            </li>
            <li className="navBullet">
              <button onClick={() => setUserFeat(!userFeat)} className="navBtn">
                <FaUserAlt size={25} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className={userFeat ? 'userOptionsContainer' : 'userOptionsHidden'}>
        <ul className="userOptions">
          <li className='userOption'>
            <Link
              className="navLink"
              activeclassname="selectedNavPill"
              to={auth.loggedInToken ? "" : "/login"}
            >
              {auth.loggedInToken ? auth.user?.name : 'Login'}
            </Link>
          </li>
          <li className="userOption">
            <button
              onClick={() => logoutHandle(auth.loggedInToken, authDispatch, appDispatch)}
              className={auth.loggedInToken ? 'navBtn' : 'userOptionsHidden'}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      {toast.showToast && <Toast toastMessage={toast.toastMessage} />}
      <Routes>
        <Route exact path="/" element={<ProductsPage />} />
        <Route exact path="/wishlist" element={<PrivateRoute />}>
          <Route exact path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route exact path="/cart" element={<PrivateRoute />}>
          <Route exact path="/cart" element={<Cart />} />
        </Route>
        <Route exact path="/checkout" element={<PrivateRoute />}>
          <Route exact path="/checkout" element={<Checkout />} />
        </Route>
        <Route exact path="/login" element={<ReversePrivateRoute />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route exact path="/signup" element={<ReversePrivateRoute />}>
          <Route exact path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
