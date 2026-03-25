'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@shared/supabase';

export default function HealthCheckPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    goal: 'Weight Loss',
    medical_issues: 'None',
    experience_level: 'Beginner',
    source: 'Instagram'
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push('/login');
    };
    checkUser();
  }, [router]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return alert('Session expired. Please login again.');

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      name: formData.name,
      phone: formData.phone,
      age: parseInt(formData.age),
      gender: formData.gender,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      goal: formData.goal,
      medical_issues: formData.medical_issues,
      experience_level: formData.experience_level,
      marketing_source: formData.source
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      localStorage.setItem('hasFilledHealthChart', 'true');
      router.push(`/plans?gender=${formData.gender}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'var(--primary)' }}>Health Assessment</h1>
        <p style={{ color: 'var(--text-muted)' }}>Step {step} of 3</p>
      </header>

      <div className="card">
        {step === 1 && (
          <div>
            <h3>Basic Information</h3>
            <div className="input-group mt-4">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="input-group mt-4">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 9876543210" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <button className="btn btn-primary mt-4" onClick={nextStep} disabled={!formData.name || !formData.phone}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Vitals & Goal</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="input-group mt-4">
                <label>Age</label>
                <input type="number" placeholder="25" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
              </div>
              <div className="input-group mt-4">
                <label>Gender</label>
                <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="input-group mt-4">
                <label>Height (cm)</label>
                <input type="number" placeholder="175" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
              </div>
              <div className="input-group mt-4">
                <label>Weight (kg)</label>
                <input type="number" placeholder="70" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
              </div>
            </div>
            <div className="input-group mt-4">
              <label>Primary Goal</label>
              <select value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})}>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Fitness</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline mt-4" onClick={prevStep}>Back</button>
              <button className="btn btn-primary mt-4" onClick={nextStep} disabled={!formData.age || !formData.height || !formData.weight}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Final Details</h3>
            <div className="input-group mt-4">
              <label>Medical Issues (if any)</label>
              <textarea placeholder="Thyroid, Knee Pain, etc. Or 'None'" value={formData.medical_issues} onChange={(e) => setFormData({...formData, medical_issues: e.target.value})} style={{ width: '100%', minHeight: '80px', padding: '10px', borderRadius: '8px', background: 'var(--surface)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
            <div className="input-group mt-4">
              <label>Experience Level</label>
              <select value={formData.experience_level} onChange={(e) => setFormData({...formData, experience_level: e.target.value})}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="input-group mt-4">
              <label>How did you hear about us?</label>
              <select value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})}>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>YouTube</option>
                <option>Friend Recommendation</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline mt-4" onClick={prevStep}>Back</button>
              <button className="btn btn-primary mt-4" onClick={handleSubmit} disabled={loading}>{loading ? 'Saving...' : 'Submit Assessment'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
