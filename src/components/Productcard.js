import "./ProductCard.css"

const ProductCard = (props) => {
    return (
        <div className="card">
            <div className="cardWithBadge">
                <img className="cardImg" src={props.img} alt="Product Img" />
            </div>
            <p className="cardDetails">
                <span className="cardName">{props.name}</span>
                <br />
                <span className="cardSectionName">{props.productBrand}</span>
                <br />
                <span className="cardPrice">{props.price}</span>
            </p>
            <div className="cartOrWishlist">
                <button onClick={props.toCartFunc} className="btn btnPrimary" href="#">Add To Cart</button>
                <button onClick={props.toWishListFunc} className="btn btnSecondary" href="#">{props.wishListBtnStyle}</button>
            </div>
        </div>
    )
}

export default ProductCard;
