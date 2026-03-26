'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PLANS, SESSION_OPTIONS } from '@shared/constants';

function PlansContent() {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1].id);
  const [selectedSessions, setSelectedSessions] = useState(12);
  const [addDietPlan, setAddDietPlan] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userGender, setUserGender] = useState('Male');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const healthFilled = localStorage.getItem('hasFilledHealthChart');
    const storedGender = localStorage.getItem('userGender');
    
    if (!loggedIn) {
      router.push('/login');
    } else if (!healthFilled) {
      router.push('/health-check');
    }
    
    if (storedGender) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserGender(storedGender);
    } else if (searchParams.get('gender')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserGender(searchParams.get('gender')!);
    }
  }, [router, searchParams]);

  const currentPlan = PLANS.find(p => p.id === selectedPlan) || PLANS[1];
  const totalPrice = (currentPlan.price * selectedSessions) + (addDietPlan ? 199 : 0);

  const handleProceed = () => {
    router.push(`/booking?plan=${selectedPlan}&sessions=${selectedSessions}&diet=${addDietPlan}&gender=${userGender}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary)' }}>Choose Your Plan</h1>
        <p style={{ color: 'var(--text-muted)' }}>Select the package that fits your goals.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {PLANS.filter(p => p.id !== 'diet').map((plan) => (
          <div 
            key={plan.id} 
            className="card" 
            style={{ 
              border: selectedPlan === plan.id ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {selectedPlan === plan.id && (
              <div style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '10px', 
                backgroundColor: 'var(--primary)', 
                color: '#000', 
                padding: '2px 10px', 
                borderRadius: '10px',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>SELECTED</div>
            )}
            <h3 style={{ marginBottom: '10px' }}>{plan.name}</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
              ₹{plan.price} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ session</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {plan.features?.map((f, i) => <li key={i}>✓ {f}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '40px' }}>
        <h3>Select Session Count</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          {SESSION_OPTIONS.map((opt) => (
            <button 
              key={opt.count}
              className={`btn ${selectedSessions === opt.count ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1 }}
              onClick={() => setSelectedSessions(opt.count)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Sessions available Monday–Saturday only. No Sunday classes.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h3 style={{ color: 'var(--secondary)' }}>Add Diet Plan PDF</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Get a personalized nutritional guide for just ₹199</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 'bold' }}>₹199</span>
          <input 
            type="checkbox" 
            checked={addDietPlan} 
            onChange={(e) => setAddDietPlan(e.target.checked)}
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: '20px', backgroundColor: 'var(--surface)', padding: '20px', borderRadius: '16px', border: '1px solid var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Amount</p>
          <h2 style={{ color: 'var(--primary)' }}>₹{totalPrice}</h2>
        </div>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '12px 40px' }} onClick={handleProceed}>
          Proceed to Booking
        </button>
      </div>
    </div>
  );
}

export default function PlansPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading plans...</div>}>
      <PlansContent />
    </Suspense>
  );
}
