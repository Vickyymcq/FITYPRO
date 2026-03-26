// Shared Types for Fity Pro

export type UserRole = 'client' | 'admin';

export interface Profile {
  id: string;
  name: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Unisex';
  age: number;
  height: number;
  weight: number;
  goal: 'Weight Loss' | 'Muscle Gain' | 'Fitness';
  medical_issues: string;
  experience_level: string;
  marketing_source: string;
  role: UserRole;
  email?: string;
  created_at: string;
  subscriptions?: Subscription[];
  trainers?: { name: string };
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  is_active: boolean;
  created_at: string;
}

export interface Plan {
  id: string;
  title: string;
  price_per_session: number;
  capacity: number;
  is_1on1: boolean;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  total_sessions: number;
  remaining_sessions: number;
  status: 'active' | 'expired' | 'cancelled';
  diet_plan_included: boolean;
  created_at: string;
}

export interface Slot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
  gender_filter: 'Male' | 'Female' | 'Unisex';
  trainer_id?: string;
  batch_name?: string;
  meet_link?: string;
  trainers?: { name: string };
}

export interface Booking {
  id: string;
  user_id: string;
  slot_id: string;
  attendance_status: 'booked' | 'completed' | 'cancelled' | 'no-show';
  payment_id?: string;
  created_at: string;
  profiles?: { name: string };
  slots?: Slot;
}
