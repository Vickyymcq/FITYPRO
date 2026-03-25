'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@shared/supabase';

function DashboardContent() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [nextSession, setNextSession] = useState<any>(null);
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

      // Fetch Next Booking
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*, slots(*, trainers(*))')
        .eq('user_id', user.id)
        .gte('slots.date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: false })
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

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading your real-time dashboard...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome back,</p>
          <h1 style={{ color: 'var(--primary)', fontSize: '1.8rem' }}>{profile?.name || 'Athlete'}</h1>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Profile Stats */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <h3 style={{ marginBottom: '15px' }}>Your Metrics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Height</p>
              <p style={{ fontWeight: 'bold' }}>{profile?.height} cm</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weight</p>
              <p style={{ fontWeight: 'bold' }}>{profile?.weight} kg</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BMI</p>
              <p style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{(profile?.weight / ((profile?.height/100)**2)).toFixed(1)}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Goal</p>
              <p style={{ fontWeight: 'bold' }}>{profile?.goal}</p>
            </div>
          </div>
        </div>

        {/* Real Slot Info */}
        <div className="card" style={{ border: '1px solid var(--secondary)' }}>
          <h3 style={{ marginBottom: '16px' }}>Upcoming Session</h3>
          {nextSession ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', backgroundColor: 'rgba(63, 169, 245, 0.1)', borderRadius: '10px' }}>📅</div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>{nextSession.date}</p>
                  <p style={{ color: 'var(--secondary)' }}>{nextSession.start_time.slice(0,5)} - {nextSession.end_time.slice(0,5)}</p>
                </div>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleJoin}>Join Live Session</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>No upcoming sessions booked.</p>
              <button className="btn btn-outline" onClick={() => router.push('/booking')}>Book a Slot</button>
            </div>
          )}
        </div>

      </div>

      <footer className="card mt-6" style={{ textAlign: 'center', borderStyle: 'dashed' }}>
        <p style={{ fontSize: '0.85rem' }}>Need help? Email <a href="mailto:Fityprogym@gmail.com" style={{ color: 'var(--primary)' }}>Fityprogym@gmail.com</a></p>
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
