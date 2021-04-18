import "./styles/CartProductCard.css"

const CartProductCard = (props) => {
    return (
        <div className="cardHorizotalContainer">
            <div className="cardHorizontal">
                <div className="cardWithBadge cardImgContainer">
                    <img className="cardImg" src={props.img} alt="Product Img" />
                    {/*<span className="dismiss dismissCard">X</span>*/}
                </div>
                <div>
                    <p class="cardDetails">
                        <span className="cardName">{props.name}</span>
                        <br />
                        <span className="cardSectionName">{props.brand}</span>
                        <br />
                        <span className="cardPrice">{props.price}</span>
                    </p>
                    <div class="increaseQuantity">
                        <button disabled={props.disableDecBtn} onClick={props.decrementFunc} className="btnSimple" href="#">-</button>
                        <span className="cardQuantity"> {props.quantity} </span>
                        <button onClick={props.incrementFunc} className="btnSimple" href="#">+</button>
                    </div>
                </div>
            </div>
            <div className="cardHorizontalBtnContainer">
                <button onClick={props.removeFunc} className="btnSimple">Remove</button>
                <button onClick={props.toWishListFunc} className="btnSimple">{props.wishListBtnStyle}</button>
            </div>
        </div>
    )
}

export default CartProductCard;
