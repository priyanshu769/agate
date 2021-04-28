import "./styles/Login.css"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [wrongCredentials, setWrongCredentials] = useState("")
    const { loggedIn, setLoggedIn, loading, setLoading } = useAuth()
    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        setWrongCredentials("")
    }, [])

    const loginWithCredentials = async (username, password) => {
        setLoading(true)
        try {
            const res = await axios.get("http://localhost:8000/users/")
            console.log(res.status, res.data.users)
            if (res.status === 200) {
                const user = res.data.users.find(user => username === user.username)
                console.log(user)
                if (user) {
                    if (user.password === password) {
                        setLoggedIn({ isUserLoggedIn: true, userLogged: username })
                        setLoading(false)
                        localStorage.setItem("loggedIn", JSON.stringify({ isUserLoggedIn: true, userLogged: username }))
                        navigate(state?.from ? state.from : "/")
                    } else {
                        setLoading(false)
                        setWrongCredentials("Wrong Password!");
                    }
                } else { setWrongCredentials("User Not Found!") }
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
        localStorage.setItem("loggedIn", JSON.stringify({ isUserLoggedIn: false, userLogged: "" }))
        setLoggedIn({ isUserLoggedIn: false, userLogged: "" })
        navigate("/")
    }
    return (
        <div className="loginArea">
            {loggedIn?.isUserLoggedIn ?
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
                        <small>{wrongCredentials === "User Not Found!" && wrongCredentials}</small>
                        <br />
                        <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(passowrd => e.target.value)} />
                        <br />
                        <small>{wrongCredentials === "Wrong Password!" && wrongCredentials}</small>
                        <br />
                        <button type="submit" className="btn btnPrimary" onClick={loginHandler}>{loading ? "Logging In..." : "Login"}</button>
                    </form>
                </div>}
        </div>
    )
}

export default Login;