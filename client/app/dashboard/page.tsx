'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@shared/supabase';
import { Profile, Slot } from '@shared/types';

function DashboardContent() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [nextSession, setNextSession] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData);

      // Fetch Next Booking (Chronologically Nearest Future Slot)
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*, slots(*, trainers(*))')
        .eq('user_id', user.id)
        .gte('slots.date', new Date().toISOString().split('T')[0])
        .order('date', { foreignTable: 'slots', ascending: true })
        .order('start_time', { foreignTable: 'slots', ascending: true })
        .limit(1);

      if (bookings && bookings[0]) setNextSession(bookings[0].slots);
      setLoading(false);
    };
    fetchData();
  }, [router]);

  const handleJoin = () => {
    if (nextSession?.meet_link) {
      window.open(nextSession.meet_link, '_blank');
    } else {
      alert('Meet link will be available 5 minutes before the session.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Syncing your fitness profile...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Member Dashboard</p>
          <h1 style={{ color: 'var(--primary)', fontSize: '1.8rem' }}>Hello, {profile?.name || 'Athlete'}</h1>
        </div>
        <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '8px 15px', fontSize: '0.8rem' }}>Logout</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Profile Stats */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <h3 style={{ marginBottom: '15px' }}>Membership Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ gridColumn: 'span 2', marginBottom: '10px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</p>
              <p style={{ fontWeight: 'bold' }}>{profile?.email || 'N/A'}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Height / Weight</p>
              <p style={{ fontWeight: 'bold' }}>{profile?.height}cm / {profile?.weight}kg</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BMI</p>
              <p style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                {profile?.height && profile?.weight ? (profile?.weight / ((profile?.height/100)**2)).toFixed(1) : '-'}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Goal</p>
              <p style={{ fontWeight: 'bold' }}>{profile?.goal}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Experience</p>
              <p style={{ fontWeight: 'bold' }}>{profile?.experience_level}</p>
            </div>
          </div>
        </div>

        {/* Real Slot Info */}
        <div className="card" style={{ border: '1px solid var(--secondary)' }}>
          <h3 style={{ marginBottom: '16px' }}>Upcoming Session</h3>
          {nextSession ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', backgroundColor: 'rgba(122, 201, 67, 0.1)', borderRadius: '10px' }}>📅</div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>{nextSession.date}</p>
                  <p style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>{nextSession.start_time.slice(0,5)} - {nextSession.end_time.slice(0,5)}</p>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Batch Name</p>
                <p style={{ fontWeight: 'bold' }}>{nextSession.batch_name || 'Standard Batch'}</p>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleJoin}>Join Live Session</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>No upcoming sessions booked.</p>
              <button className="btn btn-primary" onClick={() => router.push('/booking')} style={{ width: '100%' }}>Book Your Slot Now</button>
            </div>
          )}
        </div>

      </div>

      <footer className="card mt-6" style={{ textAlign: 'center', backgroundColor: 'rgba(122, 201, 67, 0.02)' }}>
        <p style={{ fontSize: '0.85rem' }}>Fity Pro Command Center • <a href="mailto:support@fitypro.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>support@fitypro.com</a></p>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading your dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
