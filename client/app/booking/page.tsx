'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@shared/supabase';
import { Slot } from '@shared/types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const userGender = searchParams.get('gender') || 'Unisex';
  const planId = searchParams.get('plan') || 'Standard';

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      const d = [];
      const current = new Date();
      let count = 0;
      while (count < 10) {
        if (current.getDay() !== 0) {
          d.push(current.toISOString().split('T')[0]);
          count++;
        }
        current.setDate(current.getDate() + 1);
      }
      setDates(d);
      setSelectedDate(d[0]);
    };
    init();
  }, [router]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('slots')
        .select('*, trainers(name)')
        .eq('date', selectedDate)
        .or(`gender_filter.eq.Unisex,gender_filter.eq.${userGender}`);

      if (!error) setSlots(data || []);
      setLoading(false);
    };
    fetchSlots();
  }, [selectedDate, userGender]);

  const handlePayment = async () => {
    const amount = (planId === 'Basic' ? 1990 : (planId === 'Standard' ? 2990 : 5000)) * 100;
    const { data: { user } } = await supabase.auth.getUser();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_5p9lre0u9lre',
      amount: amount,
      currency: 'INR',
      name: 'Fity Pro',
      description: `${planId} Subscription`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async function (response: any) {
        // 1. Log Payment
        const { error: paymentError } = await supabase.from('payments').insert({
          user_id: user?.id,
          razorpay_payment_id: response.razorpay_payment_id,
          amount: amount / 100,
          status: 'captured'
        });

        if (paymentError) {
          console.error('Payment Logging Error:', paymentError.message);
        }

        // 2. Create Booking
        const { error: bookingError } = await supabase.from('bookings').insert({
          user_id: user?.id,
          slot_id: selectedSlotId,
          payment_id: response.razorpay_payment_id
        });

        // 3. Update Slot Count
        await supabase.rpc('increment_slot_count', { row_id: selectedSlotId });

        if (!bookingError) {
          alert('Booking Successful!');
          router.push('/dashboard');
        } else {
          alert('Booking Error: ' + bookingError.message);
        }
      },
      prefill: { email: user?.email },
      theme: { color: '#7AC943' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1>Choose Your Session</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time availability for {selectedDate}</p>
      </header>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3>Select Date</h3>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0' }}>
          {dates.map(date => (
            <div 
              key={date} 
              className={`card ${selectedDate === date ? 'selected' : ''}`}
              style={{ 
                minWidth: '70px', textAlign: 'center', padding: '12px', cursor: 'pointer',
                border: selectedDate === date ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                backgroundColor: selectedDate === date ? 'rgba(122, 201, 67, 0.1)' : 'var(--surface)'
              }}
              onClick={() => setSelectedDate(date)}
            >
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{new Date(date).getDate()}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '40px' }}>
        <h3>Available Slots</h3>
        {loading ? <p>Loading real slots...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginTop: '20px' }}>
            {slots.length > 0 ? slots.map(slot => (
              <button 
                key={slot.id}
                disabled={slot.booked_count >= slot.capacity}
                className={`btn ${selectedSlotId === slot.id ? 'btn-primary' : 'btn-outline'}`}
                style={{ textAlign: 'left', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setSelectedSlotId(slot.id)}
              >
                <div>
                  <div style={{ fontWeight: 'bold' }}>{slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Trainer: {slot.trainers?.name || 'Assigned Soon'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '0.8rem' }}>{slot.capacity - slot.booked_count} spots left</div>
                </div>
              </button>
            )) : <p style={{ color: 'var(--text-muted)' }}>No slots available.</p>}
          </div>
        )}
      </div>

      <button className="btn btn-primary" disabled={!selectedSlotId} onClick={handlePayment}>Pay & Confirm Booking</button>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading sessions...</div>}>
      <BookingContent />
    </Suspense>
  );
}
