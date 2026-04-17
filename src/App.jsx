import { Routes, Route, Link } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        {/* Left side: Company name + CTA */}
        <div className="landing-left">
          <h1>Welcome To<br />Paradise Nursery</h1>
          <p className="tagline">Where Green Meets Serenity</p>
          <div className="divider"></div>
          <Link to="/products" className="get-started-btn">
            Get Started
          </Link>
        </div>

        {/* Right side: AboutUs component */}
        <AboutUs />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
}

export default App;