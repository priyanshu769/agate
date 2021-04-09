import ProductCard from "../components/Productcard";
import { useApp } from "../contexts/AppContext"

const WishList = () => {
    const { app, dispatch } = useApp()
    return (
        <div className="productsList">
            {app.wishList.map(wishedItem => {
                return (
                    <ProductCard
                        img={wishedItem.image}
                        name={wishedItem.name}
                        productBrand={wishedItem.brand}
                        price={wishedItem.price}
                        toCartFunc={() => dispatch({ TYPE: "AddToCart", PAYLOAD: wishedItem })}
                        toWishListFunc={() => dispatch({ TYPE: "AddToWishlist", PAYLOAD: wishedItem })}
                        wishListBtnStyle={app.wishList.includes(wishedItem) ? "Added To Wishlist" : "Add To Wishlist"}
                    />
                )
            })}
        </div>
    )
}

export default WishList;
