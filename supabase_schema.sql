-- ==========================================
-- THE HOLE IN THE WALL CAFE: FULL SCHEMA
-- ==========================================

-- 1. CLEANUP (Optional: Uncomment if starting fresh)
-- DROP TABLE IF EXISTS bookings;
-- DROP TABLE IF EXISTS menu_items;
-- DROP TABLE IF EXISTS categories;

-- 2. CATEGORIES TABLE
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. MENU ITEMS TABLE
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  tag TEXT,
  description TEXT,
  is_signature BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. BOOKINGS TABLE (Sanctuary Reservations)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  branch TEXT NOT NULL,
  guests INT NOT NULL DEFAULT 2,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. REAL-TIME ENABLEMENT
-- Enable real-time for all operational tables
alter publication supabase_realtime add table categories;
alter publication supabase_realtime add table menu_items;
alter publication supabase_realtime add table bookings;

-- 6. SEED INITIAL CATEGORIES
INSERT INTO categories (name, display_order) VALUES 
('Recommended', 1),
('Breakfast', 2),
('Burgers & Mains', 3),
('Pancakes & Waffles', 4),
('Beverages', 5);

-- 7. SEED INITIAL SIGNATURE ITEMS (Sample)
-- Note: Replace UUIDs with actual category IDs if manual insertion is needed
-- This is a sample to show the structure
/*
INSERT INTO menu_items (name, price, tag, description, is_signature, category_id)
SELECT 
  'The All English Breakfast', 
  '₹580', 
  'Iconic', 
  'Chicken sausages, pork bacon, fried eggs, baked beans, mushrooms, mashed potato, spinach, grilled tomato, and brown bread.', 
  true, 
  id 
FROM categories WHERE name = 'Recommended';
*/
