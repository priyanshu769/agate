import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import FakeAuthApi from "../fake-api/FakeAuthApi"

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const { isUserLoggedin, setLogin, loading, setLoading } = useAuth()
    const { state } = useLocation()
    const navigate = useNavigate()



    const loginWithCredentials = async (username, password) => {
        setLoading(true)
        try {
            const { success, status } = await FakeAuthApi(username, password)
            if (success === true && status === 200) {
                setLogin(true)
                setLoading(false)
                localStorage.setItem("loggedIn", JSON.stringify({ isUserLoggedin: true }))
            }
        } catch (error) {
            console.log("Wrong Credentials!", error)
            setLoading(false)
        }

    }

    const loginHandler = () => {
        loginWithCredentials(username, password)
        navigate(state?.from ? state.from : "/")
    }

    const logoutHandler = () => {
        localStorage.setItem("loggedIn", JSON.stringify({ isUserLoggedin: false }))
        setLogin(false)
        navigate("/")
    }
    console.log(state)
    return (
        <div>
            {isUserLoggedin ?
                <div>
                    <h3>You are logged in!</h3>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
                :
                <div>
                    <input type="text" onChange={(e) => setUsername(username => e.target.value)} />
                    <input type="password" onChange={(e) => setPassword(passowrd => e.target.value)} />
                    <button onClick={loginHandler}>{loading ? "Logging In..." : "Login"}</button>
                </div>}
        </div>
    )
}

export default Login;