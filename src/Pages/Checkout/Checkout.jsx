import React from 'react'
import "./Checkout.css"

export const Checkout = () => {
  return (
    <div className='checkoutBox'>
        <h2>Your order has been placed.</h2>
        <p>Delivery expected in 5 to 7 days.</p>
        <button className='ordersBtn'>Check Orders</button>
    </div>
  )
}
