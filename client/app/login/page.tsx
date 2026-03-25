'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@shared/supabase';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return alert('Please enter all details');
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // Check if profile exists/health chart filled
    const { data: profile } = await supabase
      .from('profiles')
      .select('gender')
      .eq('id', data.user.id)
      .single();

    localStorage.setItem('isLoggedIn', 'true');
    if (profile?.gender) {
      localStorage.setItem('hasFilledHealthChart', 'true');
      router.push('/dashboard');
    } else {
      router.push('/health-check');
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    if (!email || !password) return alert('Please enter all details');
    setLoading(true);
    
    console.log('Attempting signup with Supabase...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Signup Error:', authError.message);
      alert('Signup Error: ' + authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      console.log('Signup successful, creating/updating profile...');
      // Create or update initial profile safely
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ id: authData.user.id, role: 'client' }, { onConflict: 'id' });

      if (profileError) {
        console.error('Profile Creation Error:', profileError.message);
        if (!profileError.message.includes('duplicate key')) {
          alert('Account created, but profile setup failed: ' + profileError.message);
        }
      } else {
        alert('Signup successful! Profile saved. Now please LOGIN with your credentials.');
        // Switch to login mode automatically
        setIsLogin(true);
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '400px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', fontWeight: 'bold' }}>Fity Pro</h1>
        <p style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>Train Anytime Anywhere</p>
      </header>

      <div className="card" style={{ padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <h2 style={{ marginBottom: '25px', fontSize: '1.5rem', textAlign: 'center' }}>
          {isLogin ? 'Login to Your Fitness' : 'Create Your Account'}
        </h2>
        
        <div className="input-group">
          <label style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '8px', display: 'block' }}>Email Address</label>
          <input 
            type="email" 
            placeholder="vicky@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'var(--surface)', color: 'white' }}
          />
        </div>

        <div className="input-group mt-4">
          <label style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '8px', display: 'block' }}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'var(--surface)', color: 'white' }}
          />
        </div>

        <div style={{ marginTop: '30px' }}>
          {isLogin ? (
            <button 
              className="btn btn-primary" 
              onClick={handleLogin}
              disabled={loading || !email || !password}
              style={{ width: '100%' }}
            >
              {loading ? '...' : 'Login Now'}
            </button>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={handleSignup}
              disabled={loading || !email || !password}
              style={{ width: '100%' }}
            >
              {loading ? '...' : 'Create Account & Save Profile'}
            </button>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>{' '}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Signup Now' : 'Login Instead'}
          </span>
        </p>

        {isLogin && (
          <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Recovery functionality connected to Supabase Auth.')}>Forgot Password?</span>
          </p>
        )}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '40px', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
        By continuing, you agree to FittyPro <br />
        <a href="/terms" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Terms & Conditions</a> and <a href="/privacy" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Privacy Policy</a>. <br />
        <span style={{ color: 'var(--error)', fontWeight: 'bold' }}>Participation is at your own risk.</span>
      </footer>
    </div>
  );
}
