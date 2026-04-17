import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../CartSlice';
import Navbar from './Navbar';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (name) => {
    dispatch(removeItem(name));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery 🌿');
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty. Go add some plants! 🌱</p>
            <Link to="/products" className="cart-btn-continue">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-total-header">
              Total Cart Amount: ${totalAmount}
            </div>

            {cartItems.map((item) => (
              <div key={item.name} className="cart-item-card">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-unit-price">Unit price: ${item.price}</p>
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => handleDecrease(item)}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                  </div>
                  <p className="cart-item-total">
                    Total: ${item.price * item.quantity}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.name)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <Link to="/products" className="cart-btn-continue">
                Continue Shopping
              </Link>
              <button className="cart-btn-checkout" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartItem;