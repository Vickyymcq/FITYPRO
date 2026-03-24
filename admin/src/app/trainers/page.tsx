'use client';

import { useState } from 'react';

export default function TrainerManagement() {
  const [trainers, setTrainers] = useState([
    { id: '1', name: 'Rahul Sharma', specialization: 'Weight Loss', active: true },
    { id: '2', name: 'Priya Verma', specialization: 'Yoga & Pilates', active: true },
    { id: '3', name: 'Kabir Singh', specialization: 'Strength Training', active: false },
  ]);

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Trainer Management</h1>
        <button className="btn btn-primary">+ Add Trainer</button>
      </header>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Trainer</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.specialization}</td>
                <td>
                  <span className={`badge ${t.active ? 'success' : 'error'}`} style={{ 
                    backgroundColor: t.active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                    color: t.active ? 'var(--success)' : 'var(--error)'
                  }}>
                    {t.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>Manage Slots</button>
                    <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
