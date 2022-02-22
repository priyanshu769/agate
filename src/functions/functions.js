import axios from 'axios'

export const addToCartHandler = async (
  productId,
  loggedInToken,
  dispatch,
  navigate,
  setToast,
) => {
  try {
    if (loggedInToken) {
      const { data } = await axios.post(
        `https://api-agate.herokuapp.com/cart/${productId}/add`,
        {},
        { headers: { Authorization: loggedInToken } },
      )
      if (data.success) {
        loadCart(loggedInToken, dispatch)
        setToast({ res: true,  updatedArea: "Cart" })
      } else setToast({ res: false,  updatedArea: "Cart" })
    } else navigate('/login')
  } catch (error) {
    console.log(error)
  }
}

export const addToWishlistHandler = async (
  productId,
  loggedInToken,
  setUser,
  navigate,
  setToast,
) => {
  try {
    if (loggedInToken) {
      const { data } = await axios.post(
        `https://api-agate.herokuapp.com/user/wishlistProduct`,
        { productId: productId },
        { headers: { Authorization: loggedInToken } },
      )
      if (data.success) {
        loadUser(loggedInToken, setUser)
        setToast({ res: true,  updatedArea: "Wishlist" })
      } else setToast({ res: false,  updatedArea: "Wishlist" })
    } else navigate('/login')
  } catch (error) {
    console.log(error)
  }
}
export const removeFromCartHandler = async (
  cartProductId,
  loggedInToken,
  dispatch,
  setToast
) => {
  try {
    const { data } = await axios.post(
      `https://api-agate.herokuapp.com/cart/${cartProductId}/remove`,
      {},
      { headers: { Authorization: loggedInToken } },
    )
    if (data.success) {
      loadCart(loggedInToken, dispatch)
      setToast({ res: true,  updatedArea: "Cart" })
    } else setToast({ res: false,  updatedArea: "Cart" })
  } catch (error) {
    console.log(error)
  }
}

export const loadUser = async (loggedInToken, setUser) => {
  try {
    const { data } = await axios.get(`https://api-agate.herokuapp.com/user`, {
      headers: { Authorization: loggedInToken },
    })
    if (data.success) {
      setUser(data.user)
    }
  } catch (error) {
    console.log(error)
  }
}

export const loadCart = async (loggedInToken, dispatch) => {
  try {
    const cart = await axios.get('https://api-agate.herokuapp.com/cart/', {
      headers: { Authorization: loggedInToken },
    })
    console.log(cart, 'load cart')
    if (cart.data.success) {
      dispatch({ type: 'SET_CART', payload: cart.data.cartProducts })
    }
  } catch (error) {
    console.log(error)
  }
}

export const incrementHandler = async (
  cartProductId,
  loggedInToken,
  dispatch,
) => {
  try {
    const { data } = await axios.post(
      `https://api-agate.herokuapp.com/cart/${cartProductId}/increment`,
      {},
      { headers: { Authorization: loggedInToken } },
    )
    console.log(data, 'increment')
    if (data.success) {
      loadCart(loggedInToken, dispatch)
    }
  } catch (error) {
    console.log(error)
  }
}

export const decrementHandler = async (
  cartProductId,
  loggedInToken,
  dispatch,
) => {
  try {
    const { data } = await axios.post(
      `https://api-agate.herokuapp.com/cart/${cartProductId}/decrement`,
      {},
      { headers: { Authorization: loggedInToken } },
    )
    console.log(data, 'decrement')
    if (data.success) {
      loadCart(loggedInToken, dispatch)
    }
  } catch (error) {
    console.log(error)
  }
}

// Buttons

export const addToCartBtn = (productId, cart) => {
  const productInCart = cart.find((item) => item.product._id === productId)
  if (productInCart) {
    return 'Already in Cart'
  } else return 'Add To Cart'
}

export const addToWishlistBtn = (productId, user) => {
  const productInWishlist = user?.wishlist.find(
    (item) => item._id === productId,
  )
  if (productInWishlist) {
    return 'red'
  } else return 'white'
}

export const moveToWishlistBtn = (productId, wishlist) => {
  const productInWishlist = wishlist.find((item) => item._id === productId)
  if (productInWishlist) {
    return 'Already in WishList'
  } else return 'Move to Wishlist'
}

export const showToast = (showToast, ToastSuccess, ToastError) => {
  if (showToast === null) {
    return ''
  } else if (showToast) {
    if (showToast.res === true) {
      return <ToastSuccess updatedArea={showToast.updatedArea} />
    } else if (showToast.res === false) {
      return <ToastError updatedArea={showToast.updatedArea} />
    }
  }
}

export const hideToast = (setToast) => setTimeout(() => setToast(null), 3000)
