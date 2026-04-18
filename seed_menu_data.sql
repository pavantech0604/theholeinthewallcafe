-- ==========================================
-- MENU SEED DATA: ALIGNED WITH WEBSITE
-- ==========================================

-- 1. CLEANUP PREVIOUS ITEMS
DELETE FROM menu_items;

-- 2. INSERTING RECOMMENDED MOLECULES
INSERT INTO menu_items (name, price, tag, description, is_signature, category_id)
SELECT name, price, tag, description, is_sig, cat_id
FROM (VALUES 
  ('The All English Breakfast', '₹580', 'Iconic', 'Chicken sausages, pork bacon, fried eggs, baked beans, mushrooms, mashed potato, spinach, grilled tomato, and brown bread.', true),
  ('The Dirty Burger', '₹450', 'Best Seller', 'Our signature stack: beef patty, fried egg, pork bacon, and double cheese.', true),
  ('Tiramisu Pancakes', '₹280', 'Fan Favorite', 'Coffee-soaked layers, mascarpone cream, and a dusting of dark chocolate.', true),
  ('Tender Coconut Shake', '₹220', 'Signature', 'Creamy vanilla base blended with fresh tender coconut malai.', true)
) AS v(name, price, tag, description, is_sig)
CROSS JOIN (SELECT id AS cat_id FROM categories WHERE name = 'Recommended') as cat;

-- 3. INSERTING BREAKFAST MODULES
INSERT INTO menu_items (name, price, tag, description, is_signature, category_id)
SELECT name, price, tag, description, is_sig, cat_id
FROM (VALUES 
  ('The Big Frenchie', '₹380', 'Signature', 'Sourdough French toast served with honey butter, scrambled eggs, and choice of sausages.', true),
  ('The Porky Fellas', '₹520', 'Hearty', 'A meat lover''s dream: pork sausages, crispy bacon, ham, and perfectly fried eggs.', false),
  ('Farmer''s Breakfast', '₹350', 'Vegetarian', 'Fried eggs, baked beans, mashed potato, sauteed mushrooms, spinach, and grilled tomato.', false),
  ('Steak & Eggs', '₹450', 'Classic', 'Juicy minute steak grilled to perfection, served with two eggs and toasted sourdough.', false),
  ('Chickheema Eggs', '₹320', 'Spicy', 'Home-style chicken kheema served with buttery scrambled eggs and पाव bread.', false)
) AS v(name, price, tag, description, is_sig)
CROSS JOIN (SELECT id AS cat_id FROM categories WHERE name = 'Breakfast') as cat;

-- 4. INSERTING BURGERS & MAINS
INSERT INTO menu_items (name, price, tag, description, is_signature, category_id)
SELECT name, price, tag, description, is_sig, cat_id
FROM (VALUES 
  ('Meaty LAMB Burger', '₹420', 'Heavyweight', 'Hand-pressed lamb patty with caramelized onions, melting cheddar, and house relish.', false),
  ('Goan Sausage & Mash', '₹420', 'Regional', 'Spicy Goan chorizo masala served over creamy mash with a fried egg topper.', false),
  ('Veg Lasagna', '₹360', 'Comfort', 'Rich layered pasta with seasonal vegetables, bechamel, and lots of mozzarella.', false),
  ('Chicken Steak Burger', '₹380', 'Grilled', 'Succulent grilled chicken breast with chipotle mayo and crisp lettuce.', false),
  ('Mushroom Stroganoff', '₹340', 'Creamy', 'Forest mushrooms in a rich sour cream sauce served with herb butter rice.', false)
) AS v(name, price, tag, description, is_sig)
CROSS JOIN (SELECT id AS cat_id FROM categories WHERE name = 'Burgers & Mains') as cat;

-- 5. INSERTING PANCAKES & WAFFLES
INSERT INTO menu_items (name, price, tag, description, is_signature, category_id)
SELECT name, price, tag, description, is_sig, cat_id
FROM (VALUES 
  ('Blueberry Whip', '₹260', 'Fruity', 'Buttermilk stacks with fresh blueberry compote and light whipped cream.', false),
  ('Triple Chocolate', '₹280', 'Indulgent', 'Cocoa pancakes loaded with dark, milk, and white chocolate chunks.', false),
  ('Apple Cinnamon Waffle', '₹240', 'Seasonal', 'Stewed Fuji apples with cinnamon sugar on a crisp, golden waffle.', false),
  ('Nutella & Banana', '₹280', 'Popular', 'The classic combo: thick Nutella spread and sliced fresh bananas.', false),
  ('Savory Bacon Waffle', '₹320', 'Savory', 'Crispy bacon bits baked into the waffle, served with salted butter and syrup.', false)
) AS v(name, price, tag, description, is_sig)
CROSS JOIN (SELECT id AS cat_id FROM categories WHERE name = 'Pancakes & Waffles') as cat;

-- 6. INSERTING BEVERAGES
INSERT INTO menu_items (name, price, tag, description, is_signature, category_id)
SELECT name, price, tag, description, is_sig, cat_id
FROM (VALUES 
  ('Nutella Monster Shake', '₹280', 'Heavy', 'Decadent Nutella shake topped with whipped cream and brownie bits.', false),
  ('Spicy Guava Refresher', '₹180', 'Tangy', 'Chilled guava juice with a kick of chili and a salted rim.', false),
  ('Cucumber Mojito', '₹160', 'Fresh', 'Refreshing blend of fresh cucumber, mint, line, and sparkling fizz.', false),
  ('Artisanal Cold Brew', '₹210', 'Coffee', '18-hour slow-steeped Arabica beans for a smooth, bold finish.', false),
  ('Lemon Black Tea', '₹140', 'Light', 'Premium Assam tea with fresh lemon squeeze, served hot or iced.', false)
) AS v(name, price, tag, description, is_sig)
CROSS JOIN (SELECT id AS cat_id FROM categories WHERE name = 'Beverages') as cat;
