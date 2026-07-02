import { useState } from 'react';
import { X } from 'lucide-react';
import Logo from './Logo.jsx';
import { api } from '../api.js';

export default function AuthModal({ type, onClose, onAuthSuccess }) {
  const isLogin = type === 'login';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = isLogin
        ? await api.login(email, password)
        : await api.register(name, email, password);
      localStorage.setItem('qb_token', data.token);
      localStorage.setItem('qb_user', JSON.stringify(data.user));
      onAuthSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <form className="auth-modal" onSubmit={handleSubmit}>
        <button type="button" className="close-btn" onClick={onClose}>
          <X size={18} />
        </button>
        <Logo />
        <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>

        {error && (
          <p style={{ color: '#db0007', fontSize: '0.85rem', margin: '0 0 10px' }}>
            {error}
          </p>
        )}

        {!isLogin && (
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="checkout-btn" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}