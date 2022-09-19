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
        <h4>Sort by Price</h4>
        <button className={app.sortType && app.sortType === 'low_to_high' ? 'activeCategoryBtn' : 'categoryBtn'} onClick={() => appDispatch({ TYPE: 'low_to_high' })}>Low To High</button>
        <button className={app.sortType && app.sortType === 'high_to_low' ? 'activeCategoryBtn' : 'categoryBtn'} onClick={() => appDispatch({ TYPE: 'high_to_low' })}>High To Low</button>
        <button className={app.sortType && app.sortType === 'relevance' ? 'activeCategoryBtn' : 'categoryBtn'} onClick={() => appDispatch({ TYPE: 'relevance' })}>Relevance</button>
        <h4>Sort by Rating</h4>
        <button className={app.sortTypeRating && app.sortTypeRating === 'low_to_high_rating' ? 'activeCategoryBtn' : 'categoryBtn'} onClick={() => appDispatch({ TYPE: 'low_to_high_rating' })}>Low To High</button>
        <button className={app.sortTypeRating && app.sortTypeRating === 'high_to_low_rating' ? 'activeCategoryBtn' : 'categoryBtn'} onClick={() => appDispatch({ TYPE: 'high_to_low_rating' })}>High To Low</button>
        <button className={app.sortTypeRating && app.sortTypeRating === 'relevance_rating' ? 'activeCategoryBtn' : 'categoryBtn'} onClick={() => appDispatch({ TYPE: 'relevance_rating' })}>Relevance</button>
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
        <h4>Filter by Product</h4>
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
        <h4>Categories</h4>
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
