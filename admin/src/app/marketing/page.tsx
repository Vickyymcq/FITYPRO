'use client';

export default function MarketingAnalytics() {
  const sources = [
    { name: 'Instagram', count: 450, percentage: 45, color: '#E1306C' },
    { name: 'Facebook', count: 250, percentage: 25, color: '#1877F2' },
    { name: 'Google', count: 180, percentage: 18, color: '#4285F4' },
    { name: 'YouTube', count: 80, percentage: 8, color: '#FF0000' },
    { name: 'Friends', count: 40, percentage: 4, color: '#25D366' },
  ];

  return (
    <div>
      <header style={{ marginBottom: '30px' }}>
        <h1>Marketing Insights</h1>
        <p style={{ color: 'var(--text-muted)' }}>Where do our users come from?</p>
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
            </div>
          ))}
        </div>
      </div>

      <div className="card mt-6">
        <h3>Quick Summary</h3>
        <p style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Instagram remains your top performing channel, accounting for nearly half of all signups. 
          Consider increasing ad spend for YouTube to capture more of the video-first audience.
        </p>
      </div>
    </div>
  );
}
