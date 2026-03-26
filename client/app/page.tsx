'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
        <Image 
          src="/logo.jpg" 
          alt="Fity Pro Logo" 
          width={180}
          height={180}
          className="splash-logo"
          priority
        />
      </div>
      <div className="loader"></div>
      <p className="splash-tagline">Train Anytime Anywhere</p>
    </div>
  );
}
