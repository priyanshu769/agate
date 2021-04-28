import ProductCard from "../components/Productcard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { addToCartBtn, addToWishlistBtn, showToast, hideToast } from "../functions/functions";
import { ToastSuccess, ToastError } from "../components/Toasts"

const WishList = () => {
    const { app, dispatch } = useApp()
    const { userCredentials } = useAuth()
    const [toast, setToast] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.post(`https://api-agate-v1.priyanshu769.repl.co/users/${userCredentials._id}`, { cart: app.cart })
                if (res.status === 200) {
                    console.log("posted cart")
                } else {
                    setToast({ res: false, updatedArea: "Cart" })
                    hideToast(setToast)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [app.cart])

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.post(`https://api-agate-v1.priyanshu769.repl.co/users/${userCredentials._id}`, { wishlist: app.wishList })
                if (res.status === 200) {
                    console.log("posted wishlist")
                } else {
                    setToast({ res: false, updatedArea: "Wishlist" })
                    hideToast(setToast)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [app.wishList])

    const addToCartDispatch = (product) => {
        dispatch({ TYPE: "AddToCart", PAYLOAD: product })
        setToast({ res: true, updatedArea: "Cart" })
        hideToast(setToast)
    }

    const addToWishlistDispatch = (product) => {
        dispatch({ TYPE: "AddToWishlist", PAYLOAD: product })
        setToast({ res: true, updatedArea: "Wishlist" })
        hideToast(setToast)
    }

    return (
        <div>
            <div className="toastDisplay">
                {showToast(toast, ToastSuccess, ToastError)}
            </div>
            <div className="productsList">
                {app.wishList.map(wishedItem => {
                    return (
                        <ProductCard
                            img={wishedItem.image}
                            name={wishedItem.name.slice(0, 35)}
                            extraSection={wishedItem.fastDelivery ? "Fast Delivery Available" : "Fast Delivery Unavailable"}
                            price={wishedItem.price}
                            toCartFunc={() => addToCartDispatch(wishedItem)}
                            addToCartBtnStyle={addToCartBtn(wishedItem, app.cart)}
                            toWishListFunc={() => addToWishlistDispatch(wishedItem)}
                            wishListBtnStyle={addToWishlistBtn(wishedItem, app.wishList)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default WishList;
