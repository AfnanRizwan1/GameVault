import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockGames } from '../data/mockData';
import Icon from '../components/ui/Icon';
import { useState } from 'react';
import './Library.css';

const GENRE_COLORS = {
  Action:['#ff4757','#c0392b'],RPG:['#9b59b6','#6c3483'],Strategy:['#2980b9','#1a5276'],
  Puzzle:['#f39c12','#d68910'],Horror:['#2c3e50','#34495e'],Adventure:['#27ae60','#1e8449'],
  Shooter:['#e74c3c','#922b21'],Simulation:['#16a085','#0e6655'],Sports:['#f1c40f','#d4ac0d'],Indie:['#8e44ad','#6c3483'],
};

export default function Library() {
  const { library } = useAuth();
  const [search, setSearch] = useState('');
  const ownedGames = mockGames.filter(g => library.includes(g.id));
  const filtered = ownedGames.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="library-page">
      <div className="library-header">
        <div>
          <h1 className="page-title"><Icon name="library_books" size={24} /> My Library</h1>
          <p className="text-muted">{ownedGames.length} game{ownedGames.length !== 1 ? 's' : ''} in your collection</p>
        </div>
        {ownedGames.length > 0 && (
          <div className="lib-search-wrap">
            <Icon name="search" className="lib-search-icon" size={16} />
            <input className="lib-search" placeholder="Search library..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        )}
      </div>
      {ownedGames.length === 0 ? (
        <div className="library-empty panel">
          <Icon name="library_books" size={60} className="lib-empty-icon" />
          <h2>Your library is empty</h2>
          <p>Purchase games from the store to build your collection.</p>
          <Link to="/store" className="btn btn-primary">Browse Store</Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="library-empty panel">
          <p>No games match your search.</p>
          <button className="btn btn-secondary" onClick={() => setSearch('')}>Clear Search</button>
        </div>
      ) : (
        <div className="library-grid">
          {filtered.map(game => {
            const colors = GENRE_COLORS[game.genre] || ['#4da6ff','#1a6dcc'];
            return (
              <div key={game.id} className="lib-card panel">
                <div className="lib-card-cover" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
                  {game.image ? (
                    <img src={game.image} alt={game.title} className="lib-card-img" />
                  ) : (
                    <span className="lib-cover-initial">{game.genre[0]}</span>
                  )}
                  <div className="lib-card-overlay">
                    <Link to={`/game/${game.id}`} className="lib-play-btn"><Icon name="play_arrow" size={16} /> View Details</Link>
                  </div>
                </div>
                <div className="lib-card-info">
                  <Link to={`/game/${game.id}`} className="lib-card-title">{game.title}</Link>
                  <div className="lib-card-meta">
                    <span className="tag">{game.genre}</span>
                    <span className="lib-rating"><Icon name="star" size={12} /> {game.rating.toFixed(1)}</span>
                  </div>
                  <div className="lib-card-dev text-muted text-sm">{game.developer}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
