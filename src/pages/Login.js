import "./styles/Login.css"
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
                navigate(state?.from ? state.from : "/")
            }
        } catch (error) {
            console.log("Wrong Credentials!", error)
            setLoading(false)
        }

    }

    const loginHandler = (e) => {
        e.preventDefault()
        loginWithCredentials(username, password)
    }

    const logoutHandler = () => {
        localStorage.setItem("loggedIn", JSON.stringify({ isUserLoggedin: false }))
        setLogin(false)
        navigate("/")
    }
    return (
        <div className="loginArea">
            {isUserLoggedin ?
                <div>
                    <h3>You are logged in!</h3>
                    <button className="btn btnSecondary" onClick={logoutHandler}>Logout</button>
                </div>
                :
                <div>
                    <h2>Login</h2>
                    <form>
                        <input className="input" type="text" placeholder="Username" onChange={(e) => setUsername(username => e.target.value)} />
                        <br />
                        <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(passowrd => e.target.value)} />
                        <br />
                        <button type="submit" className="btn btnPrimary" onClick={loginHandler}>{loading ? "Logging In..." : "Login"}</button>
                    </form>
                </div>}
        </div>
    )
}

export default Login;