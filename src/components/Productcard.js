import "./styles/ProductCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const ProductCard = (props) => {
    return (
        <div className="card">
            <div className="cardWithBadge">
                <img className="cardImg" src={props.img} alt="Product Img" />
                <button onClick={props.toWishListFunc} className="btnSimple btnWishList" href="#"><FontAwesomeIcon icon={faHeart} size="2x" color={props.wishListBtnStyle}/></button>
            </div>
            <p className="cardDetails">
                <span className="cardName">{props.name}...</span>
                <br />
                <span className="cardSectionName">{props.extraSection}</span>
                <br />
                <span className="cardPrice">Rs. {props.price}</span>
            </p>
            <div className="cartOrWishlist">
                <button disabled={props.addToCartBtnStyle === "Already in Cart" ? true : ""} onClick={props.toCartFunc} className="btn btnPrimary btnAddToCart" href="#">{props.addToCartBtnStyle}</button>
            </div>
        </div>
    )
}

export default ProductCard;
