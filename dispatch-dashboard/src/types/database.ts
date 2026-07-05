// ═══════════════════════════════════════════════════════════════════
// DATABASE TYPES — mirrors the Supabase PostgreSQL schema
// ═══════════════════════════════════════════════════════════════════

import type { UserRole } from './navigation';

// ── Enum types (from SQL custom types) ─────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'en_route_pickup'
  | 'arrived_pickup'
  | 'in_transit'
  | 'arrived_dropoff'
  | 'completed'
  | 'cancelled';

export type WalletType =
  | 'main'
  | 'commission'
  | 'escrow'
  | 'bonus'
  | 'referral'
  | 'savings';

export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

// ── Core Profile ───────────────────────────────────────────────────

export interface Profile {
  id: string; // UUID, FK → auth.users
  role: UserRole;
  full_name: string;
  phone_number: string | null;
  avatar_url: string | null;
  created_at: string; // ISO 8601
}

// ── Rider extension ────────────────────────────────────────────────

export interface Rider {
  id: string; // UUID, FK → profiles
  bvn: string | null;
  nin: string | null;
  drivers_license_url: string | null;
  is_verified: boolean;
  fleet_owner_id: string | null; // FK → profiles
  current_location: [number, number] | null; // [lng, lat] from PostGIS
  updated_at: string;
}

// ── Vendor extension ───────────────────────────────────────────────

export interface Vendor {
  id: string; // UUID, FK → profiles
  business_name: string;
  business_address: string | null;
  api_key: string | null;
  is_verified: boolean;
  created_at: string;
}

// ── Fleet: Vehicle ─────────────────────────────────────────────────

export interface Vehicle {
  id: string; // UUID PK
  fleet_owner_id: string; // FK → profiles
  assigned_rider_id: string | null; // FK → riders
  plate_number: string;
  model: string | null;
  fuel_allowance_daily: number;
  next_maintenance_date: string | null;
  created_at: string;
}

// ── Orders ─────────────────────────────────────────────────────────

export interface Order {
  id: string; // UUID PK
  tracking_code: string;

  // Stakeholders
  customer_id: string | null;
  vendor_id: string | null;
  rider_id: string | null;

  // Status & location
  status: OrderStatus;
  pickup_address: string;
  pickup_coords: [number, number] | null;
  dropoff_address: string;
  dropoff_coords: [number, number] | null;

  // Delivery verification
  otp_code: string | null;
  proof_of_delivery_url: string | null;
  signature_url: string | null;
  verification_gps: [number, number] | null;
  verification_timestamp: string | null;

  // Financial
  delivery_fee: number;
  item_description: string | null;

  created_at: string;
  updated_at: string;
}

// ── Fintech: Wallet ────────────────────────────────────────────────

export interface Wallet {
  id: string; // UUID PK
  user_id: string; // FK → profiles
  wallet_type: WalletType;
  balance: number;
  created_at: string;
}

// ── Fintech: Transaction ───────────────────────────────────────────

export interface Transaction {
  id: string; // UUID PK
  wallet_id: string; // FK → wallets
  order_id: string | null; // FK → orders
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string | null;
  created_at: string;
}

// ── Communication: Chat ────────────────────────────────────────────

export interface ChatMessage {
  id: string; // UUID PK
  order_id: string; // FK → orders
  sender_id: string | null; // FK → profiles
  message_text: string | null;
  media_url: string | null;
  is_read: boolean;
  created_at: string;
}
