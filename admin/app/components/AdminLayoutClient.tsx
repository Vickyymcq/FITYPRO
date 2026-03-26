'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Header from './Header';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(false);
      if (pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/login');
  };

  // Prevent flicker during check
  if (isAuthenticated === null) return null;

  // Login page doesn't show sidebar
  if (pathname === '/login') return <>{children}</>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--surface)', 
        borderRight: '1px solid rgba(255,255,255,0.05)', 
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '40px', fontSize: '1.5rem' }}>Fity Pro Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <Link href="/" style={{ padding: '12px', borderRadius: '8px', backgroundColor: pathname === '/' ? 'rgba(122, 201, 67, 0.1)' : 'transparent', color: pathname === '/' ? 'var(--primary)' : 'var(--text-muted)' }}>Dashboard</Link>
          <Link href="/users" style={{ padding: '12px', color: pathname === '/users' ? 'var(--primary)' : 'var(--text-muted)' }}>User Management</Link>
          <Link href="/trainers" style={{ padding: '12px', color: pathname === '/trainers' ? 'var(--primary)' : 'var(--text-muted)' }}>Trainers</Link>
          <Link href="/plans" style={{ padding: '12px', color: pathname === '/plans' ? 'var(--primary)' : 'var(--text-muted)' }}>Plans & Slots</Link>
          <Link href="/sessions" style={{ padding: '12px', color: pathname === '/sessions' ? 'var(--primary)' : 'var(--text-muted)' }}>Daily Sessions</Link>
          <Link href="/payments" style={{ padding: '12px', color: pathname === '/payments' ? 'var(--primary)' : 'var(--text-muted)' }}>Payments</Link>
          <Link href="/marketing" style={{ padding: '12px', color: pathname === '/marketing' ? 'var(--primary)' : 'var(--text-muted)' }}>Marketing</Link>
        </nav>
        
        <button 
          onClick={handleLogout}
          style={{ 
            marginTop: 'auto', 
            padding: '12px', 
            color: 'var(--error)', 
            background: 'transparent', 
            border: 'none', 
            textAlign: 'left', 
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Logout Admin
        </button>
      </aside>
      
      <main style={{ flex: 1, padding: '20px 40px' }}>
        <Header />
        {children}
      </main>
    </div>
  );
}
