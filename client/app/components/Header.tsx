'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '15px 0', 
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 1000
    }}>
      <div 
        onClick={() => router.back()} 
        style={{ 
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img 
          src="/logo.jpg" 
          alt="Fity Pro" 
          style={{ 
            height: '40px', 
            borderRadius: '50%',
            boxShadow: '0 0 15px rgba(122, 201, 67, 0.3)'
          }} 
        />
        <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Back</p>
      </div>
    </header>
  );
}
