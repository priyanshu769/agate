import ProductCard from '../components/Productcard'
import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { useAuth } from '../contexts/AuthContext'
import {
  addToCartBtn,
  addToWishlistBtn,
  showToast,
  hideToast,
  addToCartHandler,
  addToWishlistHandler,
} from '../functions/functions'
import { ToastSuccess, ToastError } from '../components/Toasts'
import { useNavigate } from 'react-router'

const WishList = () => {
  const { app, dispatch } = useApp()
  const { user, loggedInToken, setUser } = useAuth()
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  return (
    <div>
      <div className="toastDisplay">
        {showToast(toast, ToastSuccess, ToastError)}
      </div>
      <div className="productsList">
        {user?.wishlist.map((wishedItem) => {
          return (
            <ProductCard
              img={wishedItem.image}
              name={wishedItem.name.slice(0, 35)}
              extraSection={
                wishedItem.fastDelivery
                  ? 'Fast Delivery Available'
                  : 'Fast Delivery Unavailable'
              }
              price={wishedItem.price}
              toCartFunc={() =>{
                addToCartHandler(
                  wishedItem._id,
                  loggedInToken,
                  dispatch,
                  navigate,
                  setToast
                )
                hideToast(setToast)}
              }
              addToCartBtnStyle={addToCartBtn(wishedItem._id, app.cart)}
              toWishListFunc={() =>{
                addToWishlistHandler(
                  wishedItem._id,
                  loggedInToken,
                  setUser,
                  navigate,
                  setToast
                )
                hideToast(setToast)}
              }
              wishListBtnStyle={addToWishlistBtn(wishedItem._id, user)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default WishList
