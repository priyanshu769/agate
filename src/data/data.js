export const cart = [];

export const wishList = [];

export const wholeInventory = true;

export const fastDeliveryOnly = false;

export const sortType = null;

export const reducer = (state, action) => {
    switch (action.TYPE) {
        case "remove":
            return { ...state, cart: state.cart.filter(item => item._id !== action.PAYLOAD._id) };
        case "decrement":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item._id === action.PAYLOAD._id ?
                        { ...item, quantity: item.quantity - 1 } :
                        item
                )
            }
        case "increment":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item._id === action.PAYLOAD._id ?
                        { ...item, quantity: item.quantity + 1 } :
                        item
                )
            }
        case "AddToWishlist":
            const productInWishList = state.wishList.find(product => product._id === action.PAYLOAD._id)
            if (productInWishList) {
                return { ...state, wishList: state.wishList.filter(wishedItem => wishedItem._id !== action.PAYLOAD._id) }
            } else return { ...state, wishList: state.wishList.concat(action.PAYLOAD) }
        case "AddToCart":
            return { ...state, cart: [...state.cart, { ...action.PAYLOAD, quantity: 1 }] }
        case "ONLY_FAST_DELIVERY":
            return { ...state, fastDeliveryOnly: !state.fastDeliveryOnly }
        case "INCLUDE_OUT_OF_STOCK":
            return { ...state, wholeInventory: !state.wholeInventory }
        case "LOW_TO_HIGH":
            return { ...state, sortType: action.TYPE }
        case "HIGH_TO_LOW":
            return { ...state, sortType: action.TYPE }
        case "LOAD_CART_WISHLIST":
            return { ...state, cart: action.PAYLOAD.cart, wishList: action.PAYLOAD.wishlist }
        default:
            // Do nothing;    
            break;
    }
    return { state }
}
