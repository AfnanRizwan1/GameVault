import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import GameCard from '../components/ui/GameCard';
import { mockGames, GENRES } from '../data/mockData';
import './Store.css';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

export default function Store() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [search, setSearch] = useState(params.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState(params.get('genre') || '');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 60]);
  const [showFreeOnly, setShowFreeOnly] = useState(params.get('filter') === 'free');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filter = params.get('filter');

  const filtered = useMemo(() => {
    let games = [...mockGames];

    // Apply quick filters from URL
    if (filter === 'new') games = games.filter(g => g.isNew);
    else if (filter === 'top') games = [...games].sort((a, b) => b.downloads - a.downloads);
    else if (filter === 'free') games = games.filter(g => g.isFree);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      games = games.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Genre
    if (selectedGenre) games = games.filter(g => g.genre === selectedGenre);

    // Price
    if (showFreeOnly) {
      games = games.filter(g => g.price === 0);
    } else {
      games = games.filter(g => g.price >= priceRange[0] && g.price <= priceRange[1]);
    }

    // Sort
    switch (sort) {
      case 'rating': games.sort((a, b) => b.rating - a.rating); break;
      case 'newest': games.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)); break;
      case 'price_asc': games.sort((a, b) => a.price - b.price); break;
      case 'price_desc': games.sort((a, b) => b.price - a.price); break;
      case 'popular': games.sort((a, b) => b.downloads - a.downloads); break;
      default: games.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return games;
  }, [search, selectedGenre, sort, priceRange, showFreeOnly, filter]);

  const pageTitle = filter === 'new' ? 'New Releases'
    : filter === 'top' ? 'Top Sellers'
    : filter === 'free' ? 'Free to Play'
    : 'Browse Games';

  const activeFiltersCount = [
    search, selectedGenre, showFreeOnly,
    priceRange[0] > 0 || priceRange[1] < 60
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearch('');
    setSelectedGenre('');
    setShowFreeOnly(false);
    setPriceRange([0, 60]);
    navigate('/store');
  };

  return (
    <div className="store-page">
      {/* Top bar */}
      <div className="store-topbar">
        <div className="store-topbar-left">
          <h1 className="store-title">{pageTitle}</h1>
          <span className="store-count">{filtered.length} games</span>
        </div>
        <div className="store-topbar-right">
          <div className="store-search-wrap">
            <Icon name="search" className="store-search-icon" size={16} />
            <input
              className="store-search"
              placeholder="Search games..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="store-search-clear" onClick={() => setSearch('')}>
                <Icon name="close" size={14} />
              </button>
            )}
          </div>
          <select className="store-sort" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button className="store-filter-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Icon name="tune" size={16} />
            Filters
            {activeFiltersCount > 0 && <span className="filter-badge-count">{activeFiltersCount}</span>}
          </button>
        </div>
      </div>

      <div className="store-layout">
        {/* Sidebar filters */}
        <aside className={`store-filters ${sidebarOpen ? 'open' : ''}`}>
          <div className="filter-section-header">
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <button className="clear-filters-btn" onClick={clearFilters}>Clear all</button>
            )}
          </div>

          {/* Genres */}
          <div className="filter-section">
            <div className="filter-label">Genre</div>
            <button
              className={`genre-pill ${!selectedGenre ? 'active' : ''}`}
              onClick={() => setSelectedGenre('')}
            >All</button>
            {GENRES.map(g => (
              <button
                key={g}
                className={`genre-pill ${selectedGenre === g ? 'active' : ''}`}
                onClick={() => setSelectedGenre(selectedGenre === g ? '' : g)}
              >{g}</button>
            ))}
          </div>

          {/* Price */}
          <div className="filter-section">
            <div className="filter-label">Price</div>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={e => setShowFreeOnly(e.target.checked)}
              />
              <span>Free to Play Only</span>
            </label>
            {!showFreeOnly && (
              <div className="price-range">
                <div className="price-range-labels">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range" min="0" max="60" step="1"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                  className="range-slider"
                />
              </div>
            )}
          </div>

          {/* Quick filters */}
          <div className="filter-section">
            <div className="filter-label">Quick Filters</div>
            <button className={`quick-filter ${filter === 'new' ? 'active' : ''}`} onClick={() => navigate('/store?filter=new')}>New Releases</button>
            <button className={`quick-filter ${filter === 'top' ? 'active' : ''}`} onClick={() => navigate('/store?filter=top')}><Icon name="emoji_events" size={14} /> Top Sellers</button>
            <button className={`quick-filter ${filter === 'free' ? 'active' : ''}`} onClick={() => navigate('/store?filter=free')}>Free to Play</button>
          </div>
        </aside>

        {/* Games grid */}
        <div className="store-content">
          {filtered.length === 0 ? (
            <div className="store-empty">
              <Icon name="search" size={48} style={{ opacity: 0.3 }} />
              <h3>No games found</h3>
              <p>Try adjusting your filters or search query.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="store-grid">
              {filtered.map((g, i) => (
                <GameCard key={g.id} game={g} rank={sort === 'popular' || filter === 'top' ? i + 1 : null} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
