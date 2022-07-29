import React from 'react'
import './Cart.css'
import { CartProductCard } from '../../Components'
import { wishListBtnStyle, removeFromCartHandle, addToWishlistHandle, incrementHandler, decrementHandler, checkoutHandler } from '../../Utils'
import { useAuth } from '../../Context/AuthContext'
import { useApp } from '../../Context/AppContext'
import { useToast } from '../../Context/ToastContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'


export const Cart = () => {
  const { auth, authDispatch } = useAuth()
  const { app, appDispatch } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()

  const cartPrices = app.cart.map(
    (item) => parseInt(item.product.price) * item.quantity,
  )
  const cartTotal = cartPrices.reduce((curr, acc) => curr + acc, 0)

  const totalNumberOfItems = app.cart.map((item) => parseInt(item.quantity)).reduce((curr, acc) => curr + acc, 0)

  return (
    <div>
      <h2 className="cartHeading">Your Cart:</h2>
      <div className="cartProductsAndDetails">
        <div className="cartProductsContainer">
          {app.cart?.map((cartItem) => {
            return (
              <CartProductCard
                productImg={cartItem.product.image}
                productName={cartItem.product.name}
                productPrice={cartItem.product.price}
                disableDecBtn={cartItem.quantity === 1 ? true : ''}
                decrementFunc={() =>
                  decrementHandler(cartItem._id, auth.loggedInToken, appDispatch, toastDispatch, navigate)
                }
                quantity={cartItem.quantity}
                incrementFunc={() =>
                  incrementHandler(cartItem._id, auth.loggedInToken, appDispatch, toastDispatch, navigate)
                }
                removeFromCartHandle={() => removeFromCartHandle(
                  cartItem._id,
                  auth.loggedInToken,
                  appDispatch,
                  toastDispatch,
                  navigate,
                )}
                addToWishlistHandle={() =>
                  addToWishlistHandle(
                    cartItem.product._id,
                    auth.loggedInToken,
                    authDispatch,
                    toastDispatch,
                    navigate,
                  )
                }
                wishListBtnStyle={wishListBtnStyle(
                  cartItem.product._id,
                  auth.user,
                )}
              />
            )
          })}
        </div>
        <div className="cartDetails">
          <h3>Order Summary:</h3>
          <p>Total Quantity: {totalNumberOfItems}</p>
          <p>Total: $ {cartTotal}</p>
          <p>
            <i>Delivery expected in 6 to 7 days.</i>
          </p>
          <Link to="/checkout">
            <button onClick={checkoutHandler} className="paymentBtn">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
