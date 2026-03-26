'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@shared/supabase';
import { Booking } from '@shared/types';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '...', change: 'Real-time', color: 'var(--primary)' },
    { label: 'Active Bookings', value: '...', change: 'Real-time', color: 'var(--secondary)' },
    { label: 'Estimated Revenue', value: '...', change: 'Total', color: 'var(--success)' },
    { label: 'Upcoming Slots', value: '...', change: 'Next 7 days', color: 'var(--text-muted)' }
  ]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      // 1. Total Users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'client');

      // 2. Active Bookings
      const { count: bookingCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });

      // 3. Upcoming Slots
      const { count: slotCount } = await supabase
        .from('slots')
        .select('*', { count: 'exact', head: true })
        .gte('date', new Date().toISOString().split('T')[0]);

      // 4. Recent Transactions
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*, profiles(name), slots(date, start_time)')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats([
        { label: 'Total Users', value: (userCount || 0).toString(), change: 'Real-time', color: 'var(--primary)' },
        { label: 'Total Bookings', value: (bookingCount || 0).toString(), change: 'Accumulated', color: 'var(--secondary)' },
        { label: 'Active Slots', value: (slotCount || 0).toString(), change: 'Available', color: 'var(--success)' },
        { label: 'Platform Users', value: (userCount || 0).toString(), change: 'Synced', color: 'var(--text-muted)' }
      ]);

      setRecentBookings(bookings || []);
      setLoading(false);
    };

    fetchAdminStats();
  }, []);

  return (
    <div>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Admin Command Center</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time platform overview and user diagnostics.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn btn-outline" onClick={() => router.push('/users')}>Audit Users</button>
          <button className="btn btn-primary" onClick={() => router.push('/plans')}>Manage Slots</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="card" style={{ borderTop: `4px solid ${stat.color}` }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '10px' }}>{stat.label}</p>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{loading ? '...' : stat.value}</h2>
            <span style={{ color: stat.color, fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{stat.change}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '40px' }}>
        {/* Recent Activity Table */}
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Recent Platform Activity</h3>
          {loading ? <p>Syncing...</p> : (
            <table className="table">
              <thead>
                <tr style={{ textAlign: 'left', opacity: 0.6, fontSize: '0.8rem' }}>
                  <th style={{ padding: '15px 0' }}>User</th>
                  <th>Session Date</th>
                  <th>Time</th>
                  <th style={{ textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length > 0 ? recentBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '15px 0', fontWeight: 'bold' }}>{b.profiles?.name || 'Unknown User'}</td>
                    <td>{b.slots?.date || 'N/A'}</td>
                    <td>{b.slots?.start_time?.slice(0, 5) || '--:--'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>Confirmed</span>
                    </td>
                  </tr>
                )) : <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No recent bookings found.</td></tr>}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Diagnostics */}
        <div className="card">
          <h3>Quick Diagnostics</h3>
          <div style={{ marginTop: '24px' }}>
            <div style={{ padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', marginBottom: '15px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Backend Connectivity</p>
              <p style={{ fontWeight: 'bold', color: 'var(--success)' }}>● Supabase Online</p>
            </div>
            <div style={{ padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', marginBottom: '15px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authentication Service</p>
              <p style={{ fontWeight: 'bold', color: 'var(--success)' }}>● Real-time Enabled</p>
            </div>
            <div style={{ padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payment Gateway</p>
              <p style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>● Razorpay Test Mode</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
