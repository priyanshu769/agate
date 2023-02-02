import React, { useEffect, useState } from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import Bike from '../../Assets/Images/racingBike.webp'
import { FeaturedProductCard, Loading } from '../../Components'
import axios from 'axios'

export const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    ; (async () => {
      try {
        const serverResponse = await axios.get(
          'https://api-agate-production.up.railway.app/products/',
        )
        if (serverResponse.status === 200) {
          const shuffledProducts = serverResponse.data.products.sort(()=> 0.5 - Math.random())
          setFeaturedProducts(shuffledProducts.slice(0, 10))
        }
      } catch (error) {
        console.log('Server response failed.', error)
      }
    })()
  }, [])

  return (
    <div>
      <img className='heroImg' src={Bike} alt='Bike' />
      <p className='heroText'>Buy gears and exclude fear from your ride.</p>
      <Link to='/products'><button className='exploreBtn'>Explore</button></Link>
      <h2 className='featuredProductsHead'>Featured products</h2>
      <div className='faeturedProductsContainer'>
      {featuredProducts.length===0 && <Loading />}
      {featuredProducts.map(product => {
        return <FeaturedProductCard imgLink={product.image} />
      })}
      </div>
    </div>
  )
}
