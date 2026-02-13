/*
  # CrewDirect Platform Database Schema

  ## Overview
  Complete database schema for the CrewDirect event manpower booking platform.
  This migration sets up all core tables with proper security policies.

  ## New Tables

  ### 1. `profiles`
  User profiles extending Supabase auth.users
  - `id` (uuid, FK to auth.users) - Primary key
  - `user_type` (text) - Either 'client' or 'staff'
  - `full_name` (text) - User's full name
  - `phone` (text) - Contact number
  - `city` (text) - User's city
  - `company_name` (text, nullable) - For clients only
  - `preferred_roles` (text[], nullable) - For staff only
  - `is_verified` (boolean) - Verification status
  - `rating_avg` (numeric) - Average rating
  - `rating_count` (integer) - Total ratings received
  - `events_completed` (integer) - Total events completed
  - `payment_score` (numeric) - For clients: payment reliability (0-100)
  - `created_at` (timestamptz) - Account creation timestamp

  ### 2. `events`
  Event postings by clients
  - `id` (uuid) - Primary key
  - `client_id` (uuid, FK to profiles) - Event creator
  - `title` (text, nullable) - Event name
  - `city` (text) - Event city
  - `area` (text) - Event area/locality
  - `venue` (text) - Venue name
  - `venue_address` (text) - Full address
  - `shift_date` (date) - Event date
  - `shift_start` (time) - Start time
  - `shift_end` (time) - End time
  - `roles` (jsonb) - Array of role objects with details
  - `dress_code` (text) - Dress requirements
  - `reporting_time` (text) - When to arrive
  - `meeting_point` (text) - Where to meet
  - `language_requirements` (text[], nullable) - Required languages
  - `food_provided` (boolean) - Food availability
  - `travel_allowance` (numeric, nullable) - Travel reimbursement
  - `special_instructions` (text, nullable) - Additional details
  - `is_urgent` (boolean) - Urgent flag
  - `urgent_bonus` (numeric, nullable) - Extra payment for urgency
  - `status` (text) - active, filled, completed, cancelled
  - `filled_count` (integer) - Current accepted staff
  - `total_required` (integer) - Total staff needed
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `applications`
  Staff applications to events
  - `id` (uuid) - Primary key
  - `event_id` (uuid, FK to events) - Applied event
  - `staff_id` (uuid, FK to profiles) - Applicant
  - `role` (text) - Applied role
  - `status` (text) - pending, accepted, rejected
  - `applied_at` (timestamptz) - Application time
  - `responded_at` (timestamptz, nullable) - Response time

  ### 4. `attendance`
  Check-in and check-out records
  - `id` (uuid) - Primary key
  - `event_id` (uuid, FK to events)
  - `staff_id` (uuid, FK to profiles)
  - `check_in_time` (timestamptz, nullable)
  - `check_out_time` (timestamptz, nullable)
  - `check_in_location` (point, nullable) - GPS coordinates
  - `check_out_location` (point, nullable) - GPS coordinates
  - `hours_worked` (numeric, nullable) - Calculated hours
  - `amount_earned` (numeric) - Payment amount
  - `payment_status` (text) - pending, paid
  - `payment_due_at` (timestamptz, nullable) - 48h deadline
  - `paid_at` (timestamptz, nullable) - Payment completion time

  ### 5. `ratings`
  Mutual ratings between clients and staff
  - `id` (uuid) - Primary key
  - `event_id` (uuid, FK to events)
  - `rater_id` (uuid, FK to profiles) - Person giving rating
  - `ratee_id` (uuid, FK to profiles) - Person being rated
  - `rating_type` (text) - client_to_staff or staff_to_client
  - `overall_rating` (integer) - 1-5 stars
  - `punctuality` (integer, nullable) - 1-5 rating
  - `reliability` (integer, nullable) - 1-5 rating
  - `professionalism` (integer, nullable) - 1-5 rating
  - `payment_speed` (integer, nullable) - For client ratings
  - `communication` (integer, nullable) - 1-5 rating
  - `review_text` (text, nullable) - Written review
  - `created_at` (timestamptz) - Rating timestamp

  ### 6. `subscriptions`
  Client subscription management
  - `id` (uuid) - Primary key
  - `client_id` (uuid, FK to profiles)
  - `plan` (text) - free, starter, pro, enterprise
  - `status` (text) - active, expired, cancelled
  - `started_at` (timestamptz) - Subscription start
  - `expires_at` (timestamptz, nullable) - Expiration date
  - `events_posted_this_month` (integer) - Counter
  - `requires_deposit` (boolean) - Deposit requirement flag

  ### 7. `replacements`
  Replacement request tracking
  - `id` (uuid) - Primary key
  - `event_id` (uuid, FK to events)
  - `original_staff_id` (uuid, FK to profiles, nullable) - Staff being replaced
  - `replacement_staff_id` (uuid, FK to profiles, nullable) - New staff
  - `urgent_bonus` (numeric, nullable) - Extra incentive
  - `status` (text) - open, filled, cancelled
  - `created_at` (timestamptz) - Request time
  - `filled_at` (timestamptz, nullable) - Fulfillment time

  ## Security
  Row Level Security (RLS) enabled on all tables with policies for:
  - Users can view their own data
  - Clients can manage their events
  - Staff can view public events and apply
  - Attendance and payment tracking is restricted
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type text NOT NULL CHECK (user_type IN ('client', 'staff')),
  full_name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  company_name text,
  preferred_roles text[],
  is_verified boolean DEFAULT false,
  rating_avg numeric DEFAULT 0,
  rating_count integer DEFAULT 0,
  events_completed integer DEFAULT 0,
  payment_score numeric DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text,
  city text NOT NULL,
  area text NOT NULL,
  venue text NOT NULL,
  venue_address text NOT NULL,
  shift_date date NOT NULL,
  shift_start time NOT NULL,
  shift_end time NOT NULL,
  roles jsonb NOT NULL,
  dress_code text NOT NULL,
  reporting_time text NOT NULL,
  meeting_point text NOT NULL,
  language_requirements text[],
  food_provided boolean DEFAULT false,
  travel_allowance numeric,
  special_instructions text,
  is_urgent boolean DEFAULT false,
  urgent_bonus numeric,
  status text DEFAULT 'active' CHECK (status IN ('active', 'filled', 'completed', 'cancelled')),
  filled_count integer DEFAULT 0,
  total_required integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own events"
  ON events FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update own events"
  ON events FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can delete own events"
  ON events FOR DELETE
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Staff can view active events"
  ON events FOR SELECT
  TO authenticated
  USING (status = 'active' OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'staff'
  ));

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  staff_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  applied_at timestamptz DEFAULT now(),
  responded_at timestamptz,
  UNIQUE(event_id, staff_id)
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (staff_id = auth.uid());

CREATE POLICY "Staff can create applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (staff_id = auth.uid());

CREATE POLICY "Clients can view applications for their events"
  ON applications FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM events WHERE events.id = applications.event_id AND events.client_id = auth.uid()
  ));

CREATE POLICY "Clients can update applications for their events"
  ON applications FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM events WHERE events.id = applications.event_id AND events.client_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM events WHERE events.id = applications.event_id AND events.client_id = auth.uid()
  ));

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  staff_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  check_in_time timestamptz,
  check_out_time timestamptz,
  check_in_location point,
  check_out_location point,
  hours_worked numeric,
  amount_earned numeric NOT NULL,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
  payment_due_at timestamptz,
  paid_at timestamptz,
  UNIQUE(event_id, staff_id)
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view own attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (staff_id = auth.uid());

CREATE POLICY "Staff can update own attendance for check-in/out"
  ON attendance FOR UPDATE
  TO authenticated
  USING (staff_id = auth.uid())
  WITH CHECK (staff_id = auth.uid());

CREATE POLICY "Clients can view attendance for their events"
  ON attendance FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM events WHERE events.id = attendance.event_id AND events.client_id = auth.uid()
  ));

CREATE POLICY "Clients can update attendance for payment"
  ON attendance FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM events WHERE events.id = attendance.event_id AND events.client_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM events WHERE events.id = attendance.event_id AND events.client_id = auth.uid()
  ));

CREATE POLICY "System can create attendance records"
  ON attendance FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  rater_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  ratee_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating_type text NOT NULL CHECK (rating_type IN ('client_to_staff', 'staff_to_client')),
  overall_rating integer NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  punctuality integer CHECK (punctuality >= 1 AND punctuality <= 5),
  reliability integer CHECK (reliability >= 1 AND reliability <= 5),
  professionalism integer CHECK (professionalism >= 1 AND professionalism <= 5),
  payment_speed integer CHECK (payment_speed >= 1 AND payment_speed <= 5),
  communication integer CHECK (communication >= 1 AND communication <= 5),
  review_text text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, rater_id, ratee_id)
);

ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view ratings about them"
  ON ratings FOR SELECT
  TO authenticated
  USING (ratee_id = auth.uid() OR rater_id = auth.uid());

CREATE POLICY "Users can create ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (rater_id = auth.uid());

CREATE POLICY "Public ratings viewable"
  ON ratings FOR SELECT
  TO authenticated
  USING (true);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  started_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  events_posted_this_month integer DEFAULT 0,
  requires_deposit boolean DEFAULT false
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can update own subscription"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "System can create subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

-- Create replacements table
CREATE TABLE IF NOT EXISTS replacements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  original_staff_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  replacement_staff_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  urgent_bonus numeric,
  status text DEFAULT 'open' CHECK (status IN ('open', 'filled', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  filled_at timestamptz
);

ALTER TABLE replacements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can manage replacements for their events"
  ON replacements FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM events WHERE events.id = replacements.event_id AND events.client_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM events WHERE events.id = replacements.event_id AND events.client_id = auth.uid()
  ));

CREATE POLICY "Staff can view open replacements"
  ON replacements FOR SELECT
  TO authenticated
  USING (status = 'open');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_city ON events(city);
CREATE INDEX IF NOT EXISTS idx_events_shift_date ON events(shift_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_client_id ON events(client_id);
CREATE INDEX IF NOT EXISTS idx_applications_staff_id ON applications(staff_id);
CREATE INDEX IF NOT EXISTS idx_applications_event_id ON applications(event_id);
CREATE INDEX IF NOT EXISTS idx_attendance_staff_id ON attendance(staff_id);
CREATE INDEX IF NOT EXISTS idx_ratings_ratee_id ON ratings(ratee_id);
