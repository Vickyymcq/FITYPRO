// Fity Pro Business Constants

export const BRAND_NAME = 'Fity Pro';
export const TAGLINE = 'Train Anytime Anywhere';

export const COLORS = {
  primary: '#7AC943', // Lime Green
  secondary: '#3FA9F5', // Sky Blue
  background: '#0F1419',
  surface: '#1A1F26',
  text: '#FFFFFF',
  textMuted: '#94A3B8',
  error: '#FF4D4D',
  success: '#22C55E',
};

export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 199,
    capacity: 10,
    features: ['10 Members per batch', 'Group Sessions', 'Basic Progress Tracking'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 299,
    capacity: 5,
    features: ['5 Members per batch', 'Small Group Focus', 'Detailed Progress Tracking'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999, // Assuming a premium price, user said "1 and 1"
    capacity: 1,
    is1on1: true,
    features: ['1-on-1 Special Care', 'Personalized Training', 'Diet Plan Included', '24/7 Support'],
  },
];

export const SESSION_OPTIONS = [
  { count: 1, label: '1 Session (Trial)' },
  { count: 12, label: '12 Sessions' },
  { count: 24, label: '24 Sessions (Recommended)' },
];

export const DIET_PLAN_ADDON = 599;

export const SLOT_TIMINGS = {
  morning: [
    { start: '06:00', end: '07:00' },
    { start: '07:00', end: '08:00' },
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
  ],
  evening: [
    { start: '05:00', end: '06:00' },
    { start: '06:00', end: '07:00' },
    { start: '07:00', end: '08:00' },
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
  ],
};

export const BUSINESS_RULES = {
  maxBatchesPerSlot: 2,
  cancellationWindowHours: 2,
  allowSundays: false,
};
