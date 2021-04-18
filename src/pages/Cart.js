import "./styles/Cart.css";
import { useApp } from "../contexts/AppContext";
import CartProductCard from "../components/CartProductCard";

const Cart = () => {
    const { app, dispatch } = useApp();

    const cartPrices = app.cart.map(item => parseInt(item.price) * item.quantity)
    const cartTotal = cartPrices.reduce((curr, acc) => curr + acc, 0)
    return (
        <div className="cart">
            <div className="cartProducts">
                {app.cart.map((item) => (
                    <CartProductCard
                        img={item.image}
                        name={item.name}
                        productBrand={item.brand}
                        price={item.price}
                        disableDecBtn={item.quantity === 1 ? true : ""}
                        decrementFunc={() => dispatch({ TYPE: "decrement", PAYLOAD: item })}
                        quantity={item.quantity}
                        incrementFunc={() => dispatch({ TYPE: "increment", PAYLOAD: item })}
                        removeFunc={() => dispatch({ TYPE: "remove", PAYLOAD: item })}
                        toWishListFunc={() => dispatch({ TYPE: "AddToWishlist", PAYLOAD: item })}
                        wishListBtnStyle={app.wishList.includes(item) ? "Moved To Wishlist" : "Move To Wishlist"}
                    />
                )
                )}
            </div>
            <div className="cartTotalArea">
                <div className="cartTotal">
                    <h1>Checkout:</h1>
                    <p>Total: Rs. {cartTotal}</p>
                    <button className="btn btnPrimary">Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;