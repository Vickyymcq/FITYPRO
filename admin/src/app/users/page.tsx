'use client';

import { useState, useMemo } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { 
      id: '1', name: 'Vicky', phone: '+91 9876543210', gender: 'Male', goal: 'Fitness', 
      sessionsLeft: 18, plan: 'Standard', trainer: 'Rahul Sharma',
      bmi: '22.5', weight: '70 kg', height: '175 cm', age: '24', medical: 'None'
    },
    { 
      id: '2', name: 'Amit Kumar', phone: '+91 9123456789', gender: 'Male', goal: 'Weight Loss', 
      sessionsLeft: 5, plan: 'Basic', trainer: 'None',
      bmi: '28.1', weight: '85 kg', height: '172 cm', age: '30', medical: 'Thyroid'
    },
    { 
      id: '3', name: 'Sneha Patil', phone: '+91 8877665544', gender: 'Female', goal: 'Muscle Gain', 
      sessionsLeft: 12, plan: 'Premium', trainer: 'Priya Verma',
      bmi: '21.0', weight: '55 kg', height: '162 cm', age: '26', medical: 'Knee Pain'
    },
    { 
      id: '4', name: 'Rajesh Gupta', phone: '+91 7766554433', gender: 'Male', goal: 'Fitness', 
      sessionsLeft: 8, plan: 'Standard', trainer: 'Rahul Sharma',
      bmi: '24.2', weight: '75 kg', height: '178 cm', age: '28', medical: 'None'
    },
  ]);

  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [filterPlan, setFilterPlan] = useState('All');
  const [loading, setLoading] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search);
      const matchGender = filterGender === 'All' || u.gender === filterGender;
      const matchPlan = filterPlan === 'All' || u.plan === filterPlan;
      return matchSearch && matchGender && matchPlan;
    });
  }, [users, search, filterGender, filterPlan]);

  const handleAssignTrainer = async (userId: string) => {
    const trainerName = prompt('Enter Trainer Name to assign:');
    if (trainerName) {
      setLoading(userId);
      await new Promise(resolve => setTimeout(resolve, 800));
      setUsers(users.map(u => u.id === userId ? { ...u, trainer: trainerName } : u));
      setLoading(null);
      alert('Trainer assigned successfully.');
    }
  };

  const handleUpdateSessions = (userId: string) => {
    const count = prompt('New Session Count:');
    if (count !== null) setUsers(users.map(u => u.id === userId ? { ...u, sessionsLeft: parseInt(count) } : u));
  };

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>User Health & Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Managing <span style={{ color: 'var(--primary)' }}>{filteredUsers.length}</span> members in current view.</p>
        </div>
        <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => alert('Exporting data for current results...')}>Export Data</button>
      </header>

      {/* Filters Bar */}
      <div className="card" style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 2, minWidth: '200px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Search</p>
          <input 
            type="text" 
            placeholder="Name or Phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'var(--surface)', color: 'white' }} 
          />
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Gender</p>
          <select 
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'var(--surface)', color: 'white' }}
          >
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px' }}>Plan Type</p>
          <select 
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: 'var(--surface)', color: 'white' }}
          >
            <option>All</option>
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        </div>
        <button 
          style={{ alignSelf: 'flex-end', padding: '10px', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.8rem' }}
          onClick={() => { setSearch(''); setFilterGender('All'); setFilterPlan('All'); }}
        >
          Reset Filters
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
              <th style={{ padding: '20px' }}>Member</th>
              <th>Phone</th>
              <th>Height/Weight</th>
              <th>BMI</th>
              <th>Health Issues</th>
              <th>Plan / Sessions</th>
              <th>Trainer</th>
              <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.age} yrs • {user.gender}</div>
                </td>
                <td style={{ fontSize: '0.9rem' }}>{user.phone}</td>
                <td style={{ fontSize: '0.9rem' }}>{user.height} / {user.weight}</td>
                <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{user.bmi}</td>
                <td>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: user.medical === 'None' ? 'var(--text-muted)' : 'var(--error)',
                    backgroundColor: user.medical === 'None' ? 'transparent' : 'rgba(255, 77, 77, 0.05)',
                    padding: user.medical === 'None' ? '0' : '4px 8px',
                    borderRadius: '4px'
                  }}>
                    {user.medical}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{user.plan}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--secondary)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleUpdateSessions(user.id)}>
                    {user.sessionsLeft} Left
                  </div>
                </td>
                <td style={{ fontSize: '0.9rem', color: user.trainer === 'None' ? 'var(--error)' : 'var(--text)' }}>
                  {user.trainer}
                </td>
                <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button 
                      className="btn btn-primary" 
                      style={{ fontSize: '0.7rem', padding: '6px 10px', width: 'auto' }}
                      onClick={() => handleAssignTrainer(user.id)}
                      disabled={loading === user.id}
                    >
                      {loading === user.id ? '...' : 'Assign'}
                    </button>
                    <button 
                      className="btn btn-outline" 
                      style={{ fontSize: '0.7rem', padding: '6px 10px', color: 'var(--error)', width: 'auto' }}
                      onClick={() => confirm('Suspend ' + user.name + '?')}
                    >
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No members found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
