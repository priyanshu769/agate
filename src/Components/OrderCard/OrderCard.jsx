import React from 'react'
import './OrderCard.css'

export const OrderCard = (props) => {
    return (
        <div className='orderCard'>
            <p className='orderId orderInfo'><span className='orderIdTag'>Order id: </span>{props.orderId}</p>
            <p className='totalProducts orderInfo'><span className='tag'>Number of Products: </span>{props.numberOfProducts}</p>
            <p className='totalQuantity orderInfo'><span className='tag'>Total Quantity: </span>{props.totalQuantity}</p>
        </div>
    )
}
