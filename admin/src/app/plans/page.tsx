'use client';

import { useState } from 'react';
import { SLOT_TIMINGS } from '../../../shared/constants';

export default function SlotManagement() {
  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Slot Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Configure batches and trainer assignments.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="date" value={activeDate} onChange={(e) => setActiveDate(e.target.value)} />
          <button className="btn btn-primary">Bulk Generate Slots</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {Object.entries(SLOT_TIMINGS).map(([period, slots]) => (
          <div key={period} className="card">
            <h3 style={{ textTransform: 'capitalize', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
              {period} Slots
            </h3>
            {slots.map((slot, i) => (
              <div key={i} style={{ padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 'bold' }}>{slot.start} - {slot.end}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Trainer: Rahul Sharma</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.8rem' }}>8/10 Booked</p>
                  <button style={{ color: 'var(--secondary)', fontSize: '0.7rem', background: 'none', border: 'none', cursor: 'pointer' }}>Edit Batch</button>
                </div>
              </div>
            ))}
            <button className="btn btn-outline mt-4" style={{ width: '100%', fontSize: '0.8rem' }}>+ Add Custom Batch</button>
          </div>
        ))}
      </div>

      <div className="card mt-6" style={{ border: '1px solid var(--error)', backgroundColor: 'rgba(255, 77, 77, 0.02)' }}>
        <h3 style={{ color: 'var(--error)' }}>Business Rule Reminder</h3>
        <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
          Sundays are automatically blocked. No slots can be generated or booked for Sundays. 
          Maximum 2 batches allowed per time slot.
        </p>
      </div>

    </div>
  );
}
