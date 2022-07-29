import React from 'react'
import './ProductCard.css'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'

export const ProductCard = (props) => {
  return (
    <div className="productCard">
      <img
        className="productImg"
        src={props.productImg}
        alt={props.productName}
      />
      <p className="productName">{props.productName}...</p>
      <p>
        <i>Brand Name</i>
      </p>
      <p className="productPrice">$ {props.productPrice}</p>
      <p className="cardBtnContainer">
        <button
          onClick={props.addToCartHandle}
          disabled={props.productCardBtnText === 'Already in Cart'}
          className="addToCartBtn"
        >
          {props.productCardBtnText}
        </button>
        <button onClick={props.addToWishlistHandle} className="addToWishlistBtn">
          {props.wishListBtnStyle ? <BsFillHeartFill /> : <BsHeart />}
        </button>
      </p>
    </div>
  )
}
