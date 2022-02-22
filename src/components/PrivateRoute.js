// import {useAuth} from "../contexts/AuthContext"
import {Route, Navigate} from "react-router-dom"

const PrivateRoute = ({ path, login, ...props }) => {
    // const {loggedIn} = useAuth()
    return login ?( <Route {...props} path={path} /> ): (<Navigate state={{from : path}} replace to="/login" />)
  }

  export default PrivateRoute;