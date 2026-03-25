'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './splash.css';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3500); // Slightly longer to appreciate the logo

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="splash-container">
      <div className="logo-container">
        <img 
          src="/logo.jpg" 
          alt="Fity Pro Logo" 
          className="splash-logo"
        />
      </div>
      <div className="loader"></div>
      <p className="splash-tagline">Train Anytime Anywhere</p>
    </div>
  );
}
