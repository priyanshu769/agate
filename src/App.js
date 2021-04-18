import './App.css';
import { Routes, Route, Link } from "react-router-dom"
import ProductsList from "./pages/ProductsList"
import WishList from "./pages/WishList"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"
import { useAuth } from "./contexts/AuthContext"

function App() {
  const { isUserLoggedin } = useAuth()
  return (
    <div className="App">
      <nav className="navbar">
        <ul className="navPills listStyleNone listInline">
          <li className="navPill listInline"><Link className="link" activeClassName="selectedNavPill" to="/">Home</Link></li>
          <li className="navPill listInline"><Link className="link" activeClassName="selectedNavPill" to="wish-list">WishList</Link></li>
          <li className="navPill listInline"><Link className="link" activeClassName="selectedNavPill" to="cart">Cart</Link></li>
          <li className="navPill listInline"><Link className="link" activeClassName="selectedNavPill" to="login">Login</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/wish-list" element={<WishList />} /> */}
        <PrivateRoute
        login={isUserLoggedin}
        element={<WishList />}
        path="/wish-list"
        />
        {/* <Route path="/cart" element={<Cart />} />*/}
        <PrivateRoute
        login={isUserLoggedin}
        element={<Cart />}
        path="/cart"
        />
      </Routes>
    </div>
  );
}

export default App;
