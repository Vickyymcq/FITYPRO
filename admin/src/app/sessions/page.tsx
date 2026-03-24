'use client';

import { useState } from 'react';

export default function SessionManagement() {
  const [sessions, setSessions] = useState([
    { id: '1', user: 'Vicky', slot: '07:00 - 08:00 AM', status: 'booked', trainer: 'Rahul Sharma', meet: 'https://meet.google.com/abc' },
    { id: '2', user: 'Amit Kumar', slot: '08:00 - 09:00 AM', status: 'completed', trainer: 'Rahul Sharma', meet: 'https://meet.google.com/def' },
    { id: '3', user: 'Sneha Patil', slot: '06:00 - 07:00 PM', status: 'no-show', trainer: 'Priya Verma', meet: 'https://meet.google.com/ghi' },
  ]);

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Daily Sessions</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          <button className="btn btn-outline">Reschedule All</button>
        </div>
      </header>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Time Slot</th>
              <th>Client</th>
              <th>Trainer</th>
              <th>Attendance</th>
              <th>Meet Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s.id}>
                <td>{s.slot}</td>
                <td>{s.user}</td>
                <td>{s.trainer}</td>
                <td>
                  <select 
                    value={s.status} 
                    onChange={(e) => {
                      const newSessions = sessions.map(sess => sess.id === s.id ? {...sess, status: e.target.value as any} : sess);
                      setSessions(newSessions);
                    }}
                    style={{ padding: '4px', fontSize: '0.8rem' }}
                  >
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No-Show</option>
                  </select>
                </td>
                <td><a href={s.meet} target="_blank" style={{ color: 'var(--secondary)', fontSize: '0.8rem' }}>Open Link</a></td>
                <td>
                  <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>Override Link</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
