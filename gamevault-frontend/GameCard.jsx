import { Link } from 'react-router-dom';
import { FiShoppingCart, FiCheck, FiStar, FiEye } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './GameCard.css';

const GENRE_COLORS = {
  Action: ['#ff4757', '#c0392b'],
  RPG: ['#9b59b6', '#6c3483'],
  Strategy: ['#2980b9', '#1a5276'],
  Puzzle: ['#f39c12', '#d68910'],
  Horror: ['#2c3e50', '#34495e'],
  Adventure: ['#27ae60', '#1e8449'],
  Shooter: ['#e74c3c', '#922b21'],
  Simulation: ['#16a085', '#0e6655'],
  Sports: ['#f1c40f', '#d4ac0d'],
  Indie: ['#8e44ad', '#6c3483'],
};

function StarRating({ rating }) {
  return (
    <div className="card-stars">
      {[1,2,3,4,5].map(i => (
        <FiStar key={i} className={i <= Math.round(rating) ? 'star filled' : 'star'} />
      ))}
      <span className="card-rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function GameCard({ game, rank }) {
  const { user, addToCart, isInCart, isOwned } = useAuth();
  const colors = GENRE_COLORS[game.genre] || ['#4da6ff', '#1a6dcc'];
  const owned = isOwned(game.id);
  const inCart = isInCart(game.id);

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    addToCart(game);
  };

  return (
    <div className={`game-card ${owned ? 'game-card-owned' : ''}`}>
      {/* Cover area */}
      <Link to={`/game/${game.id}`} className="game-card-cover-link">
        <div className="game-card-cover" style={{
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
        }}>
          {/* Genre icon pattern */}
          <div className="cover-pattern">
            <span className="cover-genre-initial">{game.genre[0]}</span>
          </div>

          {/* Badges */}
          <div className="card-badges">
            {rank && <span className="card-rank">#{rank}</span>}
            {game.isNew && !rank && <span className="card-badge badge-new">NEW</span>}
            {game.isFree && <span className="card-badge badge-free">FREE</span>}
            {owned && <span className="card-badge badge-owned">✓ OWNED</span>}
          </div>

          {/* Hover overlay */}
          <div className="card-hover-overlay">
            <Link to={`/game/${game.id}`} className="btn btn-secondary btn-sm">
              <FiEye size={14} /> Details
            </Link>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="game-card-info">
        <div className="game-card-genre">{game.genre}</div>
        <Link to={`/game/${game.id}`} className="game-card-title">{game.title}</Link>
        <StarRating rating={game.rating} />
        <div className="game-card-meta">
          <div className="game-card-price">
            {game.price === 0 ? (
              <span className="price-free">FREE</span>
            ) : (
              <span className="price-value">${game.price.toFixed(2)}</span>
            )}
          </div>
          <div className="game-card-actions">
            {owned ? (
              <button className="btn-cart btn-cart-owned" disabled>
                <FiCheck size={14} /> Owned
              </button>
            ) : inCart ? (
              <button className="btn-cart btn-cart-in-cart" disabled>
                <FiCheck size={14} /> In Cart
              </button>
            ) : game.price === 0 ? (
              <Link to={`/game/${game.id}`} className="btn-cart btn-cart-free">
                Get Free
              </Link>
            ) : user ? (
              <button className="btn-cart btn-cart-add" onClick={handleCart}>
                <FiShoppingCart size={14} />
              </button>
            ) : (
              <Link to="/login" className="btn-cart btn-cart-add">
                <FiShoppingCart size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
