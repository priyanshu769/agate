import axios from 'axios'

export const loginHandler = async (
  loggedInToken,
  email,
  password,
  authDispatch,
  appDispatch,
  setWrongCredentials,
  navigate,
) => {
  if (!loggedInToken) {
    try {
      const loginResponse = await axios.post(
        'https://api-agate.herokuapp.com/login',
        { email: email, password: password },
      )
      console.log(loginResponse)
      if (loginResponse.data.success) {
        localStorage.setItem(
          'loggedInAgate',
          JSON.stringify({ token: loginResponse.data.token }),
        )
        authDispatch({ TYPE: 'set_user', PAYLOAD: loginResponse.data.user })
        authDispatch({
          TYPE: 'set_loggedInToken',
          PAYLOAD: loginResponse.data.token,
        })
        loadCart(loginResponse.data.token, appDispatch)
        navigate('/')
      }
    } catch (error) {
      console.log('Login Failed!', error)
      setWrongCredentials(true)
    }
  }
}

export const signupHandle = async (userToken, name, username, email, password, authDispatch) => {
  try {
    if (!userToken) {
      const signupResponse = await axios.post(
        'https://api-agate.herokuapp.com/signup',
        {
          name: name,
          username: username,
          email: email,
          password: password,
        },
      )
      if (signupResponse.data.success) {
        localStorage.setItem(
          'loggedInAgate',
          JSON.stringify({ token: signupResponse.data.token }),
        )
        authDispatch({ TYPE: 'set_loggedInToken', PAYLOAD: signupResponse.data.token })
        authDispatch({ TYPE: 'set_user', PAYLOAD: signupResponse.data.user })
      }
    } else console.log('User already logged in.')
  } catch (error) {
    console.log('Something went wrong', error)
  }
}

export const loadUser = async (userToken, authDispatch) => {
  try {
    const userResponse = await axios.get(
      'https://api-agate.herokuapp.com/user',
      { headers: { Authorization: userToken } },
    )
    if (userResponse.data.success) {
      authDispatch({ TYPE: 'set_user', PAYLOAD: userResponse.data.user })
    }
  } catch (error) {
    console.log('Error Occured', error)
  }
}
export const loadCart = async (userToken, appDispatch) => {
  try {
    const cartResponse = await axios.get(
      'https://api-agate.herokuapp.com/cart/',
      { headers: { Authorization: userToken } },
    )
    if (cartResponse.data.success) {
      appDispatch({ TYPE: 'set_cart', PAYLOAD: cartResponse.data.cartProducts })
    }
  } catch (error) {
    console.log('Some Error Occured', error)
  }
}

export const addTocartHandle = async (
  productId,
  userToken,
  appDispatch,
  toastDispatch,
  navigate,
) => {
  try {
    if (userToken) {
      showToast(toastDispatch, "Adding Product to Cart")
      const addToCartResponse = await axios.post(
        `https://api-agate.herokuapp.com/cart/${productId}/add`,
        {},
        { headers: { Authorization: userToken } },
      )
      if (addToCartResponse.data.success) {
        loadCart(userToken, appDispatch)
        showToast(toastDispatch, "Product added to Cart")
      } else console.log('Unable to add to Cart.')
    } else navigate('/login')
  } catch (error) {
    console.log('Unable to add to Cart', error)
  }
}

export const removeFromCartHandle = async (
  productId,
  userToken,
  appDispatch,
  toastDispatch,
  navigate,
) => {
  try {
    if (userToken) {
      showToast(toastDispatch, "Removing Product from Cart")
      const removeFromCartResponse = await axios.post(
        `https://api-agate.herokuapp.com/cart/${productId}/remove`,
        {},
        { headers: { Authorization: userToken } },
      )
      if (removeFromCartResponse.data.success) {
        loadCart(userToken, appDispatch)
        showToast(toastDispatch, "Product removed from Cart")
      }
    } else navigate('/login')
  } catch (error) {
    console.log('Some Error Occured', error)
  }
}

