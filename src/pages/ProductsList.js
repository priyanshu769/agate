import "./styles/ProductsList.css";
import ProductCard from "../components/Productcard";
import axios from "axios";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { addToCartBtn, addToWishlistBtn, showToast, hideToast } from "../functions/functions"
import { useState, useEffect } from "react";
import { ToastSuccess, ToastError } from "../components/Toasts"

const ProductsList = () => {
    const { app, dispatch } = useApp()
    const { loggedIn } = useAuth()
    const [data, setData] = useState([])
    const [loadingProducts, setLoadingProduct] = useState("loading")
    const [toast, setToast] = useState(null)
    const { userCredentials, setUserCredentials } = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("https://api-agate-v1.priyanshu769.repl.co/products/")
                if (res.status === 200) {
                    setLoadingProduct("loaded")
                    setData(res.data.products)
                }
            } catch (error) {
                setLoadingProduct("unable to load")
                console.log(error)
            }
        })()
    }, [])

    useEffect(() => {
        if (loggedIn?.isUserLoggedIn) {
            (async () => {
                try {
                    const res = await axios.get("https://api-agate-v1.priyanshu769.repl.co/users")
                    if (res.status === 200) {
                        const user = res.data.users.find(user => loggedIn.userLogged === user.username)
                        setUserCredentials(user)
                        dispatch({ TYPE: "LOAD_CART_WISHLIST", PAYLOAD: user })
                    }
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [loggedIn])

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.post(`http://https://api-agate-v1.priyanshu769.repl.co/users/${userCredentials._id}`, { cart: app.cart })
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

    const inStock = (data, wholeInventory) => {
        if (wholeInventory === false) {
            return data.filter(item => item.stock === true)
        } else return data
    }

    const fastDelivery = (data, fastDelivery) => {
        if (fastDelivery === true) {
            return data.filter(item => item.fastDelivery === true)
        } else return data
    }

    const sorted = (data, sortType) => {
        if (sortType && sortType === "HIGH_TO_LOW") {
            return data.sort((a, b) => b["price"] - a["price"])
        } else if (sortType && sortType === "LOW_TO_HIGH") {
            return data.sort((a, b) => a["price"] - b["price"])
        } else return data;
    }
    const dataToDisplay = sorted(inStock(fastDelivery(data, app.fastDeliveryOnly), app.wholeInventory), app.sortType)

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
            <div>
                <h3>Sort & Filter</h3>

                <input onChange={() => dispatch({ TYPE: "LOW_TO_HIGH" })}
                    checked={app.sortType && app.sortType === "LOW_TO_HIGH"}
                    type="radio" /> <label>Low To High</label>
                <input onChange={() => dispatch({ TYPE: "HIGH_TO_LOW" })}
                    checked={app.sortType && app.sortType === "HIGH_TO_LOW"}
                    type="radio" /> <label>High To Low</label>
                <br />
                <input onChange={() => dispatch({ TYPE: "INCLUDE_OUT_OF_STOCK" })}
                    checked={app.wholeInventory}
                    type="checkbox" /> <label>Include Out Of Stock</label>
                <input onChange={() => dispatch({ TYPE: "ONLY_FAST_DELIVERY" })}
                    checked={app.fastDeliveryOnly}
                    type="checkbox" /> <label>Only Fast Delivery</label>
            </div>
            <div className="productsList">
                {loadingProducts === "loading" ? "Loading Products..." : dataToDisplay.map(product => {
                    return (
                        <ProductCard
                            img={product.image}
                            name={product.name.slice(0, 35)}
                            extraSection={product.fastDelivery ? "Fast Delivery Available" : "Fast Delivery Unavailable"}
                            price={product.price}
                            toCartFunc={() => loggedIn?.isUserLoggedIn ? addToCartDispatch(product) : console.log("login req")}
                            addToCartBtnStyle={addToCartBtn(product, app.cart)}
                            toWishListFunc={() => loggedIn?.isUserLoggedIn ? addToWishlistDispatch(product) : console.log("login req")}
                            wishListBtnStyle={addToWishlistBtn(product, app.wishList)}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default ProductsList;