import './styles/ProductsList.css'
import ProductCard from '../components/Productcard'
import axios from 'axios'
import { useApp } from '../contexts/AppContext'
import { useAuth } from '../contexts/AuthContext'
import {
  addToCartHandler,
  addToWishlistHandler,
  addToCartBtn,
  addToWishlistBtn,
  showToast,
  hideToast,
} from '../functions/functions'
import { useState, useEffect } from 'react'
import { ToastSuccess, ToastError } from '../components/Toasts'
import { useNavigate } from 'react-router'

const ProductsList = () => {
  const { app, dispatch } = useApp()
  const { loggedInToken, user, setUser } = useAuth()
  const [data, setData] = useState([])
  const [loadingProducts, setLoadingProduct] = useState('loading')
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('https://api-agate.herokuapp.com/products/')
        if (res.status === 200) {
          setLoadingProduct('loaded')
          setData(res.data.products)
        }
      } catch (error) {
        setLoadingProduct('unable to load')
        console.log(error)
      }
    })()
  }, [])

  const inStock = (data, wholeInventory) => {
    if (wholeInventory === false) {
      return data.filter((item) => item.stock === true)
    } else return data
  }

  const fastDelivery = (data, fastDelivery) => {
    if (fastDelivery === true) {
      return data.filter((item) => item.fastDelivery === true)
    } else return data
  }

  const sorted = (data, sortType) => {
    if (sortType && sortType === 'HIGH_TO_LOW') {
      return data.sort((a, b) => b['price'] - a['price'])
    } else if (sortType && sortType === 'LOW_TO_HIGH') {
      return data.sort((a, b) => a['price'] - b['price'])
    } else return data
  }
  const dataToDisplay = sorted(
    inStock(fastDelivery(data, app.fastDeliveryOnly), app.wholeInventory),
    app.sortType,
  )

  return (
    <div>
      <div className="toastDisplay">
        {showToast(toast, ToastSuccess, ToastError)}
      </div>
      <div>
        <h3>Sort & Filter</h3>
        <input
          onChange={() => dispatch({ type: 'LOW_TO_HIGH' })}
          checked={app.sortType && app.sortType === 'LOW_TO_HIGH'}
          type="radio"
        />{' '}
        <label>Low To High</label>
        <input
          onChange={() => dispatch({ type: 'HIGH_TO_LOW' })}
          checked={app.sortType && app.sortType === 'HIGH_TO_LOW'}
          type="radio"
        />{' '}
        <label>High To Low</label>
        <br />
        <input
          onChange={() => dispatch({ type: 'INCLUDE_OUT_OF_STOCK' })}
          checked={app.wholeInventory}
          type="checkbox"
        />{' '}
        <label>Include Out Of Stock</label>
        <input
          onChange={() => dispatch({ type: 'ONLY_FAST_DELIVERY' })}
          checked={app.fastDeliveryOnly}
          type="checkbox"
        />{' '}
        <label>Only Fast Delivery</label>
      </div>
      <div className="productsList">
        {loadingProducts === 'loading'
          ? 'Loading Products...'
          : dataToDisplay?.map((product) => {
              return (
                <ProductCard
                  img={product.image}
                  name={product.name.slice(0, 35)}
                  extraSection={
                    product.fastDelivery
                      ? 'Fast Delivery Available'
                      : 'Fast Delivery Unavailable'
                  }
                  price={product.price}
                  toCartFunc={() =>
                    {addToCartHandler(
                      product._id,
                      loggedInToken,
                      dispatch,
                      navigate,
                      setToast
                    )
                    hideToast(setToast)}
                  }
                  addToCartBtnStyle={addToCartBtn(product._id, app.cart)}
                  toWishListFunc={() =>
                    {addToWishlistHandler(
                      product._id,
                      loggedInToken,
                      setUser,
                      navigate,
                      setToast
                    )
                    hideToast(setToast)}
                  }
                  wishListBtnStyle={addToWishlistBtn(product._id, user)}
                />
              )
            })}
      </div>
    </div>
  )
}

export default ProductsList
