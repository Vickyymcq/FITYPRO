'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@shared/supabase';
import { Slot, Trainer } from '@shared/types';

export default function SlotManagement() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
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

  const handleGenerateAutoSlots = async () => {
    if (!confirm('Generate standard 7-day schedule (Morning/Afternoon/Evening)?')) return;
    setLoading(true);
    const days = 7;
    const morning = ['06:00', '07:00', '08:00'];
    const afternoon = ['10:00', '11:00'];
    const evening = ['18:00', '19:00'];
    
    const newSlots: Partial<Slot>[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      [...morning, ...afternoon, ...evening].forEach(startTime => {
        const startHour = parseInt(startTime.split(':')[0]);
        newSlots.push({
          date: dateStr,
          start_time: startTime + ':00',
          end_time: (startHour + 1).toString().padStart(2, '0') + ':00:00',
          capacity: 10,
          gender_filter: 'Unisex'
        });
      });
    }

    const { error } = await supabase.from('slots').insert(newSlots);
    if (error) alert(error.message);
    else window.location.reload();
    setLoading(false);
  };

  const handleAssignTrainer = async (slotId: string, trainerId: string) => {
    const { error } = await supabase.from('slots').update({ trainer_id: trainerId }).eq('id', slotId);
    if (!error) {
      setSlots(slots.map(s => s.id === slotId ? { ...s, trainer_id: trainerId, trainers: trainers.find(t => t.id === trainerId) } : s));
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={handleGenerateAutoSlots} disabled={loading}>Generate 7-Day Schedule</button>
          <button className="btn btn-primary" onClick={handleCreateSlot}>+ New Slot</button>
        </div>
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
                <td>
                  <select 
                    value={s.trainer_id || ''} 
                    onChange={(e) => handleAssignTrainer(s.id, e.target.value)}
                    style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.75rem', padding: '5px', borderRadius: '4px' }}
                  >
                    <option value="">Unassigned</option>
                    {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </td>
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
