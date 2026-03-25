'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@shared/supabase';

export default function SlotManagement() {
  const [slots, setSlots] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: slotData } = await supabase.from('slots').select('*, trainers(name)');
      const { data: trainerData } = await supabase.from('trainers').select('*');
      if (slotData) setSlots(slotData);
      if (trainerData) setTrainers(trainerData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreateSlot = async () => {
    const date = prompt('Date (YYYY-MM-DD):');
    const time = prompt('Start Time (HH:MM):');
    if (date && time) {
      const { error } = await supabase.from('slots').insert({
        date,
        start_time: time + ':00',
        end_time: (parseInt(time.split(':')[0]) + 1) + ':' + time.split(':')[1] + ':00',
        capacity: 10,
        gender_filter: 'Unisex'
      });
      if (!error) window.location.reload();
    }
  };

  const handleDeleteSlot = async (id: string) => {
    if (confirm('Delete this slot?')) {
      const { error } = await supabase.from('slots').delete().eq('id', id);
      if (!error) setSlots(slots.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Production Slot Engine</h1>
        <button className="btn btn-primary" onClick={handleCreateSlot}>+ New Slot</button>
      </header>

      <div className="card" style={{ padding: 0 }}>
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '20px' }}>Date</th>
              <th>Time</th>
              <th>Gender</th>
              <th>Booked</th>
              <th>Trainer</th>
              <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>Fetching inventory...</td></tr>
            ) : slots.map(s => (
              <tr key={s.id}>
                <td style={{ padding: '20px' }}>{s.date}</td>
                <td>{s.start_time.slice(0,5)} - {s.end_time.slice(0,5)}</td>
                <td>{s.gender_filter}</td>
                <td>{s.booked_count} / {s.capacity}</td>
                <td>{s.trainers?.name || 'TBD'}</td>
                <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                  <button className="btn btn-outline" style={{ color: 'var(--error)', fontSize: '0.7rem' }} onClick={() => handleDeleteSlot(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
