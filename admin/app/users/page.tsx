'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@shared/supabase';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*, subscriptions(*), trainers(name)')
        .order('created_at', { ascending: false });

      if (!error) setUsers(data || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchSearch = (u.name || '').toLowerCase().includes(search.toLowerCase()) || (u.phone || '').includes(search);
      const matchGender = filterGender === 'All' || u.gender === filterGender;
      return matchSearch && matchGender;
    });
  }, [users, search, filterGender]);

  const handleUpdateSessions = async (userId: string, current: number) => {
    const count = prompt('Set remaining sessions:', current.toString());
    if (count !== null) {
      const { error } = await supabase
        .from('subscriptions')
        .update({ remaining_sessions: parseInt(count) })
        .eq('user_id', userId);
      
      if (!error) {
        setUsers(users.map(u => u.id === userId ? { ...u, subscriptions: [{ ...u.subscriptions[0], remaining_sessions: parseInt(count) }] } : u));
        alert('Updated successfully.');
      }
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '30px' }}>
        <h1>Real-time Member Audit</h1>
        <p style={{ color: 'var(--text-muted)' }}>Connected to live production database.</p>
      </header>

      <div className="card" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Search Name/Phone..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 2, padding: '10px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
        />
        <select 
          value={filterGender} 
          onChange={(e) => setFilterGender(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
        >
          <option>All</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', minWidth: '1000px' }}>
          <thead>
            <tr style={{ textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '20px' }}>Member</th>
              <th>Phone</th>
              <th>Health Stats</th>
              <th>BMI</th>
              <th>Issues</th>
              <th>Sessions</th>
              <th>Trainer</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>Fetching live data...</td></tr>
            ) : filteredUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 'bold' }}>{user.name || 'Anonymous'}</div>
                  <div style={{ fontSize: '0.7rem' }}>{user.age || '?'} yrs • {user.gender || 'Not set'}</div>
                </td>
                <td style={{ fontSize: '0.9rem' }}>{user.phone || '-'}</td>
                <td style={{ fontSize: '0.85rem' }}>{user.height}cm / {user.weight}kg</td>
                <td style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                  {user.height && user.weight ? (user.weight / ((user.height/100)**2)).toFixed(1) : '-'}
                </td>
                <td>
                  <span style={{ fontSize: '0.75rem', color: user.medical_issues === 'None' ? 'var(--text-muted)' : 'var(--error)' }}>
                    {user.medical_issues || 'None'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div 
                      style={{ fontWeight: 'bold', color: 'var(--secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                      onClick={() => handleUpdateSessions(user.id, user.subscriptions?.[0]?.remaining_sessions || 0)}
                    >
                      {user.subscriptions?.[0]?.remaining_sessions || 0} Left
                    </div>
                    <button 
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete member ${user.name}? This will remove all their data.`)) {
                          const { error } = await supabase.from('profiles').delete().eq('id', user.id);
                          if (!error) {
                            setUsers(users.filter(u => u.id !== user.id));
                            alert('User deleted.');
                          } else {
                            alert('Error: ' + error.message);
                          }
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '0.75rem', padding: '5px' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td>{user.trainers?.name || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
