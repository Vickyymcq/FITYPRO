'use client';

import { useState } from 'react';
import { SLOT_TIMINGS, PLANS } from '@shared/constants';

export default function SlotManagement() {
  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState(SLOT_TIMINGS);

  const handleGenerate = async () => {
    const d = new Date(activeDate);
    if (d.getDay() === 0) {
      alert('Error: Slots cannot be generated for Sundays.');
      return;
    }

    setLoading(true);
    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 800));
    alert('Successfully generated ' + Object.keys(SLOT_TIMINGS).length * 2 + ' slots for ' + activeDate);
    setLoading(false);
  };

  const handleEditBatch = (period: string, index: number) => {
    const newName = prompt('Enter new batch name (e.g., Morning Blitz, Power Hour):');
    if (newName) {
       alert('Batch name updated to: ' + newName);
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Slot Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Configure batches and trainer assignments.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="date" 
            value={activeDate} 
            onChange={(e) => setActiveDate(e.target.value)} 
            style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'var(--surface)', color: 'white' }}
          />
          <button 
            className="btn btn-primary" 
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Bulk Generate Slots'}
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {Object.entries(slots).map(([period, timeSlots]) => (
          <div key={period} className="card">
            <h3 style={{ textTransform: 'capitalize', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', color: 'var(--primary)' }}>
              {period} Slots
            </h3>
            {timeSlots.map((slot: any, i: number) => {
              const plan = i % 2 === 0 ? PLANS[0] : PLANS[1]; // Alternating Basic/Standard for demo
              return (
                <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{slot.start} - {slot.end}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Trainer: <span style={{ color: 'var(--secondary)' }}>Rahul Sharma</span>
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{i + 3}</span> / {plan.capacity} Booked
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                       <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                        {plan.name}
                      </span>
                      <button 
                        onClick={() => handleEditBatch(period, i)}
                        style={{ color: 'var(--secondary)', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <button 
              className="btn btn-outline mt-6" 
              style={{ width: '100%', fontSize: '0.85rem', borderStyle: 'dashed' }}
              onClick={() => alert('Add Custom Batch functionality coming soon.')}
            >
              + Add Custom Batch
            </button>
          </div>
        ))}
      </div>

      <div className="card mt-10" style={{ borderLeft: '4px solid var(--error)', backgroundColor: 'rgba(255, 77, 77, 0.05)' }}>
        <h3 style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚠️ Critical Business Rules
        </h3>
        <ul style={{ fontSize: '0.9rem', marginTop: '12px', color: 'var(--text)', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><b>Sundays:</b> Restricted. No slot generation or booking allowed.</li>
          <li style={{ marginBottom: '8px' }}><b>Capacities:</b> Basic (10), Standard (5), Premium (1). Over-booking is disabled automatically.</li>
        </ul>
      </div>

    </div>
  );
}
