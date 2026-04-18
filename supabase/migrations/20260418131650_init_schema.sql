-- Categories for the menu
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_order INT DEFAULT 0
);

-- Individual Menu Items
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  tag TEXT,
  description TEXT,
  is_signature BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true
);

-- Table Reservations
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  branch TEXT NOT NULL,
  guests INT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Seed Initial Categories
INSERT INTO categories (name, display_order) VALUES 
('Recommended', 1),
('Breakfast', 2),
('Burgers & Mains', 3),
('Pancakes & Waffles', 4),
('Beverages', 5);
