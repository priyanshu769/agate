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
  sortByRating,
  filterByRating,
  filterByCategory
} from '../../Utils'
import { useNavigate } from 'react-router'


export const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])
  const { auth, authDispatch } = useAuth()
  const { app, appDispatch } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()

  const productsToDisplay = sortByRating(sortProducts(
    onlyFastDelivery(
      excludeOutOfStock(filterByRating(filterByCategory(products, activeCategory), app.rating), app.wholeInventory),
      app.fastDelivery,
    ),
    app.sortType,
  ), app.sortTypeRating)

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

  useEffect(() => {
    if (products.length > 0) {
      products.forEach(product => {
        if (!categories.includes(product.category)) {
          setCategories([...categories, product.category])
        }
      })
    }
  }, [products, categories])

  return (
    <div className='sidebarAndMain'>
      <button className='sortAndFiltersBtn' onClick={() => setShowFilters(showFilters => !showFilters)}>Sort n Filters</button>
      <div className={showFilters ? "sidebarMobile" : "sidebar"}>
        <h5>Sort by Price</h5>
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'low_to_high' })}
            checked={app.sortType && app.sortType === 'low_to_high'}
            type="radio"
          />
          Low To High</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'high_to_low' })}
            checked={app.sortType && app.sortType === 'high_to_low'}
            type="radio"
          />
          High To Low</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'relevance' })}
            checked={app.sortType && app.sortType === 'relevance'}
            type="radio"
          />
          Relevance</label>
        <h5>Sort by Rating</h5>
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'low_to_high_rating' })}
            checked={app.sortTypeRating && app.sortTypeRating === 'low_to_high_rating'}
            type="radio"
          />
          Low To High</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'high_to_low_rating' })}
            checked={app.sortTypeRating && app.sortTypeRating === 'high_to_low_rating'}
            type="radio"
          />
          High To Low</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'relevance_rating' })}
            checked={app.sortTypeRating && app.sortTypeRating === 'relevance_rating'}
            type="radio"
          />
          Relevance</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'set_rating', PAYLOAD: 4 })}
            checked={app.rating === 4}
            type="checkbox"
          />
          4 and above</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'set_rating', PAYLOAD: 3 })}
            checked={app.rating === 3}
            type="checkbox"
          />
          3 and above</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'set_rating', PAYLOAD: 2 })}
            checked={app.rating === 2}
            type="checkbox"
          />
          2 and above</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'set_rating', PAYLOAD: 1 })}
            checked={app.rating === 1}
            type="checkbox"
          />
          1 and above</label>
        <br />
        <h5>Filter by Product</h5>
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'set_fastDelivery' })}
            checked={app.fastDelivery}
            type="checkbox"
          />
          Fast Delivery Only</label>
        <br />
        <label className='sortFilterAction'>
          <input
            onChange={() => appDispatch({ TYPE: 'set_wholeInventory' })}
            checked={app.wholeInventory}
            type="checkbox"
          />
          Include Out of Stock</label>
        <h5>Categories</h5>
        {categories.map(category => {
          return (<button className={activeCategory === category ? 'activeCategoryBtn' : 'categoryBtn'} onClick={() => { setActiveCategory(category) }}>{category}</button>)
        })}
      </div>
      {products.length === 0 && <Loading />}
      <div className="productsContainer">
        {products.length > 0 && productsToDisplay.map((product) => {
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
              productCardBtnText={addToCarBtnStyle(product._id, product.stock, app.cart)}
              wishListBtnStyle={wishListBtnStyle(product._id, auth.user)}
            />
          )
        })}
      </div>
    </div>
  )
}
