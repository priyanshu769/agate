import "./Cart.css";
import ProductCard from "../components/Productcard";

const Cart = () => {
    return (
        <div className="cart">
            <div className="productsList">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <div className="cartTotalArea">
                <div className="cartTotal">
                    <h1>Checkout:</h1>
                    <p>Total: Rs. 3778</p>
                    <button className="btn btnPrimary">Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;