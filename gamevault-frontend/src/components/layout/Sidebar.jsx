import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../ui/Icon';
import './Sidebar.css';

const GENRES = [
  { name: 'Action' },
  { name: 'RPG' },
  { name: 'Strategy' },
  { name: 'Puzzle' },
  { name: 'Indie' },
];

export default function Sidebar({ open }) {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isDev = user?.role === 'developer';

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const NavItem = ({ to, icon, label }) => (
    <Link to={to} className={`sidebar-item ${isActive(to) ? 'active' : ''}`}>
      <Icon name={icon} className="sidebar-item-icon" size={18} />
      <span>{label}</span>
    </Link>
  );

  if (isAdmin) {
    return (
      <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
        <div className="sidebar-section">
          <div className="sidebar-heading">OVERVIEW</div>
          <NavItem to="/admin" icon="pie_chart" label="Dashboard" />
          <NavItem to="/admin/users" icon="group" label="Users" />
          <NavItem to="/admin/games" icon="apps" label="All Games" />
        </div>
        <div className="sidebar-section">
          <div className="sidebar-heading">MANAGEMENT</div>
          <NavItem to="/admin/stats" icon="bar_chart" label="Analytics" />
        </div>
      </aside>
    );
  }

  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-section">
        <div className="sidebar-heading">DISCOVER</div>
        <NavItem to="/" icon="home" label="Home" />
        <NavItem to="/store" icon="apps" label="All Games" />
        <NavItem to="/store?filter=new" icon="bolt" label="New Releases" />
        <NavItem to="/store?filter=top" icon="trending_up" label="Top Sellers" />
        <NavItem to="/store?filter=free" icon="sell" label="Free to Play" />
      </div>

      {user && (
        <div className="sidebar-section">
          <div className="sidebar-heading">MY ACCOUNT</div>
          <NavItem to="/library" icon="library_books" label="My Library" />
          <NavItem to="/cart" icon="shopping_cart" label="Cart" />
          {isDev && <NavItem to="/developer" icon="inventory_2" label="Dev Hub" />}
        </div>
      )}

      <div className="sidebar-section">
        <div className="sidebar-heading">GENRES</div>
        {GENRES.map(g => (
          <Link key={g.name} to={`/store?genre=${g.name}`} className={`sidebar-item ${location.search.includes(g.name) ? 'active' : ''}`}>
            <Icon name="sports_esports" size={16} style={{ opacity: 0.6 }} />
            <span>{g.name}</span>
          </Link>
        ))}
        <Link to="/store?filter=all-genres" className="sidebar-item sidebar-more">
          <span>Browse All Genres <Icon name="arrow_forward" size={14} /></span>
        </Link>
      </div>
    </aside>
  );
}
