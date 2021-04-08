import './App.css';
import { Routes, Route, Link } from "react-router-dom"
import ProductsList from "./pages/ProductsList"
import WishList from "./pages/WishList"
import Cart from "./pages/Cart"

function App() {
  return (
    <div className="App">
    <nav className="navbar">
        <ul className="navPills listStyleNone listInline">
          <li className="navPill"><Link className="link" activeClassName="selectedNavPill" to="/">Home</Link></li>
          <li className="navPill"><Link className="link" activeClassName="selectedNavPill" to="wish-list">WishList</Link></li>
          <li className="navPill"><Link className="link" activeClassName="selectedNavPill" to="cart">Cart</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
