import React from 'react'
import './CartProductCard.css'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'

export const CartProductCard = (props) => {
  return (
    <div className="cartProductCard">
      <div className="cartProductImgContainer">
        <img
          className="productImg"
          src={props.productImg}
          alt={props.productName}
        />
      </div>
      <div className="cartProductDetails">
        <p className="cartProductName">{props.productName}</p>
        <p className="cartProductPrice">$ {props.productPrice}</p>
        <p className="cardBtnContainer">
          <span>
            <button disabled={props.disableDecBtn} onClick={props.decrementFunc} className="btnPlusMinus" href="#">-</button>
            <span className="cardQuantity"> {props.quantity} </span>
            <button onClick={props.incrementFunc} className="btnPlusMinus" href="#">+</button>
          </span>
          <button onClick={props.removeFromCartHandle} className="removeBtn">Remove</button>
          <button onClick={props.addToWishlistHandle} className="addToWishlistBtn">
            {props.wishListBtnStyle ? <BsFillHeartFill /> : <BsHeart />}
          </button>
        </p>
      </div>
    </div>
  )
}
