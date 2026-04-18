-- ==========================================
-- FINAL SANCTUM RLS OVERRIDE: DEFINITIVE ACCESS
-- ==========================================

-- 1. DISABLE PREVIOUS POLICIES FOR CLEAN SLATE
DROP POLICY IF EXISTS "Allow public read for categories" ON categories;
DROP POLICY IF EXISTS "Allow public read for menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow public read for bookings" ON bookings;
DROP POLICY IF EXISTS "Allow all for categories" ON categories;
DROP POLICY IF EXISTS "Allow all for menu_items" ON menu_items;
DROP POLICY IF EXISTS "Allow all for bookings" ON bookings;

-- 2. ENABLE RLS (Required for Supabase logic)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 3. GRANT DEFINTIVE ACCESS (Anon Key)
-- Create one master policy for each table that allows everything (For Admin Ease)
CREATE POLICY "sanctum_master_categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "sanctum_master_menu_items" ON menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "sanctum_master_bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);

-- 4. GRANT SERVICE ACCESS (Optional but good practice)
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
