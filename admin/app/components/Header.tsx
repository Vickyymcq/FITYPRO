'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '10px 0', 
      borderBottom: '1px solid rgba(255,255,255,0.02)',
      marginBottom: '20px'
    }}>
      <div 
        onClick={() => router.back()} 
        style={{ 
          cursor: 'pointer',
          textAlign: 'center'
        }}
      >
        <img 
          src="/logo.jpg" 
          alt="Fity Pro" 
          style={{ 
            height: '35px', 
            borderRadius: '50%'
          }} 
        />
        <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: '2px' }}>GO BACK</p>
      </div>
    </header>
  );
}
