import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="navbar-logo">🌿</div>
        <div className="navbar-brand-text">
          <h2>Paradise Nursery</h2>
          <p>Where Green Meets Serenity</p>
        </div>
      </Link>

      <span className="navbar-center">Plants</span>

      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Plants</Link>
        <Link to="/cart" className="cart-icon-btn">
          🛒 <span className="cart-count-badge">{totalCount}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;