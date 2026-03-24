'use client';

import { useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: '1', name: 'Vicky', phone: '9876543210', gender: 'Male', goal: 'Fitness', sessionsLeft: 18, role: 'client' },
    { id: '2', name: 'Amit Kumar', phone: '9123456789', gender: 'Male', goal: 'Weight Loss', sessionsLeft: 5, role: 'client' },
    { id: '3', name: 'Sneha Patil', phone: '8877665544', gender: 'Female', goal: 'Muscle Gain', sessionsLeft: 12, role: 'client' },
  ]);

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>User Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Search users..." style={{ width: '250px' }} />
          <button className="btn btn-outline">Export CSV</button>
        </div>
      </header>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Goal</th>
              <th>Sessions Left</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.gender}</div>
                </td>
                <td>{user.phone}</td>
                <td><span className="badge" style={{ backgroundColor: 'rgba(63, 169, 245, 0.1)', color: 'var(--secondary)' }}>{user.goal}</span></td>
                <td>{user.sessionsLeft}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>Edit</button>
                    <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px', color: 'var(--error)' }}>Delete</button>
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
