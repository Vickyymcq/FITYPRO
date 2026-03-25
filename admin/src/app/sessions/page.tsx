'use client';

import { useState } from 'react';

export default function SessionManagement() {
  const [sessions, setSessions] = useState([
    { id: '1', user: 'Vicky', slot: '07:00 - 08:00 AM', status: 'booked', trainer: 'Rahul Sharma', meet: 'https://meet.google.com/abc-defg-hij' },
    { id: '2', user: 'Amit Kumar', slot: '08:00 - 09:00 AM', status: 'completed', trainer: 'Rahul Sharma', meet: 'https://meet.google.com/def-ghik-lmn' },
    { id: '3', user: 'Sneha Patil', slot: '06:00 - 07:00 PM', status: 'no-show', trainer: 'Priya Verma', meet: 'https://meet.google.com/pqr-stuv-wxy' },
  ]);

  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);

  const handleOverrideLink = (id: string, user: string) => {
    const newLink = prompt('Enter new Google Meet link for ' + user + ':');
    if (newLink && newLink.startsWith('http')) {
      setSessions(sessions.map(s => s.id === id ? { ...s, meet: newLink } : s));
      alert('Meet link updated successfully.');
    } else if (newLink) {
      alert('Invalid URL. Please enter a full link (https://...)');
    }
  };

  const handleReschedule = () => {
    alert('Reschedule window opened. All users for ' + activeDate + ' will be notified via SMS.');
  };

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Daily Sessions</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tracking real-time attendance and meet links.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="date" 
            value={activeDate} 
            onChange={(e) => setActiveDate(e.target.value)}
            style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'var(--surface)', color: 'white' }}
          />
          <button className="btn btn-primary" onClick={handleReschedule}>Reschedule All</button>
        </div>
      </header>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
              <th style={{ padding: '20px' }}>Time Slot</th>
              <th>Client</th>
              <th>Trainer</th>
              <th>Attendance</th>
              <th>Meet Link</th>
              <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '20px', fontWeight: 'bold' }}>{s.slot}</td>
                <td>{s.user}</td>
                <td>{s.trainer}</td>
                <td>
                  <select 
                    value={s.status} 
                    onChange={(e) => {
                      const newSessions = sessions.map(sess => sess.id === s.id ? {...sess, status: e.target.value} : sess);
                      setSessions(newSessions);
                    }}
                    style={{ padding: '6px', borderRadius: '6px', fontSize: '0.8rem', background: 'var(--surface)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No-Show</option>
                  </select>
                </td>
                <td>
                  <a href={s.meet} target="_blank" style={{ color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '600' }}>
                    Open Meet ↗
                  </a>
                </td>
                <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                  <button 
                    className="btn btn-outline" 
                    style={{ fontSize: '0.7rem', padding: '6px 12px', width: 'auto' }} 
                    onClick={() => handleOverrideLink(s.id, s.user)}
                  >
                    Override Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
