'use client';

import { useState, useMemo } from 'react';

export default function PaymentTracking() {
  const [transactions, setTransactions] = useState([
    { id: 'RP123', user: 'Amit Kumar', plan: 'Standard x12', amount: '₹3,588', date: 'Today, 10:45 AM', status: 'Success' },
    { id: 'RP124', user: 'Sneha Patil', plan: 'Premium x24', amount: '₹14,376', date: 'Today, 09:12 AM', status: 'Success' },
    { id: 'RP125', user: 'Rajiv Mehta', plan: 'Basic x12 + Diet', amount: '₹2,587', date: 'Yesterday, 08:30 PM', status: 'Failed' },
    { id: 'RP126', user: 'Vicky', plan: 'Standard x5', amount: '₹2,990', date: 'Yesterday, 11:20 AM', status: 'Refunded' },
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => statusFilter === 'All' || t.status === statusFilter);
  }, [transactions, statusFilter]);

  const handleRefund = async (id: string, user: string) => {
    if (confirm('Initiate full refund for ' + user + ' (ID: ' + id + ')?')) {
      setLoadingId(id);
      await new Promise(resolve => setTimeout(resolve, 800));
      setTransactions(transactions.map(t => t.id === id ? { ...t, status: 'Refunded' } : t));
      setLoadingId(null);
      alert('Refund processed successfully.');
    }
  };

  const handleVerify = async (id: string) => {
    setLoadingId(id + '-v');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoadingId(null);
    alert('Transaction verified.');
  };

  return (
    <div>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Payment Transactions</h1>
          <p style={{ color: 'var(--text-muted)' }}>Logs for all <span style={{ color: 'var(--primary)' }}>{filteredTransactions.length}</span> transactions.</p>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Filter Status:</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['All', 'Success', 'Failed', 'Refunded'].map(status => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`btn ${statusFilter === status ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem', padding: '6px 15px', color: statusFilter === status ? '#000' : 'var(--text)' }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
              <th style={{ padding: '20px' }}>ID</th>
              <th>Client</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? filteredTransactions.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.id}</td>
                <td style={{ fontWeight: 'bold' }}>{t.user}</td>
                <td>{t.plan}</td>
                <td><span style={{ fontWeight: 'bold' }}>{t.amount}</span></td>
                <td style={{ fontSize: '0.85rem' }}>{t.date}</td>
                <td>
                  <span className={`badge`} style={{ 
                    backgroundColor: t.status === 'Success' ? 'rgba(34, 197, 94, 0.1)' : (t.status === 'Refunded' ? 'rgba(63, 169, 245, 0.1)' : 'rgba(255, 77, 77, 0.1)'),
                    color: t.status === 'Success' ? 'var(--success)' : (t.status === 'Refunded' ? 'var(--secondary)' : 'var(--error)'),
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem'
                  }}>
                    {t.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                   <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                     <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px', width: 'auto' }} onClick={() => handleVerify(t.id)} disabled={loadingId === t.id + '-v'}>
                        {loadingId === t.id + '-v' ? '...' : 'Verify'}
                     </button>
                     {t.status === 'Success' && (
                       <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '4px 8px', width: 'auto', color: 'var(--error)' }} onClick={() => handleRefund(t.id, t.user)} disabled={loadingId === t.id}>
                         {loadingId === t.id ? '...' : 'Refund'}
                       </button>
                     )}
                   </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No transactions found for this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
