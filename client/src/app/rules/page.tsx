'use client';

import { useRouter } from 'next/navigation';

export default function RulesPage() {
  const router = useRouter();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: 'var(--text)' }}>
      <button onClick={() => router.back()} style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ← Back
      </button>
      <h1 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Rules & Regulations</h1>
      
      <div className="card" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
        <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>FittyPro – Client Rules</p>
        
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>1. Timings</h3>
          <p>Clients must attend sessions on time. Late entry may not be allowed.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>2. Discipline</h3>
          <p>Respect trainers and other users. Any misconduct will lead to removal.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>3. Slot Usage</h3>
          <p>Booked slots must be used within the validity period. Expired sessions will not be extended.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>4. No Transfer Policy</h3>
          <p>Plans and sessions are non-transferable.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>5. Health Declaration</h3>
          <p>Clients must inform trainers of any medical issues before starting sessions.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>6. No Recording</h3>
          <p>Recording sessions without permission is strictly prohibited.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '10px' }}>7. Platform Use Only</h3>
          <p>All communication and payments must remain within FittyPro.</p>
        </section>

        <hr style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '30px 0' }} />

        <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>During Session Guidelines</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Join sessions on time</li>
          <li style={{ marginBottom: '8px' }}>Follow trainer instructions strictly</li>
          <li style={{ marginBottom: '8px' }}>Avoid distractions and maintain discipline</li>
          <li style={{ marginBottom: '8px' }}>Inform trainer immediately if you feel discomfort</li>
          <li style={{ marginBottom: '8px' }}>Wear proper workout attire</li>
          <li style={{ marginBottom: '8px' }}>Respect all participants</li>
        </ul>

        <p style={{ marginTop: '20px', fontWeight: 'bold', color: 'var(--error)' }}>👉 Important: Participation is at your own risk.</p>
      </div>

      <button className="btn btn-primary mt-6" onClick={() => router.back()}>I Understand</button>
    </div>
  );
}
