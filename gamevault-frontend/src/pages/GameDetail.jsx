import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { mockGames, mockReviews } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/ui/Icon';
import './GameDetail.css';

const GENRE_COLORS = {
  Action: ['#ff4757','#c0392b'], RPG: ['#9b59b6','#6c3483'],
  Strategy: ['#2980b9','#1a5276'], Puzzle: ['#f39c12','#d68910'],
  Horror: ['#2c3e50','#34495e'], Adventure: ['#27ae60','#1e8449'],
  Shooter: ['#e74c3c','#922b21'], Simulation: ['#16a085','#0e6655'],
  Sports: ['#f1c40f','#d4ac0d'], Indie: ['#8e44ad','#6c3483'],
};

function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-input">
      {[1,2,3,4,5].map(i => (
        <button
          key={i} type="button"
          className={`star-btn ${i <= (hover || value) ? 'active' : ''}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
        ><Icon name="star" size={22} /></button>
      ))}
    </div>
  );
}

export default function GameDetail() {
  const { id } = useParams();
  const game = mockGames.find(g => g.id === parseInt(id));
  const { user, addToCart, isInCart, isOwned } = useAuth();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [localReviews, setLocalReviews] = useState(mockReviews.filter(r => r.gameId === parseInt(id)));

  if (!game) {
    return (
      <div className="gd-not-found">
        <h2>Game not found</h2>
        <Link to="/store" className="btn btn-primary"><Icon name="arrow_back" size={16} /> Back to Store</Link>
      </div>
    );
  }

  const colors = GENRE_COLORS[game.genre] || ['#4da6ff','#1a6dcc'];
  const owned = isOwned(game.id);
  const inCart = isInCart(game.id);
  const avgRating = localReviews.length > 0
    ? (localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length).toFixed(1)
    : game.rating.toFixed(1);

  const handleAddToCart = () => { if (user) addToCart(game); };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user || !reviewText.trim()) return;
    const newReview = {
      id: Date.now(), gameId: game.id, userId: user.id, userName: user.name,
      rating: reviewRating, text: reviewText, date: new Date().toISOString().split('T')[0], helpful: 0
    };
    setLocalReviews(r => [newReview, ...r]);
    setReviewText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="game-detail-page">
      {/* Hero Banner */}
      <div className="gd-hero" style={{ background: `linear-gradient(135deg, ${colors[0]}22, ${colors[1]}11, transparent)` }}>
        <div className="gd-hero-art" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
          {game.image ? <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} /> : <span className="gd-hero-initial">{game.genre[0]}</span>}
        </div>
        <div className="gd-hero-bg" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }} />
        <div className="gd-hero-content">
          <Link to="/store" className="gd-back"><Icon name="arrow_back" size={16} /> Back to Store</Link>
          <div className="gd-hero-info">
            <div className="gd-cover" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
              {game.image ? <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span className="gd-cover-initial">{game.genre[0]}</span>}
            </div>
            <div className="gd-hero-text">
              <div className="gd-genre-badge" style={{ color: colors[0] }}>{game.genre}</div>
              <h1 className="gd-title">{game.title}</h1>
              <div className="gd-meta">
                <span className="gd-meta-item"><Icon name="person" size={14} /> {game.developer}</span>
                <span className="gd-meta-item"><Icon name="calendar_today" size={14} /> {game.releaseDate}</span>
                <span className="gd-meta-item"><Icon name="star" size={14} style={{ color: '#f0a940' }} /> {avgRating} ({localReviews.length + game.reviews} reviews)</span>
              </div>
              <div className="gd-tags">
                {game.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="gd-body">
        <div className="gd-main">
          {/* Screenshots */}
          <div className="gd-section panel">
            <h3>About This Game</h3>
            <p className="gd-description">{game.description}</p>
            <div className="gd-screenshots">
              {[1,2,3].map(n => (
                <div key={n} className="gd-screenshot" style={{ background: `linear-gradient(${n * 45}deg, ${colors[0]}44, ${colors[1]}33)` }}>
                  <span style={{ fontFamily: 'Orbitron', fontSize: '1.5rem', color: 'rgba(255,255,255,0.15)', fontWeight: 900 }}>
                    SS{n}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="gd-section panel">
            <h3>User Reviews <span className="review-count">({localReviews.length + game.reviews})</span></h3>
            
            {user && owned && !submitted && (
              <form className="review-form" onSubmit={handleReviewSubmit}>
                <div className="review-form-header">
                  <div className="user-avatar-sm">{user.name[0]}</div>
                  <span>{user.name}</span>
                </div>
                <StarInput value={reviewRating} onChange={setReviewRating} />
                <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Share your experience with this game..."
                  rows={3}
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
              </form>
            )}
            {submitted && (
              <div className="review-success"><Icon name="check" size={16} /> Review submitted! Thank you.</div>
            )}
            {user && !owned && (
              <p className="review-note">Purchase this game to leave a review.</p>
            )}

            <div className="reviews-list">
              {localReviews.slice(0, 5).map(r => (
                <div key={r.id} className="review-card">
                  <div className="review-head">
                    <div className="reviewer-avatar">{r.userName[0]}</div>
                    <div>
                      <div className="reviewer-name">{r.userName}</div>
                      <div className="review-date">{r.date}</div>
                    </div>
                    <div className="review-stars">
                      {[1,2,3,4,5].map(i => (
                        <Icon key={i} name="star" size={14} style={{ color: i <= r.rating ? 'var(--gold)' : 'var(--text-muted)', opacity: i <= r.rating ? 1 : 0.3 }} />
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{r.text}</p>
                </div>
              ))}
              {localReviews.length === 0 && (
                <p className="no-reviews">No reviews yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="gd-sidebar">
          <div className="gd-buy-card panel">
            <div className="gd-price-display">
              {game.price === 0
                ? <span className="price-free-lg">FREE TO PLAY</span>
                : <span className="gd-price">${game.price.toFixed(2)}</span>
              }
            </div>
            
            <div className="gd-actions">
              {owned ? (
                <button className="btn btn-success w-full" disabled>
                  <Icon name="check" size={18} /> Already Owned
                </button>
              ) : inCart ? (
                <Link to="/cart" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  <Icon name="shopping_cart" size={18} /> View in Cart
                </Link>
              ) : game.price === 0 ? (
                <button className="btn btn-success w-full" onClick={handleAddToCart} disabled={!user}>
                  <Icon name="download" size={18} /> Get Free
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary w-full"
                    onClick={handleAddToCart}
                    disabled={!user}
                  >
                    <Icon name="shopping_cart" size={18} /> Add to Cart
                  </button>
                  {!user && (
                    <Link to="/login" className="btn btn-secondary w-full" style={{ justifyContent: 'center', fontSize: 13 }}>
                      Sign in to purchase
                    </Link>
                  )}
                </>
              )}
            </div>

            <div className="gd-details-list">
              <div className="gd-detail-row">
                <span><Icon name="sell" size={14} /> Genre</span>
                <strong>{game.genre}</strong>
              </div>
              <div className="gd-detail-row">
                <span><Icon name="person" size={14} /> Developer</span>
                <strong>{game.developer}</strong>
              </div>
              <div className="gd-detail-row">
                <span><Icon name="calendar_today" size={14} /> Released</span>
                <strong>{game.releaseDate}</strong>
              </div>
              <div className="gd-detail-row">
                <span><Icon name="star" size={14} /> Rating</span>
                <strong>{avgRating} / 5</strong>
              </div>
              <div className="gd-detail-row">
                <span>Downloads</span>
                <strong>{game.downloads.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
