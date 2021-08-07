import './styles/Cart.css'
import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { useAuth } from '../contexts/AuthContext'
import CartProductCard from '../components/CartProductCard'
import {
  removeFromCartHandler,
  moveToWishlistBtn,
  incrementHandler,
  decrementHandler,
  showToast,
  hideToast,
  addToWishlistHandler,
} from '../functions/functions'
import { ToastSuccess, ToastError } from '../components/Toasts'
import { useNavigate } from 'react-router'

const Cart = () => {
  const { app, dispatch } = useApp()
  const { user, loggedInToken, setUser } = useAuth()
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  const cartPrices = app.cart.map(
    (item) => parseInt(item.product.price) * item.quantity,
  )
  const cartTotal = cartPrices.reduce((curr, acc) => curr + acc, 0)
  return (
    <div>
      <div className="toastDisplay">
        {showToast(toast, ToastSuccess, ToastError)}
      </div>
      <div className="cart">
        <div className="cartProducts">
          {app.cart?.map((item) => (
            <CartProductCard
              img={item.product.image}
              name={item.product.name}
              productBrand={item.product.brand}
              price={item.product.price}
              disableDecBtn={item.quantity === 1 ? true : ''}
              decrementFunc={() =>
                decrementHandler(item._id, loggedInToken, dispatch)
              }
              quantity={item.quantity}
              incrementFunc={() =>
                incrementHandler(item._id, loggedInToken, dispatch)
              }
              removeFunc={() =>
                {removeFromCartHandler(item._id, loggedInToken, dispatch, setToast)
                hideToast(setToast)}
              }
              toWishListFunc={() => {
                addToWishlistHandler(
                  item.product._id,
                  loggedInToken,
                  setUser,
                  navigate,
                )
                removeFromCartHandler(item._id, loggedInToken, dispatch, setToast)
                hideToast(setToast)
              }}
              wishListBtnStyle={moveToWishlistBtn(
                item.product._id,
                user.wishlist,
              )}
            />
          ))}
        </div>
        <div className="cartTotalArea">
          <div className="cartTotal">
            <h1>Checkout:</h1>
            <p>Total: Rs. {cartTotal}</p>
            <button className="btn btnPrimary">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
