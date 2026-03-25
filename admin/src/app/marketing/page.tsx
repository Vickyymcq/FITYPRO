'use client';

import { useState } from 'react';

export default function MarketingAnalytics() {
  const [loading, setLoading] = useState(false);
  const sources = [
    { name: 'Instagram', count: 450, percentage: 45, color: '#E1306C' },
    { name: 'Facebook', count: 250, percentage: 25, color: '#1877F2' },
    { name: 'Google', count: 180, percentage: 18, color: '#4285F4' },
    { name: 'YouTube', count: 80, percentage: 8, color: '#FF0000' },
    { name: 'Friends', count: 40, percentage: 4, color: '#25D366' },
  ];

  const handleDownload = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Marketing Source Report downloaded successfully.');
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    alert('Real-time analytics refreshed.');
    setLoading(false);
  };

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Marketing Insights</h1>
          <p style={{ color: 'var(--text-muted)' }}>Where do our users come from?</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={handleRefresh} disabled={loading}>{loading ? '...' : 'Refresh'}</button>
          <button className="btn btn-primary" onClick={handleDownload} disabled={loading}>{loading ? '...' : 'Export Report'}</button>
        </div>
      </header>

      <div className="card">
        <h3>Signup Sources</h3>
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {sources.map(s => (
            <div key={s.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: s.color }} />
                   <span style={{ fontWeight: 'bold' }}>{s.name}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{s.count}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '10px' }}>{s.percentage}%</span>
                </div>
              </div>
              <div style={{ height: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.percentage}%`, backgroundColor: s.color }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => alert('Opening ' + s.name + ' ad campaign center...')} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '0.7rem', cursor: 'pointer', padding: 0 }}>View Campaigns</button>
                <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                <button onClick={() => alert('Increasing budget for ' + s.name + ' by 15%')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.7rem', cursor: 'pointer', padding: 0 }}>Boost Spend</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mt-6" style={{ borderLeft: '4px solid var(--secondary)' }}>
        <h3>Marketing Recommendation</h3>
        <p style={{ marginTop: '10px', color: 'var(--text)', fontSize: '0.9rem' }}>
          Instagram remains your top performing channel, accounting for nearly half of all signups. 
          <b> Goal for April:</b> Increase YouTube conversion by 5% through influencer collaborations.
        </p>
        <button className="btn btn-primary mt-4" style={{ width: 'auto', fontSize: '0.8rem' }} onClick={() => alert('Generating AI marketing strategy...')}>Generate Strategy</button>
      </div>
    </div>
  );
}
