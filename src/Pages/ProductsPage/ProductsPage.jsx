import React, { useState, useEffect } from 'react'
import './ProductsPage.css'
import { Loading, ProductCard } from '../../Components'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'
import { useApp } from '../../Context/AppContext'
import { useToast } from '../../Context/ToastContext'
import {
  wishListBtnStyle,
  addToCarBtnStyle,
  addTocartHandle,
  addToWishlistHandle,
  onlyFastDelivery,
  excludeOutOfStock,
  sortProducts,
  showToast,
  hideToast,
} from '../../Utils'
import { useNavigate } from 'react-router'
import { AiOutlineBars } from 'react-icons/ai'


export const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const { auth, authDispatch } = useAuth()
  const { app, appDispatch } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()
  const productsToDisplay = sortProducts(
    onlyFastDelivery(
      excludeOutOfStock(products, app.wholeInventory),
      app.fastDelivery,
    ),
    app.sortType,
  )
  useEffect(() => {
    ; (async () => {
      try {
        const serverResponse = await axios.get(
          'https://api-agate.herokuapp.com/products/',
        )
        if (serverResponse.status === 200) {
          setProducts(serverResponse.data.products)
        }
      } catch (error) {
        console.log('Server response failed.', error)
      }
    })()
  }, [])
  return (
    <div>
      <button
        className="sortAndFiltersBtn"
        onClick={() => setShowFilters((showFilters) => !showFilters)}
      >
        <AiOutlineBars />
        Sort/Filters
      </button>
      <div
        style={{ display: showFilters ? 'block' : 'none' }}
        className="sortAndFilters"
      >
        <input
          onChange={() => appDispatch({ TYPE: 'low_to_high' })}
          checked={app.sortType && app.sortType === 'low_to_high'}
          type="radio"
        />
        <label>Low To High</label>
        <input
          onChange={() => appDispatch({ TYPE: 'high_to_low' })}
          checked={app.sortType && app.sortType === 'high_to_low'}
          type="radio"
        />
        <label>High To Low</label>
        <input
          onChange={() => appDispatch({ TYPE: 'relevance' })}
          checked={app.sortType && app.sortType === 'relevance'}
          type="radio"
        />
        <label>Relevance</label>
        <br />
        <input
          onChange={() => appDispatch({ TYPE: 'set_fastDelivery' })}
          checked={app.fastDelivery}
          type="checkbox"
        />
        <label>Fast Delivery Only</label>
        <input
          onChange={() => appDispatch({ TYPE: 'set_wholeInventory' })}
          checked={app.wholeInventory}
          type="checkbox"
        />
        <label>Include Out of Stock</label>
      </div>
      <div className="productsContainer">
        {products.length === 0 ? <Loading /> : productsToDisplay.map((product) => {
          return (
            <ProductCard
              productImg={product.image}
              productName={product.name.slice(0, 17)}
              productPrice={product.price}
              addToCartHandle={() => {
                addTocartHandle(
                  product._id,
                  auth.loggedInToken,
                  appDispatch,
                  toastDispatch,
                  navigate,
                )
              }
              }
              addToWishlistHandle={() => {
                addToWishlistHandle(
                  product._id,
                  auth.loggedInToken,
                  authDispatch,
                  toastDispatch,
                  navigate,
                )
              }
              }
              productCardBtnText={addToCarBtnStyle(product._id, app.cart)}
              wishListBtnStyle={wishListBtnStyle(product._id, auth.user)}
            />
          )
        })}
      </div>
    </div>
  )
}
