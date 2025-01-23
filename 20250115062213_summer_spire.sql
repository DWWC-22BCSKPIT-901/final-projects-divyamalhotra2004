/*
  # Initial Schema Setup for Family Legal Platform

  1. New Tables
    - reports
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - title (text)
      - description (text)
      - category (text)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - consultations
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - expert_id (uuid, references experts)
      - date (timestamp)
      - status (text)
      - notes (text)
      - created_at (timestamp)
    
    - experts
      - id (uuid, primary key)
      - name (text)
      - specialization (text)
      - bio (text)
      - availability (jsonb)
      - created_at (timestamp)
    
    - forum_posts
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - title (text)
      - content (text)
      - category (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for user access control
*/

-- Create reports table
CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create experts table
CREATE TABLE experts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialization text NOT NULL,
  bio text NOT NULL,
  availability jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create consultations table
CREATE TABLE consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  expert_id uuid REFERENCES experts NOT NULL,
  date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create forum_posts table
CREATE TABLE forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- Reports policies
CREATE POLICY "Users can view their own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Experts policies
CREATE POLICY "Anyone can view experts"
  ON experts FOR SELECT
  TO authenticated
  USING (true);

-- Consultations policies
CREATE POLICY "Users can view their own consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own consultations"
  ON consultations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Forum posts policies
CREATE POLICY "Anyone can view forum posts"
  ON forum_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create forum posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own forum posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);