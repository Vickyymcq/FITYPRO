'use client';

import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: 'var(--text)' }}>
      <button onClick={() => router.back()} style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ← Back
      </button>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Terms & Conditions</h1>
      
      <div className="card" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>FittyPro – Terms & Conditions (For Clients)</p>
        
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>1. Service Usage</h3>
          <p>FittyPro provides fitness session bookings, trainer access, and subscription-based plans. Services may be updated or modified at any time.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>2. Account Responsibility</h3>
          <p>You must provide accurate details during registration. You are responsible for maintaining your account and all activities under it.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>3. Booking Policy</h3>
          <p>All sessions must be booked through the platform. Once booked, slots are subject to availability and cannot be guaranteed for changes.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>4. Payments</h3>
          <p>All payments must be made through FittyPro using approved payment methods. Direct payments to trainers are strictly prohibited.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>5. No Refund Policy</h3>
          <p>All payments are final. Refunds are not guaranteed and are only provided in exceptional cases approved by management.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>6. Health Responsibility</h3>
          <p>Users must ensure they are medically fit before participating. FittyPro is not responsible for injuries or health issues.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>7. Misuse of Platform</h3>
          <p>Any misuse, fraud, or inappropriate behavior may lead to account suspension or permanent ban.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>8. Changes to Terms</h3>
          <p>FittyPro reserves the right to update terms at any time. Continued use means acceptance of updated terms.</p>
        </section>
      </div>

      <button className="btn btn-primary mt-6" onClick={() => router.back()}>I Understand</button>
    </div>
  );
}
