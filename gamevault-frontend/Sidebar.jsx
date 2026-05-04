import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome, FiGrid, FiStar, FiTrendingUp, FiClock, FiBookOpen,
  FiShoppingCart, FiUsers, FiBarChart2, FiSettings, FiPackage,
  FiTag, FiZap, FiPieChart, FiUpload
} from 'react-icons/fi';
import { GiGamepad, GiSwordman, GiMagicGate, GiBrain, GiTrophy } from 'react-icons/gi';
import './Sidebar.css';

const GENRES = [
  { name: 'Action', icon: GiSwordman, color: '#ff4757' },
  { name: 'RPG', icon: GiMagicGate, color: '#9b59b6' },
  { name: 'Strategy', icon: GiBrain, color: '#2980b9' },
  { name: 'Puzzle', icon: '🧩', color: '#f39c12' },
  { name: 'Indie', icon: '🎨', color: '#8e44ad' },
];

export default function Sidebar({ open }) {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isDev = user?.role === 'developer';

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const NavItem = ({ to, icon: Icon, label, color }) => (
    <Link to={to} className={`sidebar-item ${isActive(to) ? 'active' : ''}`}>
      {typeof Icon === 'string'
        ? <span className="sidebar-item-icon" style={{ fontSize: 16 }}>{Icon}</span>
        : <Icon className="sidebar-item-icon" style={color ? { color } : {}} />
      }
      <span>{label}</span>
    </Link>
  );

  if (isAdmin) {
    return (
      <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
        <div className="sidebar-section">
          <div className="sidebar-heading">OVERVIEW</div>
          <NavItem to="/admin" icon={FiPieChart} label="Dashboard" />
          <NavItem to="/admin/users" icon={FiUsers} label="Users" />
          <NavItem to="/admin/games" icon={FiGrid} label="All Games" />
        </div>
        <div className="sidebar-section">
          <div className="sidebar-heading">MANAGEMENT</div>
          <NavItem to="/admin/stats" icon={FiBarChart2} label="Analytics" />
        </div>
      </aside>
    );
  }

  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-section">
        <div className="sidebar-heading">DISCOVER</div>
        <NavItem to="/" icon={FiHome} label="Home" />
        <NavItem to="/store" icon={FiGrid} label="All Games" />
        <NavItem to="/store?filter=new" icon={FiZap} label="New Releases" />
        <NavItem to="/store?filter=top" icon={FiTrendingUp} label="Top Sellers" />
        <NavItem to="/store?filter=free" icon={FiTag} label="Free to Play" />
      </div>

      {user && (
        <div className="sidebar-section">
          <div className="sidebar-heading">MY ACCOUNT</div>
          <NavItem to="/library" icon={FiBookOpen} label="My Library" />
          <NavItem to="/cart" icon={FiShoppingCart} label="Cart" />
          {isDev && <NavItem to="/developer" icon={FiPackage} label="Dev Hub" />}
        </div>
      )}

      <div className="sidebar-section">
        <div className="sidebar-heading">GENRES</div>
        {GENRES.map(g => (
          <Link key={g.name} to={`/store?genre=${g.name}`} className={`sidebar-item ${location.search.includes(g.name) ? 'active' : ''}`}>
            {typeof g.icon === 'string'
              ? <span style={{ fontSize: 15 }}>{g.icon}</span>
              : <g.icon style={{ color: g.color, fontSize: 16 }} />
            }
            <span>{g.name}</span>
          </Link>
        ))}
        <Link to="/store?filter=all-genres" className="sidebar-item sidebar-more">
          <span>Browse All Genres →</span>
        </Link>
      </div>
    </aside>
  );
}
