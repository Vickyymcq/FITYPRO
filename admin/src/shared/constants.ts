// Shared Constants for Fity Pro

export const BRAND_NAME = "Fity Pro";
export const TAGLINE = "Train Anytime Anywhere";

export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 199,
    capacity: 10,
    features: ["Group Session", "10 Members Max"]
  },
  {
    id: "standard",
    name: "Standard",
    price: 299,
    capacity: 5,
    features: ["Small Group", "5 Members Max"]
  },
  {
    id: "premium",
    name: "Premium",
    price: 599,
    capacity: 1,
    features: ["1:1 Personal Training", "Individual Attention"]
  },
  {
    id: "diet",
    name: "Diet Plan",
    price: 199,
    features: ["Personalized PDF", "Weekly Updates"]
  }
];

export const SESSION_OPTIONS = [
  { count: 1, label: "1 Session" },
  { count: 12, label: "12 Sessions" },
  { count: 24, label: "24 Sessions" }
];

export const SLOT_TIMINGS = {
  morning: [
    { start: "06:00", end: "07:00" },
    { start: "07:00", end: "08:00" },
    { start: "08:00", end: "09:00" }
  ],
  afternoon: [
    { start: "10:00", end: "11:00" },
    { start: "11:00", end: "12:00" },
    { start: "12:00", end: "13:00" }
  ],
  evening: [
    { start: "18:00", end: "19:00" },
    { start: "19:00", end: "20:00" },
    { start: "20:00", end: "21:00" },
    { start: "21:00", end: "22:00" }
  ]
};

export const MARKETING_SOURCES = [
  "Instagram",
  "Facebook",
  "Google",
  "YouTube",
  "Friends"
];

export const BUSINESS_RULES = {
  MAX_BATCHES_PER_SLOT: 2,
  CANCELLATION_WINDOW_HOURS: 2,
  NO_SESSIONS_ON_SUNDAYS: true,
  STRICT_NO_REFUND: true
};
