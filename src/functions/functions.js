import axios from "axios";

export const addToCart = async (product, userCredentials, dispatch) => {
    try {
        const users = await axios.get("http://localhost:8000/users/")
        const user = users.data.users.find(user => user._id === userCredentials._id)
        const res = await axios.post(`http://localhost:8000/users/${userCredentials._id}`, { cart: [...user.cart, { ...product, quantity: 1 }] })
        console.log(res)
        if (res.status === 200) {
            return dispatch({ TYPE: "AddToCart", PAYLOAD: product })
        }
    } catch (error) {
        console.log(error)
    }
}

export const addToWishList = async (product, userCredentials, dispatch) => {
    try {
        const users = await axios.get("http://localhost:8000/users/")
        const user = users.data.users.find(user => user._id === userCredentials._id)
        const productInWishlist = user.wishlist.find(item => product._id === item._id)
        if (!productInWishlist) {
            const res = await axios.post(`http://localhost:8000/users/${userCredentials._id}`, { wishlist: [...user.wishlist, product] })
            console.log(res)
            if (res.status === 200) {
                return dispatch({ TYPE: "AddToWishlist", PAYLOAD: product })
            }
        } else {
            const res = await axios.post(`http://localhost:8000/users/${userCredentials._id}`, { wishlist: user.wishlist.filter(wishedItem => wishedItem._id !== product._id) })
            console.log(res)
            if (res.status === 200) {
                return dispatch({ TYPE: "AddToWishlist", PAYLOAD: product })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// Buttons

export const addToCartBtn = (product, cart) => {
    const productInCart = cart.find(item => item._id === product._id)
    if (productInCart) {
        return "Already in Cart"
    } else return "Add To Cart"
}

export const addToWishlistBtn = (product, wishlist) => {
    const productInWishlist = wishlist.find(item => item._id === product._id)
    if (productInWishlist) {
        return "red"

    } else return "white"
}

export const moveToWishlistBtn = (product, wishlist) => {
    const productInWishlist = wishlist.find(item => item._id === product._id)
    if (productInWishlist) {
        return "Moved to WishList"

    } else return "Move to Wishlist"
}

export const showToast = (showToast, ToastSuccess, ToastError) => {
    if (showToast === null) {
        return ""
    } else if (showToast) {
        if (showToast.res === true) {
            return <ToastSuccess updatedArea={showToast.updatedArea} />
        } else if (showToast.res === false) {
             return <ToastError updatedArea={showToast.updatedArea} />
         }
    }
}

export const hideToast = (setToast) => setTimeout(()=> setToast(null), 3000);