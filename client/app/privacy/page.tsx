'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: 'var(--text)' }}>
      <button onClick={() => router.back()} style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ← Back
      </button>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Privacy Policy</h1>
      
      <div className="card" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>FittyPro – Privacy Policy (For Clients)</p>
        
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>1. Data Collection</h3>
          <p>We collect name, phone number, email, and fitness-related information to provide services.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>2. Data Usage</h3>
          <p>Your data is used for bookings, communication, service improvement, and personalization.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>3. Payment Security</h3>
          <p>Payments are securely processed via Razorpay. FittyPro does not store card or banking details.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>4. Data Protection</h3>
          <p>We use secure systems to protect your data from unauthorized access or misuse.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>5. Data Sharing</h3>
          <p>We do not sell your data. It may be shared with trusted partners only for service delivery.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>6. User Rights</h3>
          <p>You may request to update or delete your data at any time.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>7. Updates</h3>
          <p>This policy may be updated periodically. Continued use implies acceptance.</p>
        </section>
      </div>

      <button className="btn btn-primary mt-6" onClick={() => router.back()}>I Understand</button>
    </div>
  );
}
