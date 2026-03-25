'use client';

import { useState } from 'react';

export default function TrainerManagement() {
  const [trainers, setTrainers] = useState([
    { id: '1', name: 'Rahul Sharma', specialization: 'Weight Loss', active: true, phone: '+91 9988776655' },
    { id: '2', name: 'Priya Verma', specialization: 'Yoga & Pilates', active: true, phone: '+91 8877665544' },
    { id: '3', name: 'Kabir Singh', specialization: 'Strength Training', active: false, phone: '+91 7766554433' },
  ]);

  const [loading, setLoading] = useState<string | null>(null);

  const handleToggleStatus = (id: string) => {
    setTrainers(trainers.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const handleAddTrainer = () => {
    const name = prompt('Enter Trainer Name:');
    if (name) {
      const newTrainer = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        specialization: prompt('Specialization:') || 'Fitness',
        active: true,
        phone: prompt('Phone Number:') || '+91 '
      };
      setTrainers([...trainers, newTrainer]);
      alert('Trainer ' + name + ' added successfully.');
    }
  };

  const handleDeleteTrainer = (id: string, name: string) => {
    if (confirm('Are you sure you want to remove ' + name + ' from the platform?')) {
      setTrainers(trainers.filter(t => t.id !== id));
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Trainer Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Oversee your team of certified professionals.</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddTrainer}>+ Add Trainer</button>
      </header>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
              <th style={{ padding: '20px' }}>Trainer</th>
              <th>Specialization</th>
              <th>Contact</th>
              <th>Status</th>
              <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '20px', fontWeight: 'bold' }}>{t.name}</td>
                <td>{t.specialization}</td>
                <td style={{ fontSize: '0.85rem' }}>{t.phone}</td>
                <td>
                  <span 
                    onClick={() => handleToggleStatus(t.id)}
                    className={`badge ${t.active ? 'success' : 'error'}`} 
                    style={{ 
                      backgroundColor: t.active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                      color: t.active ? 'var(--success)' : 'var(--error)',
                      cursor: 'pointer'
                    }}
                  >
                    {t.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '6px 12px', width: 'auto' }} onClick={() => alert('Editing data for ' + t.name)}>Edit</button>
                    <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '6px 12px', color: 'var(--error)', width: 'auto' }} onClick={() => handleDeleteTrainer(t.id, t.name)}>Remove</button>
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
