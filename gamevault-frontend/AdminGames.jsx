import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockGames } from '../../data/mockData';
import {
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiStar,
  FiFilter, FiDownload, FiEye, FiX
} from 'react-icons/fi';
import './AdminGames.css';

const GENRE_COLORS = {
  Action:['#ff4757','#c0392b'],RPG:['#9b59b6','#6c3483'],Strategy:['#2980b9','#1a5276'],
  Puzzle:['#f39c12','#d68910'],Horror:['#2c3e50','#34495e'],Adventure:['#27ae60','#1e8449'],
  Shooter:['#e74c3c','#922b21'],Simulation:['#16a085','#0e6655'],Sports:['#f1c40f','#d4ac0d'],
  Indie:['#8e44ad','#6c3483'],
};

export default function AdminGames() {
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [games, setGames] = useState(mockGames);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGame, setNewGame] = useState({ title: '', genre: 'Action', price: '', description: '', developer: '' });

  const genres = [...new Set(mockGames.map(g => g.genre))];

  const filtered = games
    .filter(g => {
      const q = search.toLowerCase();
      return (!q || g.title.toLowerCase().includes(q) || g.developer.toLowerCase().includes(q)) &&
             (!genreFilter || g.genre === genreFilter);
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      return 0;
    });

  const handleDelete = (id) => {
    setGames(prev => prev.filter(g => g.id !== id));
    setDeleteId(null);
  };

  const handleAddGame = (e) => {
    e.preventDefault();
    const game = {
      id: Date.now(),
      ...newGame,
      price: parseFloat(newGame.price) || 0,
      rating: 0,
      reviews: 0,
      downloads: 0,
      tags: [newGame.genre],
      isNew: true,
      isFeatured: false,
      isFree: parseFloat(newGame.price) === 0,
      releaseDate: new Date().toISOString().split('T')[0],
      screenshots: 0,
    };
    setGames(prev => [game, ...prev]);
    setNewGame({ title: '', genre: 'Action', price: '', description: '', developer: '' });
    setShowAddModal(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">Game Management</h1>
          <p className="admin-subtitle">{games.length} total games in catalog</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <FiPlus /> Add New Game
        </button>
      </div>

      {/* Toolbar */}
      <div className="ag-toolbar panel">
        <div className="ag-search-wrap">
          <FiSearch className="ag-search-icon" />
          <input
            className="ag-search"
            placeholder="Search by title or developer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="ag-search-clear" onClick={() => setSearch('')}><FiX size={14} /></button>}
        </div>
        <div className="ag-filters">
          <select className="ag-select" value={genreFilter} onChange={e => setGenreFilter(e.target.value)}>
            <option value="">All Genres</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select className="ag-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="title">Sort: Title</option>
            <option value="price">Sort: Price</option>
            <option value="rating">Sort: Rating</option>
            <option value="downloads">Sort: Downloads</option>
          </select>
        </div>
        <span className="ag-count">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="ag-table-wrap panel">
        <table className="ag-table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Downloads</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(game => {
              const colors = GENRE_COLORS[game.genre] || ['#4da6ff','#1a6dcc'];
              return (
                <tr key={game.id}>
                  <td>
                    <div className="ag-game-cell">
                      <div className="ag-game-cover" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
                        {game.genre[0]}
                      </div>
                      <div>
                        <div className="ag-game-title">{game.title}</div>
                        <div className="ag-game-dev text-muted text-sm">{game.developer}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="tag">{game.genre}</span></td>
                  <td>
                    <span className={game.price === 0 ? 'text-green font-bold' : 'ag-price'}>
                      {game.price === 0 ? 'FREE' : `$${game.price.toFixed(2)}`}
                    </span>
                  </td>
                  <td>
                    <span className="ag-rating">
                      <FiStar className="star-icon" /> {game.rating.toFixed(1)}
                    </span>
                  </td>
                  <td>
                    <span className="ag-downloads">{game.downloads.toLocaleString()}</span>
                  </td>
                  <td>
                    {game.isNew
                      ? <span className="badge badge-blue">New</span>
                      : game.isFeatured
                      ? <span className="badge badge-gold">Featured</span>
                      : <span className="badge badge-soft">Active</span>}
                  </td>
                  <td>
                    <div className="ag-actions">
                      <Link to={`/game/${game.id}`} className="ag-btn ag-btn-view" title="View">
                        <FiEye size={14} />
                      </Link>
                      <button className="ag-btn ag-btn-edit" title="Edit">
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        className="ag-btn ag-btn-delete"
                        title="Delete"
                        onClick={() => setDeleteId(game.id)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="ag-empty">
            <p>No games found. Try adjusting filters.</p>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Game</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{games.find(g => g.id === deleteId)?.title}</strong>? This cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Game Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FiPlus /> Add New Game</h3>
              <button className="btn btn-icon btn-secondary" onClick={() => setShowAddModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleAddGame}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input
                    className="form-control"
                    value={newGame.title}
                    onChange={e => setNewGame(p => ({ ...p, title: e.target.value }))}
                    placeholder="Game title"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Genre *</label>
                    <select className="form-control" value={newGame.genre} onChange={e => setNewGame(p => ({ ...p, genre: e.target.value }))}>
                      {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newGame.price}
                      onChange={e => setNewGame(p => ({ ...p, price: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Developer</label>
                  <input
                    className="form-control"
                    value={newGame.developer}
                    onChange={e => setNewGame(p => ({ ...p, developer: e.target.value }))}
                    placeholder="Studio name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={newGame.description}
                    onChange={e => setNewGame(p => ({ ...p, description: e.target.value }))}
                    placeholder="Game description..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><FiPlus /> Add Game</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
