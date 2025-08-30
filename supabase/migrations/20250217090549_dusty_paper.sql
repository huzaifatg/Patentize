/*
  # Patent Management System Tables

  1. New Tables
    - `patents`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `total_shares` (integer)
      - `available_shares` (integer)
      - `owner_id` (uuid, references auth.users)
      - `category` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `expires_at` (timestamptz)

    - `patent_transactions`
      - `id` (uuid, primary key)
      - `patent_id` (uuid, references patents)
      - `buyer_id` (uuid, references auth.users)
      - `shares_purchased` (integer)
      - `price_per_share` (numeric)
      - `total_amount` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for patent creation, viewing, and purchasing
*/

-- Create patents table
CREATE TABLE IF NOT EXISTS patents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price > 0),
  total_shares integer NOT NULL CHECK (total_shares > 0),
  available_shares integer NOT NULL CHECK (available_shares >= 0),
  owner_id uuid REFERENCES auth.users NOT NULL,
  category text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  CHECK (available_shares <= total_shares)
);

-- Create patent transactions table
CREATE TABLE IF NOT EXISTS patent_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patent_id uuid REFERENCES patents NOT NULL,
  buyer_id uuid REFERENCES auth.users NOT NULL,
  shares_purchased integer NOT NULL CHECK (shares_purchased > 0),
  price_per_share numeric NOT NULL CHECK (price_per_share > 0),
  total_amount numeric NOT NULL CHECK (total_amount > 0),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE patents ENABLE ROW LEVEL SECURITY;
ALTER TABLE patent_transactions ENABLE ROW LEVEL SECURITY;

-- Policies for patents table
CREATE POLICY "Patents are viewable by everyone"
  ON patents FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own patents"
  ON patents FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their patents"
  ON patents FOR UPDATE
  USING (auth.uid() = owner_id);

-- Policies for patent_transactions table
CREATE POLICY "Users can view their own transactions"
  ON patent_transactions FOR SELECT
  USING (auth.uid() = buyer_id);

CREATE POLICY "Users can create transactions"
  ON patent_transactions FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);
