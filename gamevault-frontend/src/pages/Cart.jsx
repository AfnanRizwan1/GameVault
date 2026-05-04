import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/ui/Icon';
import './Cart.css';

const GENRE_COLORS = {
  Action:['#ff4757','#c0392b'],RPG:['#9b59b6','#6c3483'],Strategy:['#2980b9','#1a5276'],
  Puzzle:['#f39c12','#d68910'],Horror:['#2c3e50','#34495e'],Adventure:['#27ae60','#1e8449'],
  Shooter:['#e74c3c','#922b21'],Simulation:['#16a085','#0e6655'],Sports:['#f1c40f','#d4ac0d'],Indie:['#8e44ad','#6c3483'],
};

export default function Cart() {
  const { cart, removeFromCart, cartTotal } = useAuth();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-empty">
          <Icon name="shopping_cart" size={60} className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Find something great in our store!</p>
          <Link to="/store" className="btn btn-primary">Browse Games</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart <span className="cart-count">({cart.length})</span></h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(game => {
            const colors = GENRE_COLORS[game.genre] || ['#4da6ff','#1a6dcc'];
            return (
              <div key={game.id} className="cart-item panel">
                <div className="cart-item-cover" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
                  <span className="cart-cover-initial">{game.genre[0]}</span>
                </div>
                <div className="cart-item-info">
                  <Link to={`/game/${game.id}`} className="cart-item-title">{game.title}</Link>
                  <div className="cart-item-meta">
                    <span className="tag">{game.genre}</span>
                    <span className="text-muted text-sm">by {game.developer}</span>
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">
                    {game.price === 0 ? 'FREE' : `$${game.price.toFixed(2)}`}
                  </span>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(game.id)}
                    title="Remove"
                  >
                    <Icon name="delete" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary panel">
          <h2>Order Summary</h2>
          <div className="summary-lines">
            {cart.map(g => (
              <div key={g.id} className="summary-line">
                <span className="summary-game-name">{g.title}</span>
                <span>{g.price === 0 ? 'FREE' : `$${g.price.toFixed(2)}`}</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="summary-total">
              <span>Total</span>
              <span className="summary-total-price">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="btn btn-primary checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <Icon name="arrow_forward" size={16} />
          </button>

          <Link to="/store" className="btn btn-secondary continue-btn">
            <Icon name="sell" size={14} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
