import {useAuth} from "../contexts/AuthContext"
import {Route, Navigate} from "react-router-dom"

const PrivateRoute = ({ path, ...props }) => {
    const {isUserLoggedin} = useAuth()
    return isUserLoggedin ?( <Route {...props} path={path} /> ): (<Navigate state={{from : path}} replace to="/login" />)
  }

  export default PrivateRoute;