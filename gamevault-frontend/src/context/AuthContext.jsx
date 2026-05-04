import { createContext, useContext, useState, useEffect } from 'react';
import { mockGames } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [library, setLibrary] = useState([1, 4, 6]); // pre-owned game ids for demo
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const savedUser = localStorage.getItem('gv_user');
    const savedCart = localStorage.getItem('gv_cart');
    const savedLib = localStorage.getItem('gv_library');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) {
      const savedItems = JSON.parse(savedCart);
      const hydratedCart = savedItems.map(item => mockGames.find(game => game.id === item.id) || item);
      setCart(hydratedCart);
      localStorage.setItem('gv_cart', JSON.stringify(hydratedCart));
    }
    if (savedLib) setLibrary(JSON.parse(savedLib));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app this would call API
    const mockUsers = {
      'admin@gamevault.com': { id: 3, name: 'Admin User', email: 'admin@gamevault.com', role: 'admin' },
      'dev@gamevault.com': { id: 2, name: 'Sam Chen', email: 'dev@gamevault.com', role: 'developer', studio: 'NovaStar Studios' },
      'user@gamevault.com': { id: 1, name: 'Alex Morgan', email: 'user@gamevault.com', role: 'customer' },
    };
    const foundUser = mockUsers[email];
    if (foundUser && password.length >= 6) {
      const userData = { ...foundUser, joinDate: new Date().toISOString() };
      setUser(userData);
      localStorage.setItem('gv_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const register = (name, email, password, role) => {
    const newUser = { id: Date.now(), name, email, role: role || 'customer', joinDate: new Date().toISOString() };
    setUser(newUser);
    localStorage.setItem('gv_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('gv_user');
    localStorage.removeItem('gv_cart');
  };

  const addToCart = (game) => {
    if (cart.find(i => i.id === game.id)) return false;
    if (library.includes(game.id)) return false;
    const newCart = [...cart, game];
    setCart(newCart);
    localStorage.setItem('gv_cart', JSON.stringify(newCart));
    return true;
  };

  const removeFromCart = (gameId) => {
    const newCart = cart.filter(i => i.id !== gameId);
    setCart(newCart);
    localStorage.setItem('gv_cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('gv_cart');
  };

  const purchaseGames = (gameIds) => {
    const newLib = [...new Set([...library, ...gameIds])];
    setLibrary(newLib);
    localStorage.setItem('gv_library', JSON.stringify(newLib));
    clearCart();
  };

  const cartTotal = cart.reduce((sum, g) => sum + (g.price || 0), 0);
  const cartCount = cart.length;
  const isInCart = (id) => cart.some(g => g.id === id);
  const isOwned = (id) => library.includes(id);

  return (
    <AuthContext.Provider value={{
      user, loading, cart, library, cartTotal, cartCount,
      login, register, logout, addToCart, removeFromCart,
      clearCart, purchaseGames, isInCart, isOwned
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
