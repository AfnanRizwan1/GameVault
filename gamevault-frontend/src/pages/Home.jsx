import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import GameCard from '../components/ui/GameCard';
import { mockGames } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const GENRE_COLORS = {
  Action: ['#ff4757', '#c0392b'], RPG: ['#9b59b6', '#6c3483'],
  Strategy: ['#2980b9', '#1a5276'], Puzzle: ['#f39c12', '#d68910'],
  Horror: ['#2c3e50', '#34495e'], Adventure: ['#27ae60', '#1e8449'],
  Shooter: ['#e74c3c', '#922b21'], Simulation: ['#16a085', '#0e6655'],
  Sports: ['#f1c40f', '#d4ac0d'], Indie: ['#8e44ad', '#6c3483'],
};

const featuredGames = mockGames.filter(g => g.isFeatured);

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const { user, addToCart, isInCart, isOwned } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % featuredGames.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const game = featuredGames[current];
  const colors = GENRE_COLORS[game.genre] || ['#4da6ff', '#1a6dcc'];
  const owned = isOwned(game.id);
  const inCart = isInCart(game.id);

  return (
    <div className="hero-carousel">
      <div className="hero-slide" style={{ background: `linear-gradient(135deg, ${colors[0]}22, ${colors[1]}11, var(--bg))` }}>
        <div className="hero-bg-cover" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }} />

        <div className="hero-content">
          <div className="hero-left">
            {game.isNew && <div className="hero-badge-new"><Icon name="bolt" size={14} /> NEW RELEASE</div>}
            <h1 className="hero-title">{game.title}</h1>
            <div className="hero-meta">
              <span className="tag">{game.genre}</span>
              <div className="hero-rating">
                <Icon name="star" className="star-icon" size={16} />
                {game.rating} ({game.reviews.toLocaleString()} reviews)
              </div>
            </div>
            <p className="hero-desc">{game.description}</p>
            <div className="hero-actions">
              <div className="hero-price">
                {game.price === 0 ? <span className="price-free-lg">FREE TO PLAY</span> : <span className="price-lg">${game.price}</span>}
              </div>
              <div className="hero-btns">
                {owned ? (
                  <Link to="/library" className="btn btn-success btn-lg"><Icon name="check" size={18} /> In Library</Link>
                ) : inCart ? (
                  <Link to="/cart" className="btn btn-primary btn-lg"><Icon name="shopping_cart" size={18} /> View Cart</Link>
                ) : (
                  <button className="btn btn-primary btn-lg" onClick={() => {
                    if (!user) { navigate('/login'); return; }
                    addToCart(game);
                  }}>
                    <Icon name="shopping_cart" size={18} /> {game.price === 0 ? 'Add to Library' : 'Add to Cart'}
                  </button>
                )}
                <Link to={`/game/${game.id}`} className="btn btn-secondary btn-lg">Learn More</Link>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-cover-frame" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
              <span className="hero-cover-initial">{game.genre[0]}</span>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="hero-indicators">
          {featuredGames.map((_, i) => (
            <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, iconName, linkTo, linkText }) {
  return (
    <div className="section-header">
      <h2 className="section-title"><Icon name={iconName} size={22} /> {title}</h2>
      {linkTo && <Link to={linkTo} className="section-more">{linkText} <Icon name="arrow_forward" size={14} /></Link>}
    </div>
  );
}

export default function Home() {
  const newGames = mockGames.filter(g => g.isNew).slice(0, 4);
  const topGames = [...mockGames].sort((a, b) => b.downloads - a.downloads).slice(0, 4);
  const freeGames = mockGames.filter(g => g.isFree).slice(0, 4);

  return (
    <div className="home-page">
      <HeroCarousel />

      <div className="home-sections page-content">
        {/* New Releases */}
        <section className="mb-6">
          <SectionHeader title="New Releases" iconName="bolt" linkTo="/store?filter=new" linkText="See All" />
          <div className="games-grid">
            {newGames.map(g => <GameCard key={g.id} game={g} />)}
          </div>
        </section>

        {/* Top Sellers */}
        <section className="mb-6">
          <SectionHeader title="Top Sellers" iconName="trending_up" linkTo="/store?filter=top" linkText="See All" />
          <div className="games-grid">
            {topGames.map((g, i) => <GameCard key={g.id} game={g} rank={i + 1} />)}
          </div>
        </section>

        {/* Free to Play */}
        <section className="mb-6">
          <SectionHeader title="Free to Play" iconName="star" linkTo="/store?filter=free" linkText="See All" />
          <div className="games-grid">
            {freeGames.map(g => <GameCard key={g.id} game={g} />)}
          </div>
        </section>

        {/* Category Grid */}
        <section>
          <SectionHeader title="Browse by Genre" iconName="star" />
          <div className="genre-grid">
            {Object.entries(GENRE_COLORS).map(([genre, colors]) => (
              <Link key={genre} to={`/store?genre=${genre}`} className="genre-card" style={{ background: `linear-gradient(135deg, ${colors[0]}33, ${colors[1]}22)`, borderColor: `${colors[0]}44` }}>
                <div className="genre-card-icon" style={{ color: colors[0] }}>{genre[0]}</div>
                <span>{genre}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
