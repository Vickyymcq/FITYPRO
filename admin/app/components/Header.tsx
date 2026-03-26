'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
        <Image 
          src="/logo.jpg" 
          alt="Fity Pro" 
          width={35}
          height={35}
          style={{ 
            borderRadius: '50%'
          }} 
        />
        <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginTop: '2px' }}>GO BACK</p>
      </div>
    </header>
  );
}
