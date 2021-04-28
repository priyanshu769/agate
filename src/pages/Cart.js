import "./styles/Cart.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import CartProductCard from "../components/CartProductCard";
import { moveToWishlistBtn, showToast, hideToast } from "../functions/functions";
import { ToastSuccess, ToastError } from "../components/Toasts"

const Cart = () => {
    const { app, dispatch } = useApp();
    const { userCredentials } = useAuth()
    const [toast, setToast] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.post(`https://api-agate-v1.priyanshu769.repl.co/users/${userCredentials._id}`, { cart: app.cart })
                if (res.status === 200) {
                    console.log("posted cart")
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
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [app.wishList])

    const removeFromCartDispatch = (product) => {
        dispatch({ TYPE: "remove", PAYLOAD: product })
        setToast({ res: true, updatedArea: "Cart" })
        hideToast(setToast)
    }

    const moveToWishlistDispatch = (product) => {
        dispatch({ TYPE: "AddToWishlist", PAYLOAD: product })
        dispatch({ TYPE: "remove", PAYLOAD: product })
        setToast({ res: true, updatedArea: "Wishlist" })
        hideToast(setToast)
    }

    const cartPrices = app.cart.map(item => parseInt(item.price) * item.quantity)
    const cartTotal = cartPrices.reduce((curr, acc) => curr + acc, 0)
    return (
        <div>
            <div className="toastDisplay">
                {showToast(toast, ToastSuccess, ToastError)}
            </div>
            <div className="cart">
                <div className="cartProducts">
                    {app.cart.map((item) => (
                        <CartProductCard
                            img={item.image}
                            name={item.name}
                            productBrand={item.brand}
                            price={item.price}
                            disableDecBtn={item.quantity === 1 ? true : ""}
                            decrementFunc={() => dispatch({ TYPE: "decrement", PAYLOAD: item })}
                            quantity={item.quantity}
                            incrementFunc={() => dispatch({ TYPE: "increment", PAYLOAD: item })}
                            removeFunc={() => removeFromCartDispatch(item)}
                            toWishListFunc={() => moveToWishlistDispatch(item)}
                            wishListBtnStyle={moveToWishlistBtn(item, app.wishList)}
                        />
                    )
                    )}
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

export default Cart;