export const addToWishlistHandle = async (
  productId,
  userToken,
  authDispatch,
  toastDispatch,
  navigate,
) => {
  if (userToken) {
    showToast(toastDispatch, "Updating Wishlist")
    try {
      const addToWishlistResposne = await axios.post(
        'https://api-agate.herokuapp.com/user/wishlistProduct',
        { productId: productId },
        { headers: { Authorization: userToken } },
      )
      if (addToWishlistResposne.data.success) {
        loadUser(userToken, authDispatch)
        showToast(toastDispatch, "Wishlist Updated")
      } else console.log('Unable to add product to wishlist.')
    } catch (error) {
      console.log(
        'Something went worng while adding product to wishlist.',
        error,
      )
    }
  } else navigate('/login')
}

export const logoutHandle = async (userToken, authDispatch) => {
  if (userToken) {
    localStorage.removeItem('loggedInAgate')
    authDispatch({
      TYPE: 'set_loggedInToken',
      PAYLOAD: null,
    })
    authDispatch({
      TYPE: 'set_user',
      PAYLOAD: null,
    })
  } else console.log('You are not logged in.')
}

// Sort & Filter

export const onlyFastDelivery = (productsList, fastDelivery) => {
  if (fastDelivery) {
    const fastDeliveryProductsList = productsList.filter(product => product.fastDelivery)
    return fastDeliveryProductsList
  } else return productsList
}

export const excludeOutOfStock = (productsList, wholeInventory) => {
  if (!wholeInventory) {
    const excludeOutOfStock = productsList.filter(product => product.stock)
    return excludeOutOfStock
  } else return productsList
}

export const sortProducts = (productsList, sortType) => {
  if (sortType === "low_to_high") {
    const lowToHighProducts = productsList.sort((productA, productB) => productA['price'] - productB['price'])
    return lowToHighProducts
  } else if (sortType === "high_to_low") {
    const highToLowProducts = productsList.sort((productA, productB) => productB['price'] - productA['price'])
    return highToLowProducts
  } else if (sortType === "relevance") {
    return productsList
  }
}

// Buttons

export const wishListBtnStyle = (productId, user) => {
  const productInWishlist = user?.wishlist.find(
    (item) => item._id === productId,
  )
  if (productInWishlist) {
    return true
  } else return false
}

export const addToCarBtnStyle = (productId, cart) => {
  const productInCart = cart?.find((item) => item.product._id === productId)
  if (productInCart) {
    return 'Already in Cart'
  } else return 'Add To Cart'
}

// Cart Item Increment/Decrement

export const incrementHandler = async (
  cartProductId,
  userToken,
  appDispatch,
  toastDispatch,
  navigate,
) => {
  if (userToken) {
    showToast(toastDispatch, "Changing Quantity")
    try {
      const { data } = await axios.post(
        `https://api-agate.herokuapp.com/cart/${cartProductId}/increment`,
        {},
        { headers: { Authorization: userToken } },
      )
      if (data.success) {
        loadCart(userToken, appDispatch)
        showToast(toastDispatch, "Quantity Increased")
      }
    } catch (error) {
      console.log(error)
    }
  } else navigate('/login')
}

export const decrementHandler = async (
  cartProductId,
  userToken,
  appDispatch,
  toastDispatch,
  navigate,
) => {
  if (userToken) {
    showToast(toastDispatch, "Changing Quantity")
    try {
      const { data } = await axios.post(
        `https://api-agate.herokuapp.com/cart/${cartProductId}/decrement`,
        {},
        { headers: { Authorization: userToken } },
      )
      if (data.success) {
        loadCart(userToken, appDispatch)
        showToast(toastDispatch, "Quantity Decreased")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// Checkout

export const checkoutHandler = () => {
  console.log("checkout btn clicked")
}

// Toast

export const showToast = (toastDispatch, toastMessage) => {
  toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: toastMessage } })
}

export const hideToast = (toastDispatch) => {
  toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: false, toastMessage: "" } })
}