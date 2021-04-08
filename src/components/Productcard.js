import "./ProductCard.css"

const ProductCard = (props) => {
    return (
        <div className="card">
            <div className="cardWithBadge">
                <img className="cardImg" src="https://source.unsplash.com/random" alt="Product Img" />
            </div>
            <p className="cardDetails">
                <span className="cardName">Product Name</span>
                <br />
                <span className="cardSectionName">Product Category</span>
                <br />
                <span className="cardPrice">Rs. 4564</span>
            </p>
            <div className="cartOrWishlist">
                <button className="btn btnPrimary" href="#">Add to Cart</button>
                <button className="btn btnSecondary" href="#">Add to Wishlist</button>
            </div>
        </div>
    )
}

export default ProductCard;

// <div className="card">
//             <div className="cardWithBadge">
//                 <img className="cardImg" src={props.img} alt="Product Img" />
//             </div>
//             <p className="cardDetails">
//                 <span className="cardName">{props.name}</span>
//                 <br />
//                 <span className="cardSectionName">{props.sectionName}</span>
//                 <br />
//                 <span className="cardPrice">{props.price}</span>
//             </p>
//             <div className="cartOrWishlist">
//                 <button className="btn btnPrimary" href="#">Add to Cart</button>
//                 <button className="btn btnSecondary" href="#">Add to Wishlist</button>
//             </div>
//         </div>