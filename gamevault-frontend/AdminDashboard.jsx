import { Link } from 'react-router-dom';
import {
  FiUsers, FiGrid, FiDollarSign, FiShoppingCart,
  FiTrendingUp, FiBarChart2, FiPackage, FiStar,
  FiArrowRight, FiActivity
} from 'react-icons/fi';
import { mockGames, mockAdminStats, mockOrders, mockUsers } from '../../data/mockData';
import './AdminDashboard.css';

const GENRE_COLORS = {
  Action:['#ff4757','#c0392b'],RPG:['#9b59b6','#6c3483'],Strategy:['#2980b9','#1a5276'],
  Puzzle:['#f39c12','#d68910'],Horror:['#2c3e50','#34495e'],Adventure:['#27ae60','#1e8449'],
  Shooter:['#e74c3c','#922b21'],Simulation:['#16a085','#0e6655'],Sports:['#f1c40f','#d4ac0d'],
  Indie:['#8e44ad','#6c3483'],
};

const stats = mockAdminStats;
const topGames = [...mockGames].sort((a, b) => b.downloads - a.downloads).slice(0, 5);

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">Platform overview and analytics</p>
        </div>
        <div className="admin-header-actions">
          <Link to="/admin/games" className="btn btn-primary btn-sm">
            <FiGrid /> Manage Games
          </Link>
        </div>
      </div>

      {/* Key Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(77,166,255,0.15)', color: '#4da6ff' }}>
            <FiGrid size={22} />
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value">{stats.totalGames}</div>
            <div className="stat-card-label">Total Games</div>
          </div>
          <div className="stat-card-trend up">+{stats.activeGames} active</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(76,175,118,0.15)', color: '#4caf76' }}>
            <FiUsers size={22} />
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value">{stats.totalUsers.toLocaleString()}</div>
            <div className="stat-card-label">Total Users</div>
          </div>
          <div className="stat-card-trend up">+{stats.newUsersThisMonth.toLocaleString()} this month</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(240,169,64,0.15)', color: '#f0a940' }}>
            <FiShoppingCart size={22} />
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value">{stats.totalOrders.toLocaleString()}</div>
            <div className="stat-card-label">Total Orders</div>
          </div>
          <div className="stat-card-trend up">All time</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(155,89,182,0.15)', color: '#9b59b6' }}>
            <FiDollarSign size={22} />
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value">${(stats.totalRevenue / 1000).toFixed(0)}K</div>
            <div className="stat-card-label">Total Revenue</div>
          </div>
          <div className="stat-card-trend up">+${(stats.revenueThisMonth / 1000).toFixed(1)}K this month</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="admin-content-grid">
        {/* Top Games */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2><FiTrendingUp /> Top Selling Games</h2>
            <Link to="/admin/games" className="admin-panel-link">View All <FiArrowRight /></Link>
          </div>
          <div className="top-games-list">
            {topGames.map((game, i) => {
              const colors = GENRE_COLORS[game.genre] || ['#4da6ff','#1a6dcc'];
              return (
                <div key={game.id} className="top-game-row">
                  <span className="top-game-rank">#{i + 1}</span>
                  <div className="top-game-cover" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
                    {game.genre[0]}
                  </div>
                  <div className="top-game-info">
                    <div className="top-game-title">{game.title}</div>
                    <div className="top-game-meta">
                      <span className="tag">{game.genre}</span>
                      <span className="text-muted text-sm">{game.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                  <div className="top-game-stats">
                    <div className="top-game-price">${game.price === 0 ? 'FREE' : game.price.toFixed(2)}</div>
                    <div className="top-game-rating text-gold text-sm">★ {game.rating}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="admin-right-col">
          {/* Quick Actions */}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2><FiActivity /> Quick Actions</h2>
            </div>
            <div className="quick-actions-grid">
              <Link to="/admin/games" className="quick-action-btn">
                <FiGrid size={20} />
                <span>All Games</span>
              </Link>
              <Link to="/admin/users" className="quick-action-btn">
                <FiUsers size={20} />
                <span>Users</span>
              </Link>
              <Link to="/admin/games" className="quick-action-btn accent">
                <FiPackage size={20} />
                <span>Add Game</span>
              </Link>
              <Link to="/store" className="quick-action-btn">
                <FiBarChart2 size={20} />
                <span>View Store</span>
              </Link>
            </div>
          </div>

          {/* Genre Distribution */}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2><FiBarChart2 /> Genre Breakdown</h2>
            </div>
            <div className="genre-breakdown">
              {Object.entries(GENRE_COLORS).map(([genre, colors]) => {
                const count = mockGames.filter(g => g.genre === genre).length;
                const pct = Math.round((count / mockGames.length) * 100);
                if (count === 0) return null;
                return (
                  <div key={genre} className="genre-bar-row">
                    <span className="genre-bar-label">{genre}</span>
                    <div className="genre-bar-track">
                      <div className="genre-bar-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})` }} />
                    </div>
                    <span className="genre-bar-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Users */}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2><FiUsers /> Recent Users</h2>
              <Link to="/admin/users" className="admin-panel-link">View All <FiArrowRight /></Link>
            </div>
            <div className="recent-users-list">
              {mockUsers.map(u => (
                <div key={u.id} className="recent-user-row">
                  <div className="recent-user-avatar">{u.name[0]}</div>
                  <div className="recent-user-info">
                    <div className="recent-user-name">{u.name}</div>
                    <div className="recent-user-email text-muted text-sm">{u.email}</div>
                  </div>
                  <span className={`badge ${u.role === 'admin' ? 'badge-red' : u.role === 'developer' ? 'badge-gold' : 'badge-blue'}`}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
