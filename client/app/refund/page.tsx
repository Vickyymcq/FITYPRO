'use client';

import { useRouter } from 'next/navigation';

export default function RefundPage() {
  const router = useRouter();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: 'var(--text)' }}>
      <button onClick={() => router.back()} style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ← Back
      </button>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Refund Policy</h1>
      
      <div className="card" style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>FittyPro – Client Refund Policy</p>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
            <span style={{ color: 'var(--error)' }}>•</span>
            No refunds after booking
          </li>
          <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
            <span style={{ color: 'var(--error)' }}>•</span>
            No refund for missed sessions
          </li>
          <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
            <span style={{ color: 'var(--primary)' }}>•</span>
            Rescheduling only if approved
          </li>
          <li style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
            <span style={{ color: 'var(--secondary)' }}>•</span>
            Credits may be provided instead of refund
          </li>
        </ul>
      </div>

      <button className="btn btn-primary mt-6" onClick={() => router.back()}>I Understand</button>
    </div>
  );
}
