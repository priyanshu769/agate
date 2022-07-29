export const InitialToast = {
    showToast: false,
    toastMessage: ""
  }
  
  export const ToastReducer = (state, action) => {
    console.log("toast triggered", state)
    switch (action.TYPE) {
      case 'set_Toast':
        return { ...state, showToast: action.PAYLOAD.showToast, toastMessage: action.PAYLOAD.toastMessage }
      default:
        break
    }
    return { state }
  }
  