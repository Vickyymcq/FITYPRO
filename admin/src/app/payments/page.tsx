'use client';

export default function PaymentTracking() {
  const transactions = [
    { id: 'RP123', user: 'Amit Kumar', plan: 'Standard x12', amount: '₹3,588', date: 'Today, 10:45 AM', status: 'Success' },
    { id: 'RP124', user: 'Sneha Patil', plan: 'Premium x24', amount: '₹14,376', date: 'Today, 09:12 AM', status: 'Success' },
    { id: 'RP125', user: 'Rajiv Mehta', plan: 'Basic x12 + Diet', amount: '₹2,587', date: 'Yesterday, 08:30 PM', status: 'Failed' },
  ];

  return (
    <div>
      <header style={{ marginBottom: '30px' }}>
        <h1>Payment Transactions</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time Razorpay transaction logs.</p>
      </header>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.id}</td>
                <td>{t.user}</td>
                <td>{t.plan}</td>
                <td><span style={{ fontWeight: 'bold' }}>{t.amount}</span></td>
                <td>{t.date}</td>
                <td>
                  <span className={`badge`} style={{ 
                    backgroundColor: t.status === 'Success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                    color: t.status === 'Success' ? 'var(--success)' : 'var(--error)'
                  }}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
