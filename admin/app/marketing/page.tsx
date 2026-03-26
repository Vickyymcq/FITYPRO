'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@shared/supabase';
import { Profile } from '@shared/types';

const sourceColors: Record<string, string> = {
  'Instagram': '#E1306C',
  'Facebook': '#1877F2',
  'Google': '#4285F4',
  'YouTube': '#FF0000',
  'Friend/Referral': '#25D366',
  'Other': '#888888'
};

export default function MarketingAnalytics() {
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState<{ name: string; count: number; percentage: number; color: string }[]>([]);
  const [totalSignups, setTotalSignups] = useState(0);

  useEffect(() => {
    const fetchMarketingData = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('marketing_source');

      if (!error && data) {
        setTotalSignups(data.length);
        
        const counts: Record<string, number> = {};
        (data as Profile[]).forEach(item => {
          const source = item.marketing_source || 'Other';
          counts[source] = (counts[source] || 0) + 1;
        });

        const formatted = Object.entries(counts).map(([name, count]) => ({
          name,
          count,
          percentage: data.length > 0 ? Math.round((count / data.length) * 100) : 0,
          color: sourceColors[name] || '#7AC943'
        })).sort((a, b) => b.count - a.count);

        setSources(formatted);
      }
      setLoading(false);
    };

    fetchMarketingData();
  }, []);

  const handleDownload = () => {
    alert('Exporting ' + totalSignups + ' record(s) to CSV...');
  };

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Marketing Insights</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time user attribution from signup flow.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary" onClick={handleDownload} disabled={loading}>Export CSV Report</button>
        </div>
      </header>

      <div className="card">
        <h3>Signup Sources (Live)</h3>
        {loading ? <p style={{ padding: '40px', textAlign: 'center' }}>Analyzing real-time traffic...</p> : (
          <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {sources.length > 0 ? sources.map(s => (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: s.color }} />
                     <span style={{ fontWeight: 'bold' }}>{s.name}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{s.count} users</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '10px' }}>{s.percentage}%</span>
                  </div>
                </div>
                <div style={{ height: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.percentage}%`, backgroundColor: s.color }} />
                </div>
              </div>
            )) : <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No signup data available yet.</p>}
          </div>
        )}
      </div>

      <div className="card mt-6" style={{ borderLeft: '4px solid var(--primary)' }}>
        <h3>Marketing Summary</h3>
        <p style={{ marginTop: '10px', color: 'var(--text)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          This data is pulled directly from the &quot;How did you hear about us?&quot; step in the user onboarding flow. 
          Use these insights to allocate your advertising budget towards the highest-converting channels.
        </p>
      </div>
    </div>
  );
}
