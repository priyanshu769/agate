import faker from "faker";

faker.seed(123);

export const products = [...Array(50)].map((item) => ({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    image: faker.random.image(),
    price: faker.commerce.price(),
    material: faker.commerce.productMaterial(),
    brand: faker.lorem.word(),
    inStock: faker.random.boolean(),
    fastDelivery: faker.random.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    offer: faker.random.arrayElement([
        "Save 50",
        "70% bonanza",
        "Republic Day Sale"
    ]),
    idealFor: faker.random.arrayElement([
        "Men",
        "Women",
        "Girl",
        "Boy",
        "Senior"
    ]),
    level: faker.random.arrayElement([
        "beginner",
        "amateur",
        "intermediate",
        "advanced",
        "professional"
    ]),
    color: faker.commerce.color()
}));

export const cart = [];

export const wishList = [];

export const wholeInventory = true;

export const fastDeliveryOnly = false;

export const sortType = null;

export const reducer = (state, action) => {
    switch (action.TYPE) {
        case "remove":
            return { ...state, cart: state.cart.filter(item => item.id !== action.PAYLOAD.id) };
        case "decrement":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.PAYLOAD.id ?
                        { ...item, quantity: item.quantity - 1 } :
                        item
                )
            }
        case "increment":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.PAYLOAD.id ?
                        { ...item, quantity: item.quantity + 1 } :
                        item
                )
            }
        case "AddToWishlist":
            if (state.wishList.includes(action.PAYLOAD)) {
                return { ...state, wishList: state.wishList.filter(wishedItem => wishedItem.id !== action.PAYLOAD.id) }
            } else return { ...state, wishList: state.wishList.concat(action.PAYLOAD) };
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
        default:
            // Do nothing;    
            break;
    }
    return { state }
}
