import { Link } from 'react-router-dom';
import { GiGamepad } from 'react-icons/gi';
import { FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <GiGamepad className="footer-brand-icon" />
          <span className="footer-brand-name">GameVault</span>
          <p className="footer-tagline">Where Games Meet Players</p>
          <div className="footer-socials">
            <a href="#" aria-label="GitHub"><FiGithub /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Email"><FiMail /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Store</h4>
          <Link to="/store">Browse Games</Link>
          <Link to="/store?filter=new">New Releases</Link>
          <Link to="/store?filter=top">Top Sellers</Link>
          <Link to="/store?filter=free">Free to Play</Link>
        </div>

        <div className="footer-links-group">
          <h4>Account</h4>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/library">My Library</Link>
          <Link to="/profile">Profile Settings</Link>
        </div>

        <div className="footer-links-group">
          <h4>Info</h4>
          <Link to="#">About Us</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Contact Support</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GameVault. All rights reserved. Built for educational purposes.</p>
        <p className="footer-bottom-links">
          <Link to="#">Privacy</Link>
          <Link to="#">Terms</Link>
          <Link to="#">Cookies</Link>
        </p>
      </div>
    </footer>
  );
}
