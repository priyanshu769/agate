import "./styles/ProductsList.css";
import ProductCard from "../components/Productcard";
import { useApp } from "../contexts/AppContext";

const ProductsList = () => {
    const { app, dispatch } = useApp()

    const inStock = (data, wholeInventory) => {
        if (wholeInventory === false) {
            return data.filter(item => item.inStock === true)
        } else return data
    }

    const fastDelivery = (data, fastDelivery) => {
        if (fastDelivery === true) {
            return data.filter(item => item.fastDelivery === true)
        } else return data
    }

    const sorted = (data, sortType) => {
        if (sortType && sortType === "HIGH_TO_LOW") {
            return data.sort((a, b) => b["price"] - a["price"])
        } else if (sortType && sortType === "LOW_TO_HIGH") {
            return data.sort((a, b) => a["price"] - b["price"])
        } else return data;
    }
    const dataToDisplay = sorted(inStock(fastDelivery(app.products, app.fastDeliveryOnly), app.wholeInventory), app.sortType)

    return (
        <div>
            <div>
                <h3>Sort & Filter</h3>

                <input onClick={() => dispatch({ TYPE: "LOW_TO_HIGH" })}
                    checked={app.sortType && app.sortType === "LOW_TO_HIGH"}
                    type="radio" /> <label>Low To High</label>
                <input onClick={() => dispatch({ TYPE: "HIGH_TO_LOW" })}
                    checked={app.sortType && app.sortType === "HIGH_TO_LOW"}
                    type="radio" /> <label>High To Low</label>
                <br />
                <input onClick={() => dispatch({ TYPE: "INCLUDE_OUT_OF_STOCK" })}
                    checked={app.wholeInventory}
                    type="checkbox" /> <label>Include Out Of Stock</label>
                <input onClick={() => dispatch({ TYPE: "ONLY_FAST_DELIVERY" })}
                    checked={app.fastDeliveryOnly}
                    type="checkbox" /> <label>Only Fast Delivery</label>
            </div>
            <div className="productsList">
                {dataToDisplay.map(product => {
                    return (
                        <ProductCard
                            img={product.image}
                            name={product.name}
                            productBrand={product.brand}
                            price={product.price}
                            toCartFunc={() => dispatch({ TYPE: "AddToCart", PAYLOAD: product })}
                            addToCartBtnStyle={app.cart.includes(product) ? "Already in Cart" : "Add To Cart"}
                            toWishListFunc={() => dispatch({ TYPE: "AddToWishlist", PAYLOAD: product })}
                            wishListBtnStyle={app.wishList.includes(product) ? "Added To Wishlist" : "Add To Wishlist"}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ProductsList;