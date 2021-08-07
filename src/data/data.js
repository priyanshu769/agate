export const initialState = {
  cart: [],
  wholeInventory: true,
  fastDeliveryOnly: false,
  sortType: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload }
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] }
    case 'ONLY_FAST_DELIVERY':
      return { ...state, fastDeliveryOnly: !state.fastDeliveryOnly }
    case 'INCLUDE_OUT_OF_STOCK':
      return { ...state, wholeInventory: !state.wholeInventory }
    case 'LOW_TO_HIGH':
      return { ...state, sortType: action.type }
    case 'HIGH_TO_LOW':
      return { ...state, sortType: action.type }
    case 'LOAD_CART_WISHLIST':
      return {
        ...state,
        cart: action.payload.cart,
        wishList: action.payload.wishlist,
      }
    default:
      // Do nothing;
      break
  }
  return { state }
}
