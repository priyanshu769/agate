import React from 'react'
import './Cart.css'
import { CartProductCard } from '../../Components'
import { wishListBtnStyle, removeFromCartHandle, addToWishlistHandle, incrementHandler, decrementHandler, showToast, emptyCart } from '../../Utils'
import { useAuth } from '../../Context/AuthContext'
import { useApp } from '../../Context/AppContext'
import { useToast } from '../../Context/ToastContext'
import { useNavigate } from 'react-router'
import axios from 'axios'

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

  const cartProducts = app.cart?.map(product => {
    return { orderedProduct: product._id, quantity: product.quantity }
  })

  console.log(cartProducts, 'cartproducts for order')

  const checkoutHandle = async (products, userToken, appDispatch, toastDispatch) => {
    showToast(toastDispatch, 'Placing Order')
    try {
      const checkoutRes = await axios.post('https://api-agate.herokuapp.com/orders', { orderedProducts: products }, { headers: { Authorization: userToken } },)
      console.log(checkoutRes)
      if (checkoutRes.data.success) {
        emptyCart(userToken, appDispatch, toastDispatch)
        navigate('/checkout')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2 className="cartHeading">Your Cart:</h2>
      <div className="cartProductsAndDetails">
        <div className="cartProductsContainer">
          {app.cart.length === 0 && <h3>Add products to cart.</h3>}
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
        <div style={{ display: app.cart.length > 0 ? 'block' : 'none' }} className="cartDetails">
          <h3>Order Summary:</h3>
          <p>Total Quantity: {totalNumberOfItems}</p>
          <p>Total: $ {cartTotal}</p>
          <p>
            <i>Delivery expected in 6 to 7 days.</i>
          </p>
          <button onClick={
            () => checkoutHandle(cartProducts, auth.loggedInToken, appDispatch, toastDispatch)
          } className="paymentBtn">Checkout</button>
        </div>
      </div>
    </div>
  )
}
