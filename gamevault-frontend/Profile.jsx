import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockGames, mockOrders } from '../data/mockData';
import { FiUser, FiMail, FiEdit2, FiCheck, FiBookOpen, FiShoppingBag } from 'react-icons/fi';
import './Profile.css';

export default function Profile() {
  const { user, library } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);
  const ownedGames = mockGames.filter(g => library.includes(g.id));
  const orders = mockOrders.filter(o => o.userId === user?.id);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const roleColors = { admin: 'badge-red', developer: 'badge-gold', customer: 'badge-blue' };

  return (
    <div className="profile-page">
      <div className="profile-layout">
        {/* Left: User Card */}
        <div className="profile-card panel">
          <div className="profile-avatar">
            {user?.name?.[0] || '?'}
          </div>
          <div className="profile-info">
            {editing ? (
              <form onSubmit={handleSave} className="profile-edit-form">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="profile-name-input"
                  required
                />
                <div className="profile-edit-btns">
                  <button type="submit" className="btn btn-primary btn-sm"><FiCheck /> Save</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="profile-name-row">
                <h2>{name}</h2>
                <button className="profile-edit-btn" onClick={() => setEditing(true)}><FiEdit2 /></button>
              </div>
            )}
            {saved && <p className="profile-saved">✓ Profile saved</p>}
            <span className={`badge ${roleColors[user?.role] || 'badge-blue'}`}>{user?.role}</span>
          </div>

          <div className="profile-details">
            <div className="profile-detail">
              <FiMail className="profile-detail-icon" />
              <div>
                <span className="detail-label">Email</span>
                <span className="detail-value">{user?.email}</span>
              </div>
            </div>
            <div className="profile-detail">
              <FiUser className="profile-detail-icon" />
              <div>
                <span className="detail-label">Member Since</span>
                <span className="detail-value">{user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
            <div className="profile-detail">
              <FiBookOpen className="profile-detail-icon" />
              <div>
                <span className="detail-label">Games Owned</span>
                <span className="detail-value">{ownedGames.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stats + Library */}
        <div className="profile-right">
          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-icon">🎮</div>
              <div className="stat-value">{ownedGames.length}</div>
              <div className="stat-label">Games Owned</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛒</div>
              <div className="stat-value">{orders.length}</div>
              <div className="stat-label">Purchases</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">
                {ownedGames.length > 0
                  ? (ownedGames.reduce((s, g) => s + g.rating, 0) / ownedGames.length).toFixed(1)
                  : '—'}
              </div>
              <div className="stat-label">Avg Rating</div>
            </div>
          </div>

          {ownedGames.length > 0 && (
            <div className="panel">
              <h3 className="profile-section-title"><FiBookOpen /> Recent Games</h3>
              <div className="profile-games">
                {ownedGames.slice(0, 4).map(g => (
                  <div key={g.id} className="profile-game-row">
                    <div className="profile-game-dot" style={{ background: `#4da6ff` }} />
                    <span className="profile-game-name">{g.title}</span>
                    <span className="profile-game-genre text-muted text-sm">{g.genre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {orders.length > 0 && (
            <div className="panel">
              <h3 className="profile-section-title"><FiShoppingBag /> Purchase History</h3>
              {orders.map(o => (
                <div key={o.id} className="order-row">
                  <div>
                    <div className="order-name">{o.gameName}</div>
                    <div className="order-date text-muted text-sm">{o.date} · {o.paymentMethod}</div>
                  </div>
                  <span className="order-price">${o.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
