import { LogIn, LogOut, Search, UserPlus, ShieldCheck } from 'lucide-react';
import Logo from './Logo.jsx';

export default function Navbar({ query, setQuery, setAuthView, onHome, user, onLogout, onAdmin }) {
  return (
    <header className="topbar">
      <Logo onHome={onHome} />
      <label className="search-box">
        <Search size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search burgers, pizzas, drinks..."
        />
      </label>
      <div className="auth-actions">
        {user ? (
          <>
            <span style={{ fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
              Hi, {user.name.split(' ')[0]} 👋
            </span>
            <button
              className="ghost-btn"
              onClick={onAdmin}
              title="Admin dashboard"
              style={{ gap: 6 }}
            >
              <ShieldCheck size={16} /> Admin
            </button>
            <button className="ghost-btn" onClick={onLogout}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <button className="ghost-btn" onClick={() => setAuthView('login')}>
              <LogIn size={18} /> Login
            </button>
            <button className="solid-btn" onClick={() => setAuthView('register')}>
              <UserPlus size={18} /> Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}