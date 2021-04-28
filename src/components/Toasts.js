import "./styles/Toasts.css"

export const ToastSuccess = (props) => {
    return (
        <div className="toast toastSuccess">
            <p className="toastText">
                <span>{props.updatedArea}</span> updated.
        </p>
        </div>
    )
}

export const ToastError = (props) => {
    return (
        <div className="toast toastError">
            <p className="toastText">
                Unable to update <span>{props.updatedArea}.</span>
            </p>
        </div>
    )
}

// <span><button className="toastButton">x</button></span>