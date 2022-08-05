import React from 'react'
import "./Checkout.css"
import { Link } from 'react-router-dom'

export const Checkout = () => {

  return (
    <div className='checkoutBox'>
      <h2>Your order has been placed.</h2>
      <p>Delivery expected in 5 to 7 days.</p>
      <Link to='/orders'>
        <button className='ordersBtn'>Check Orders</button>
      </Link>
    </div>
  )
}
