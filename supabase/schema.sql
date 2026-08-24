-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Member ID sequence for atomic VRK-XXXXXXXX generation
CREATE SEQUENCE IF NOT EXISTS member_id_seq START 1;

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products with JSONB variants [{pack_size, price, mrp, sku}]
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  brand TEXT,
  variants JSONB NOT NULL DEFAULT '[]',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Members (lifetime membership)
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vrk_id TEXT UNIQUE NOT NULL, -- VRK-00000001 format
  serial_number BIGINT UNIQUE DEFAULT nextval('member_id_seq'),
  mobile TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  email TEXT,
  permanent_address JSONB, -- {line1, line2, city, state, pincode}
  temporary_address JSONB,
  delivery_pincode TEXT,
  nominees JSONB DEFAULT '[]', -- [{name, relation, mobile}] max 3
  family_welfare TEXT,
  identity_proofs JSONB DEFAULT '[]', -- [{type, storage_path}] signed URLs from private bucket
  dream_box TEXT CHECK (dream_box IN ('My Dream', 'No Dream')),
  dream_description TEXT,
  organizer_code TEXT DEFAULT 'VRK-ORG-101',
  signature_path TEXT, -- Supabase storage path
  selfie_path TEXT, -- Supabase private storage path
  payment_reference TEXT,
  payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED')),
  membership_status TEXT DEFAULT 'PENDING' CHECK (membership_status IN ('PENDING', 'ACTIVE', 'SUSPENDED')),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  activated_at TIMESTAMPTZ
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL, -- ORD-XXXXXXXX
  member_id UUID REFERENCES members(id),
  member_mobile TEXT NOT NULL,
  member_name TEXT NOT NULL,
  delivery_address JSONB NOT NULL,
  status TEXT DEFAULT 'PLACED' CHECK (status IN ('PLACED', 'CONFIRMED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED')),
  payment_method TEXT DEFAULT 'PAY_ON_DELIVERY' CHECK (payment_method IN ('PAY_ON_DELIVERY', 'UPI')),
  payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'COLLECTED', 'FAILED')),
  subtotal NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) DEFAULT 0,
  total_amount NUMERIC(10,2) NOT NULL,
  notes TEXT,
  delivery_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  pack_size TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  line_total NUMERIC(10,2) NOT NULL
);

-- OTP verification table (rate limiting)
CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mobile TEXT NOT NULL,
  otp_hash TEXT NOT NULL, -- bcrypt hash of 6-digit OTP
  attempts INT DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rate limiting table
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier TEXT NOT NULL, -- IP or mobile
  endpoint TEXT NOT NULL,
  request_count INT DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(identifier, endpoint)
);

-- Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Public read for categories and products
CREATE POLICY "Public can view active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active products" ON products FOR SELECT USING (is_active = true);

-- Members can only see their own data
CREATE POLICY "Members view own data" ON members FOR SELECT USING (mobile = current_setting('app.current_mobile', true));

-- Orders: members see their own, admins see all
CREATE POLICY "Members view own orders" ON orders FOR SELECT USING (member_mobile = current_setting('app.current_mobile', true));

-- Helper function: format VRK ID
CREATE OR REPLACE FUNCTION format_vrk_id(seq BIGINT) RETURNS TEXT AS $$
BEGIN
  RETURN 'VRK-' || LPAD(seq::TEXT, 8, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger: auto-set vrk_id on member insert
CREATE OR REPLACE FUNCTION set_vrk_id() RETURNS TRIGGER AS $$
BEGIN
  NEW.vrk_id := format_vrk_id(NEW.serial_number);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_vrk_id
  BEFORE INSERT ON members
  FOR EACH ROW
  EXECUTE FUNCTION set_vrk_id();

-- Order number sequence
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

CREATE OR REPLACE FUNCTION set_order_number() RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'ORD-' || LPAD(nextval('order_number_seq')::TEXT, 8, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Seed categories
INSERT INTO categories (name, slug, icon_url, display_order) VALUES
  ('Grocery Staples', 'grocery', '/images/categories/category-grocery.svg', 1),
  ('Dairy & Eggs', 'dairy', '/images/categories/category-dairy.svg', 2),
  ('Packaged Food', 'packaged-food', '/images/categories/category-packaged-food.svg', 3),
  ('Fruits & Vegetables', 'fruits-veg', '/images/categories/category-fruits-veg.svg', 4),
  ('Home Care', 'home-care', '/images/categories/category-home-care.svg', 5),
  ('Personal Care', 'personal-care', '/images/categories/category-personal-care.svg', 6),
  ('Oral Care', 'oral-care', '/images/categories/category-oral-care.svg', 7),
  ('Bath & Body', 'bath-body', '/images/categories/category-bath-body.svg', 8),
  ('Hair Care', 'hair-care', '/images/categories/category-hair-care.svg', 9),
  ('Wellness', 'wellness', '/images/categories/category-wellness.svg', 10)
ON CONFLICT (slug) DO NOTHING;
