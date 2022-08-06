export const InitialApp = {
  cart: null,
  fastDelivery: false,
  wholeInventory: true,
  sortType: 'relevance',
  sortTypeRating: "relevance_rating",
  rating: 1,
}

export const AppReducer = (state, action) => {
  switch (action.TYPE) {
    case 'set_cart':
      return { ...state, cart: action.PAYLOAD }
      case 'set_fastDelivery':
        return {...state, fastDelivery: !state.fastDelivery}
        case 'set_wholeInventory':
        return {...state, wholeInventory: !state.wholeInventory}
        case 'high_to_low':
        return {...state, sortType: action.TYPE}
        case 'low_to_high':
        return {...state, sortType: action.TYPE}
        case 'relevance':
        return {...state, sortType: action.TYPE}
        case 'high_to_low_rating':
        return {...state, sortTypeRating: action.TYPE}
        case 'low_to_high_rating':
        return {...state, sortTypeRating: action.TYPE}
        case 'relevance_rating':
        return {...state, sortTypeRating: action.TYPE}
        case 'set_rating':
        return {...state, rating: action.PAYLOAD}
    default:
      break
  }
  return { state }
}
