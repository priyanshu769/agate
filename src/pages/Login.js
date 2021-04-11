import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import FakeAuthApi from "../fake-api/FakeAuthApi"

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const { isUserLoggedin, setLogin } = useAuth()
    const { state } = useLocation()
    const navigate = useNavigate()

    console.log(isUserLoggedin)

    const loginWithCredentials = async (username, password) => {
        try{
            const response = await FakeAuthApi(username, password)
            if (response.success === true) {
                setLogin(true)
            }
        } catch (error) {
            console.log("Wrong Credentials!", error)
        }
            
    }

    const loginHandler = () => {
        loginWithCredentials(username, password)
        navigate(state?.from ? state.from : "/")
    }
    console.log(state)
    return (
        <div>
            {isUserLoggedin ? 
                (<h3>You are logged in!</h3>) : 
            <div><input type="text" onChange={(e) => setUsername(username => e.target.value)} />
            <input type="password" onChange={(e) => setPassword(passowrd => e.target.value)} />
            <button onClick={loginHandler}>{isUserLoggedin ? "Logout" : "Login"}</button></div>}
            
        </div>
    )
}

export default Login;