import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { API_URL } from '../config';

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isLogin 
      ? `${API_URL}/api/auth/login` 
      : `${API_URL}/api/auth/register`;
    
    const body = isLogin 
      ? { emailOrUsername: email || username, password }
      : { username, email, password };

    // Basic Validation
    if (isLogin && (!email && !username)) {
      setError('Please provide your Username or Email address.');
      setLoading(false);
      return;
    }
    if (!isLogin && (!username || !email)) {
      setError('Please fill in your username and email.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Authentication failed. Please try again.');
      }

      // Success
      onAuthSuccess(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '20px' }}>
      <div className="glass-card animate-slide" style={{ width: '100%', maxWidth: '440px', padding: '35px', border: '1px solid var(--border-glow-active)', boxShadow: '0 8px 32px var(--primary-glow)' }}>
        
        {/* Banner */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ display: 'inline-flex', background: 'var(--primary)', padding: '12px', borderRadius: '16px', color: 'white', marginBottom: '15px' }}>
            <ShieldCheck size={28} className="pulse-badge" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '6px' }}>
            Uncover Your Journey
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Sign in to unlock route optimizations, budgets, and saved itineraries.
          </p>
        </div>

        {/* Sliding Modes Tabs */}
        <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: '10px', padding: '4px', marginBottom: '25px' }}>
          <button 
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            style={{
              flexGrow: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              background: isLogin ? 'var(--primary)' : 'transparent',
              color: isLogin ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            style={{
              flexGrow: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              background: !isLogin ? 'var(--primary)' : 'transparent',
              color: !isLogin ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.25)', borderRadius: '8px', padding: '12px', display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--danger)', fontSize: '0.8rem', marginBottom: '20px' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} style={{ color: 'var(--primary-hover)' }} /> Username
              </label>
              <input 
                type="text"
                placeholder="Choose a traveler username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} style={{ color: 'var(--accent-cyan)' }} /> {isLogin ? 'Username or Email' : 'Email Address'}
            </label>
            <input 
              type="text"
              placeholder={isLogin ? "Enter your username or email" : "traveler@domain.com"}
              value={isLogin ? username || email : email}
              onChange={(e) => isLogin ? (setUsername(e.target.value), setEmail(e.target.value)) : setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} style={{ color: 'var(--accent-gold)' }} /> Password
            </label>
            <input 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="nav-tab" 
            style={{ 
              width: '100%', 
              background: 'var(--primary)', 
              color: 'white', 
              justifyContent: 'center',
              padding: '12px',
              fontSize: '0.95rem',
              fontWeight: '700',
              marginTop: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Validating credentials...' : isLogin ? 'Access Dashboard' : 'Generate Account'}
            {!loading && <ArrowRight size={16} style={{ marginLeft: '4px' }} />}
          </button>
        </form>

      </div>
    </div>
  );
}
