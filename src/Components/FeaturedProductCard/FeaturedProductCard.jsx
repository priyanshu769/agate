import React from 'react'
import './FeaturedProductCard.css'
import { Link } from 'react-router-dom'

export const FeaturedProductCard = (props) => {
    return (
        <div className="productCard">
            <img
                className="productImg"
                src={props.imgLink}
                alt='Featured Product'
            />
            <Link to='/products'>
                <button className="shopNowBtn">
                    Shop Now
                </button>
            </Link>
        </div>
    )
}
