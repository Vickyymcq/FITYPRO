'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  
  const stats = [
    { label: 'Total Users', value: '1,240', change: '+12%', color: 'var(--primary)' },
    { label: 'Active Subscriptions', value: '850', change: '+5%', color: 'var(--secondary)' },
    { label: 'Monthly Revenue', value: '₹2,45,000', change: '+18%', color: 'var(--success)' },
    { label: 'Pending Slots', value: '14', change: 'Normal', color: 'var(--text-muted)' }
  ];

  return (
    <div>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back to the Fity Pro command center.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => router.push('/plans')}
        >
          + Add New Slot
        </button>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="card">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '10px' }}>{stat.label}</p>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{stat.value}</h2>
            <span style={{ color: stat.color, fontSize: '0.8rem', fontWeight: 'bold' }}>{stat.change} vs last month</span>
          </div>
        ))}
      </div>

      {/* Revenue & Growth (Simulation) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '40px' }}>
        <div className="card" style={{ height: '300px' }}>
          <h3>Revenue Analytics</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px', marginTop: '20px' }}>
            {[40, 60, 45, 90, 75, 120, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: 'rgba(122, 201, 67, 0.2)', borderTop: '2px solid var(--primary)', height: `${h}px`, borderRadius: '4px 4px 0 0' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="card">
          <h3>Plan Distribution</h3>
          <div style={{ marginTop: '30px' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                <span>Basic</span><span>45%</span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: '45%', backgroundColor: 'var(--primary)', borderRadius: '3px' }} />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                <span>Standard</span><span>35%</span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: '35%', backgroundColor: 'var(--secondary)', borderRadius: '3px' }} />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                <span>Premium</span><span>20%</span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: '20%', backgroundColor: '#A855F7', borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="card">
        <h3>Recent Transactions</h3>
        <table className="table">
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '15px 0' }}>User</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
              <td style={{ padding: '15px 0' }}>Amit Kumar</td>
              <td>Standard</td>
              <td>₹3,588</td>
              <td><span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>Completed</span></td>
              <td style={{ textAlign: 'right' }}>Today, 10:45 AM</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
              <td style={{ padding: '15px 0' }}>Sneha Patil</td>
              <td>Premium</td>
              <td>₹7,188</td>
              <td><span className="badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>Completed</span></td>
              <td style={{ textAlign: 'right' }}>Today, 09:12 AM</td>
            </tr>
            <tr>
              <td style={{ padding: '15px 0' }}>Rajiv Mehta</td>
              <td>Basic</td>
              <td>₹2,388</td>
              <td><span className="badge" style={{ backgroundColor: 'rgba(255, 77, 77, 0.1)', color: 'var(--error)' }}>Failed</span></td>
              <td style={{ textAlign: 'right' }}>Yesterday, 08:30 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
