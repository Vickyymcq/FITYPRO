'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === 'FITYADMIN2026') {
      localStorage.setItem('admin_auth', 'true');
      router.push('/');
    } else {
      setError('Invalid Secret Admin Key');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0a0a0a',
      background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)'
    }}>
      <div className="card" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '40px', 
        textAlign: 'center',
        border: '1px solid rgba(122, 201, 67, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '2rem' }}>Fity Pro</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.9rem' }}>Command Center Login</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '8px', display: 'block' }}>Secret Admin Key</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '14px', 
                borderRadius: '10px', 
                border: '1px solid rgba(255,255,255,0.1)', 
                background: 'rgba(255,255,255,0.03)', 
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
          
          {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginBottom: '20px' }}>{error}</p>}
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: 'bold' }}
          >
            Enter Gateway
          </button>
        </form>
        
        <p style={{ marginTop: '30px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Unauthorized access is strictly prohibited and logged.
        </p>
      </div>
    </div>
  );
}
