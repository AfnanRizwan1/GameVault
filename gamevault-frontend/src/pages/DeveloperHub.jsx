import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockGames } from '../data/mockData';
import Icon from '../components/ui/Icon';
import './DeveloperHub.css';

const GENRE_COLORS = {
  Action:['#ff4757','#c0392b'],RPG:['#9b59b6','#6c3483'],Strategy:['#2980b9','#1a5276'],
  Puzzle:['#f39c12','#d68910'],Horror:['#2c3e50','#34495e'],Adventure:['#27ae60','#1e8449'],
  Shooter:['#e74c3c','#922b21'],Simulation:['#16a085','#0e6655'],Sports:['#f1c40f','#d4ac0d'],Indie:['#8e44ad','#6c3483'],
};
const GENRES = Object.keys(GENRE_COLORS);

export default function DeveloperHub() {
  const { user } = useAuth();
  const studioName = user?.studio || 'Your Studio';
  const [myGames, setMyGames] = useState(
    mockGames.filter(g => g.developer === studioName).length > 0
      ? mockGames.filter(g => g.developer === studioName) : mockGames.slice(0, 3)
  );
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ title: '', genre: 'Action', price: '', description: '', developer: studioName, tags: '' });
  const [submitted, setSubmitted] = useState(false);
  const totalDownloads = myGames.reduce((s, g) => s + g.downloads, 0);
  const totalRevenue = myGames.reduce((s, g) => s + g.price * (g.downloads / 100), 0);
  const avgRating = myGames.length > 0 ? (myGames.reduce((s, g) => s + g.rating, 0) / myGames.length).toFixed(1) : '—';

  const handleSubmit = (e) => {
    e.preventDefault();
    const game = { id: Date.now(), title: form.title, genre: form.genre, price: parseFloat(form.price) || 0, description: form.description, developer: form.developer || studioName, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), rating: 0, reviews: 0, downloads: 0, isNew: true, isFeatured: false, isFree: parseFloat(form.price) === 0, releaseDate: new Date().toISOString().split('T')[0], screenshots: 0 };
    setMyGames(prev => [game, ...prev]);
    setShowUpload(false);
    setSubmitted(true);
    setForm({ title: '', genre: 'Action', price: '', description: '', developer: studioName, tags: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="dev-hub-page">
      <div className="dev-hub-header">
        <div className="dev-hub-brand">
          <div className="dev-hub-icon"><Icon name="inventory_2" size={28} /></div>
          <div><h1 className="dev-hub-title">Developer Hub</h1><p className="dev-hub-subtitle">{studioName}</p></div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowUpload(true)}><Icon name="upload" size={16} /> Publish New Game</button>
      </div>
      {submitted && <div className="dev-success-banner"><Icon name="check" size={16} /> Game published successfully! It's now live in the store.</div>}
      <div className="dev-stats-grid">
        <div className="dev-stat-card panel"><div className="dev-stat-icon" style={{ color: '#4da6ff', background: 'rgba(77,166,255,0.12)' }}><Icon name="inventory_2" size={20} /></div><div><div className="dev-stat-value">{myGames.length}</div><div className="dev-stat-label">Published Games</div></div></div>
        <div className="dev-stat-card panel"><div className="dev-stat-icon" style={{ color: '#4caf76', background: 'rgba(76,175,118,0.12)' }}><Icon name="download" size={20} /></div><div><div className="dev-stat-value">{totalDownloads.toLocaleString()}</div><div className="dev-stat-label">Total Downloads</div></div></div>
        <div className="dev-stat-card panel"><div className="dev-stat-icon" style={{ color: '#9b59b6', background: 'rgba(155,89,182,0.12)' }}><Icon name="attach_money" size={20} /></div><div><div className="dev-stat-value">${Math.round(totalRevenue).toLocaleString()}</div><div className="dev-stat-label">Est. Revenue</div></div></div>
        <div className="dev-stat-card panel"><div className="dev-stat-icon" style={{ color: '#f0a940', background: 'rgba(240,169,64,0.12)' }}><Icon name="star" size={20} /></div><div><div className="dev-stat-value">{avgRating}</div><div className="dev-stat-label">Avg. Rating</div></div></div>
      </div>
      <div className="dev-section-header"><h2><Icon name="inventory_2" size={20} /> My Games</h2></div>
      {myGames.length === 0 ? (
        <div className="dev-empty panel"><Icon name="inventory_2" size={50} style={{ opacity: 0.3 }} /><h3>No games published yet</h3><p>Start building your catalog by publishing your first game.</p><button className="btn btn-primary" onClick={() => setShowUpload(true)}><Icon name="upload" size={16} /> Publish First Game</button></div>
      ) : (
        <div className="dev-games-grid">
          {myGames.map(game => {
            const colors = GENRE_COLORS[game.genre] || ['#4da6ff','#1a6dcc'];
            return (
              <div key={game.id} className="dev-game-card panel">
                <div className="dev-game-cover" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
                  {game.image ? (
                    <img src={game.image} alt={game.title} className="dev-game-img" />
                  ) : (
                    <span className="dev-cover-initial">{game.genre[0]}</span>
                  )}
                  {game.isNew && <span className="dev-new-badge">NEW</span>}
                </div>
                <div className="dev-game-info">
                  <div className="dev-game-title">{game.title}</div>
                  <div className="dev-game-meta"><span className="tag">{game.genre}</span><span className={game.price === 0 ? 'text-green font-bold text-sm' : 'text-sm font-bold'}>{game.price === 0 ? 'FREE' : `$${game.price.toFixed(2)}`}</span></div>
                  <div className="dev-game-stats"><span className="dev-stat-pill"><Icon name="download" size={12} /> {game.downloads.toLocaleString()}</span><span className="dev-stat-pill gold"><Icon name="star" size={12} /> {game.rating.toFixed(1)}</span><span className="dev-stat-pill">{game.reviews} reviews</span></div>
                </div>
                <div className="dev-game-actions"><Link to={`/game/${game.id}`} className="btn btn-secondary btn-sm"><Icon name="visibility" size={14} /> View</Link><button className="btn btn-secondary btn-sm"><Icon name="edit" size={14} /> Edit</button></div>
              </div>
            );
          })}
        </div>
      )}
      {showUpload && (
        <div className="modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="modal dev-upload-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3><Icon name="upload" size={18} /> Publish New Game</h3><button className="btn btn-icon btn-secondary" onClick={() => setShowUpload(false)}><Icon name="close" size={18} /></button></div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group"><label className="form-label">Game Title *</label><input className="form-control" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Enter game title" required /></div>
                <div className="form-row"><div className="form-group"><label className="form-label">Genre *</label><select className="form-control" value={form.genre} onChange={e => setForm(p => ({ ...p, genre: e.target.value }))}>{GENRES.map(g => <option key={g} value={g}>{g}</option>)}</select></div><div className="form-group"><label className="form-label">Price ($) *</label><input className="form-control" type="number" min="0" step="0.01" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="0 = Free" required /></div></div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-control" rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe your game..." /></div>
                <div className="form-group"><label className="form-label">Tags (comma-separated)</label><input className="form-control" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="Action, Multiplayer, Story-Rich..." /></div>
                <div className="dev-upload-notice"><Icon name="upload" size={14} /> This is a demo — no actual files are uploaded.</div>
              </div>
              <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={() => setShowUpload(false)}>Cancel</button><button type="submit" className="btn btn-primary"><Icon name="check" size={16} /> Publish Game</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
