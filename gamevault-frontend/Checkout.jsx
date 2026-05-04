import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiCreditCard, FiCheck, FiLock, FiArrowLeft } from 'react-icons/fi';
import './Checkout.css';

const GENRE_COLORS = {
  Action:['#ff4757','#c0392b'],RPG:['#9b59b6','#6c3483'],Strategy:['#2980b9','#1a5276'],
  Puzzle:['#f39c12','#d68910'],Horror:['#2c3e50','#34495e'],Adventure:['#27ae60','#1e8449'],
  Shooter:['#e74c3c','#922b21'],Simulation:['#16a085','#0e6655'],Sports:['#f1c40f','#d4ac0d'],Indie:['#8e44ad','#6c3483'],
};

export default function Checkout() {
  const { cart, cartTotal, purchaseGames, user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=details 2=confirm 3=success
  const [payMethod, setPayMethod] = useState('card');
  const [cardNum, setCardNum] = useState('');
  const [processing, setProcessing] = useState(false);

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <Link to="/store" className="btn btn-primary">Browse Store</Link>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    purchaseGames(cart.map(g => g.id));
    setStep(3);
    setProcessing(false);
  };

  if (step === 3) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon"><FiCheck /></div>
          <h1>Purchase Successful!</h1>
          <p>Your games have been added to your library.</p>
          <div className="success-games">
            {cart.length === 0
              ? <p>Check your library to access your games.</p>
              : null}
          </div>
          <div className="success-actions">
            <Link to="/library" className="btn btn-primary">View Library</Link>
            <Link to="/store" className="btn btn-secondary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <Link to="/cart" className="gd-back"><FiArrowLeft /> Back to Cart</Link>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-layout">
        {/* Form */}
        <div className="checkout-form-area">
          {/* Step 1: Payment Method */}
          <div className="checkout-section panel">
            <h2 className="section-heading"><FiCreditCard /> Payment Method</h2>
            <div className="pay-methods">
              {['card', 'paypal', 'wallet'].map(m => (
                <label key={m} className={`pay-method ${payMethod === m ? 'active' : ''}`}>
                  <input type="radio" name="pay" value={m} checked={payMethod === m} onChange={() => setPayMethod(m)} />
                  <span className="pay-icon">
                    {m === 'card' ? '💳' : m === 'paypal' ? '🅿️' : '👛'}
                  </span>
                  <span>{m === 'card' ? 'Credit/Debit Card' : m === 'paypal' ? 'PayPal' : 'Wallet'}</span>
                </label>
              ))}
            </div>

            {payMethod === 'card' && (
              <div className="card-fields">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    className="form-control"
                    placeholder="4242 4242 4242 4242"
                    value={cardNum}
                    onChange={e => setCardNum(e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19))}
                    maxLength={19}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Expiry</label>
                    <input className="form-control" placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input className="form-control" placeholder="•••" maxLength={4} type="password" />
                  </div>
                </div>
              </div>
            )}

            {payMethod === 'paypal' && (
              <div className="mock-notice">
                <FiLock /> This is a demo. No real PayPal connection.
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="checkout-summary">
          <div className="panel">
            <h2>Order Summary</h2>
            <div className="co-items">
              {cart.map(g => {
                const colors = GENRE_COLORS[g.genre] || ['#4da6ff','#1a6dcc'];
                return (
                  <div key={g.id} className="co-item">
                    <div className="co-item-cover" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
                      {g.genre[0]}
                    </div>
                    <span className="co-item-name">{g.title}</span>
                    <span className="co-item-price">{g.price === 0 ? 'FREE' : `$${g.price.toFixed(2)}`}</span>
                  </div>
                );
              })}
            </div>

            <div className="co-total">
              <span>Total</span>
              <span className="co-total-price">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="mock-notice">
              <FiLock /> Demo mode — no real payment will be charged.
            </div>

            <button
              className="btn btn-primary checkout-confirm-btn"
              onClick={handlePurchase}
              disabled={processing}
            >
              {processing ? (
                <><span className="spinner" /> Processing...</>
              ) : (
                <><FiCheck /> Confirm Purchase — ${cartTotal.toFixed(2)}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
