import React from 'react'
import './Wishlist.css'
import { ProductCard } from '../../Components'
import { useAuth } from '../../Context/AuthContext'
import { useApp } from '../../Context/AppContext'
import { addToCarBtnStyle, addTocartHandle, addToWishlistHandle } from '../../Utils'
import { useNavigate } from 'react-router'
import { useToast } from '../../Context/ToastContext'

export const Wishlist = () => {
  const { auth, authDispatch } = useAuth()
  const { app, appDispatch } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()
  return (
    <div className="wishlistProductsContainer">
      {auth.user?.wishlist.map((wishedItem) => {
        return (
          <ProductCard
            productImg={wishedItem.image}
            productName={wishedItem.name}
            productPrice={wishedItem.price}
            addToCartHandle={() =>
              addTocartHandle(
                wishedItem._id,
                auth.loggedInToken,
                appDispatch,
                toastDispatch,
                navigate,
              )
            }
            addToWishlistHandle={() =>
              addToWishlistHandle(
                wishedItem._id,
                auth.loggedInToken,
                authDispatch,
                toastDispatch,
                navigate,
              )
            }
            productCardBtnText={addToCarBtnStyle(wishedItem._id, app.cart)}
            wishListBtnStyle={true}
          />
        )
      })}
    </div>
  )
}
