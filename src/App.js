import './App.css'
import { ProductsPage, Cart, Wishlist, Login, Signup, Checkout, LandingPage, Orders } from './Pages'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
import { Navbar, Toast, UserOptions } from './Components'

function App() {
  const { auth, authDispatch } = useAuth()
  const { app, appDispatch } = useApp()
  const { toast, toastDispatch } = useToast()
  const [userFeat, setUserFeat] = useState(false)
  const navigate = useNavigate()
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
      <Navbar
        wishlistNumber={auth.user?.wishlist.length}
        cartNumber={app.cart?.length}
        userClickHandle={() => setUserFeat(!userFeat)} />
      <UserOptions
        userFeat={userFeat}
        hideList={() => setUserFeat(false)}
        userName={auth.loggedInToken && auth.user?.name}
        loggedIn={auth.loggedInToken} 
        loginBtnClick={()=> {
          navigate('/login')
          setUserFeat(false)
        }}
        logoutBtnClick={() => logoutHandle(auth.loggedInToken, authDispatch, appDispatch)}/>
      {toast.showToast && <Toast toastMessage={toast.toastMessage} />}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/products" element={<ProductsPage />} />
        <Route exact path="/wishlist" element={<PrivateRoute />}>
          <Route exact path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route exact path="/cart" element={<PrivateRoute />}>
          <Route exact path="/cart" element={<Cart />} />
        </Route>
        <Route exact path="/checkout" element={<PrivateRoute />}>
          <Route exact path="/checkout" element={<Checkout />} />
        </Route>
        <Route exact path="/orders" element={<PrivateRoute />}>
          <Route exact path="/orders" element={<Orders />} />
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
