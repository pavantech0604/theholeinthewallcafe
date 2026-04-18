export type MenuItem = {
  name: string;
  price: string;
  tag: string;
  desc: string;
};

export type MenuCategory = {
  [key: string]: MenuItem[];
};

export const menuData: MenuCategory = {
  "Recommended": [
    { 
      name: "The All English Breakfast", 
      price: "₹580", 
      tag: "Iconic",
      desc: "Chicken sausages, pork bacon, fried eggs, baked beans, mushrooms, mashed potato, spinach, grilled tomato, and brown bread."
    },
    { 
      name: "The Dirty Burger", 
      price: "₹450", 
      tag: "Best Seller", 
      desc: "Our signature stack: beef patty, fried egg, pork bacon, and double cheese." 
    },
    { 
      name: "Tiramisu Pancakes", 
      price: "₹280", 
      tag: "Fan Favorite", 
      desc: "Coffee-soaked layers, mascarpone cream, and a dusting of dark chocolate." 
    },
    { 
      name: "Tender Coconut Shake", 
      price: "₹220", 
      tag: "Signature", 
      desc: "Creamy vanilla base blended with fresh tender coconut malai." 
    }
  ],
  "Breakfast": [
    { 
      name: "The All English Breakfast", 
      price: "₹580", 
      tag: "Best Seller",
      desc: "Chicken sausages, pork bacon, fried eggs, baked beans, mushrooms, mashed potato, spinach, grilled tomato, and brown bread."
    },
    { 
      name: "The Big Frenchie", 
      price: "₹380", 
      tag: "Signature",
      desc: "Sourdough French toast served with honey butter, scrambled eggs, and choice of sausages."
    },
    { 
      name: "The Porky Fellas", 
      price: "₹520", 
      tag: "Hearty",
      desc: "A meat lover's dream: pork sausages, crispy bacon, ham, and perfectly fried eggs."
    },
    { 
      name: "Farmer's Breakfast", 
      price: "₹350", 
      tag: "Vegetarian",
      desc: "Fried eggs, baked beans, mashed potato, sauteed mushrooms, spinach, and grilled tomato."
    },
    { 
      name: "Steak & Eggs", 
      price: "₹450", 
      tag: "Classic",
      desc: "Juicy minute steak grilled to perfection, served with two eggs and toasted sourdough."
    },
    { 
      name: "Chickheema Eggs", 
      price: "₹320", 
      tag: "Spicy",
      desc: "Home-style chicken kheema served with buttery scrambled eggs and पाव bread."
    }
  ],
  "Burgers & Mains": [
    { 
      name: "Meaty LAMB Burger", 
      price: "₹420", 
      tag: "Heavyweight", 
      desc: "Hand-pressed lamb patty with caramelized onions, melting cheddar, and house relish." 
    },
    { 
      name: "The Dirty Burger", 
      price: "₹450", 
      tag: "Legendary", 
      desc: "Our signature stack: beef patty, fried egg, pork bacon, and double cheese." 
    },
    { 
      name: "Goan Sausage & Mash", 
      price: "₹420", 
      tag: "Regional", 
      desc: "Spicy Goan chorizo masala served over creamy mash with a fried egg topper." 
    },
    { 
      name: "Veg Lasagna", 
      price: "₹360", 
      tag: "Comfort", 
      desc: "Rich layered pasta with seasonal vegetables, bechamel, and lots of mozzarella." 
    },
    { 
      name: "Chicken Steak Burger", 
      price: "₹380", 
      tag: "Grilled", 
      desc: "Succulent grilled chicken breast with chipotle mayo and crisp lettuce." 
    },
    { 
      name: "Mushroom Stroganoff", 
      price: "₹340", 
      tag: "Creamy", 
      desc: "Forest mushrooms in a rich sour cream sauce served with herb butter rice." 
    }
  ],
  "Pancakes & Waffles": [
    { 
      name: "Tiramisu Pancakes", 
      price: "₹280", 
      tag: "Chef's Choice", 
      desc: "Coffee-soaked layers, mascarpone cream, and a dusting of dark chocolate." 
    },
    { 
      name: "Blueberry Whip", 
      price: "₹260", 
      tag: "Fruity", 
      desc: "Buttermilk stacks with fresh blueberry compote and light whipped cream." 
    },
    { 
      name: "Triple Chocolate", 
      price: "₹280", 
      tag: "Indulgent", 
      desc: "Cocoa pancakes loaded with dark, milk, and white chocolate chunks." 
    },
    { 
      name: "Apple Cinnamon Waffle", 
      price: "₹240", 
      tag: "Seasonal", 
      desc: "Stewed Fuji apples with cinnamon sugar on a crisp, golden waffle." 
    },
    { 
      name: "Nutella & Banana", 
      price: "₹280", 
      tag: "Popular", 
      desc: "The classic combo: thick Nutella spread and sliced fresh bananas." 
    },
    { 
      name: "Savory Bacon Waffle", 
      price: "₹320", 
      tag: "Savory", 
      desc: "Crispy bacon bits baked into the waffle, served with salted butter and syrup." 
    }
  ],
  "Beverages": [
    { 
      name: "Tender Coconut Shake", 
      price: "₹220", 
      tag: "Signature", 
      desc: "Creamy vanilla base blended with fresh tender coconut malai." 
    },
    { 
      name: "Nutella Monster Shake", 
      price: "₹280", 
      tag: "Heavy", 
      desc: "Decadent Nutella shake topped with whipped cream and brownie bits." 
    },
    { 
      name: "Spicy Guava Refresher", 
      price: "₹180", 
      tag: "Tangy", 
      desc: "Chilled guava juice with a kick of chili and a salted rim." 
    },
    { 
      name: "Cucumber Mojito", 
      price: "₹160", 
      tag: "Fresh", 
      desc: "Refreshing blend of fresh cucumber, mint, line, and sparkling fizz." 
    },
    { 
      name: "Artisanal Cold Brew", 
      price: "₹210", 
      tag: "Coffee", 
      desc: "18-hour slow-steeped Arabica beans for a smooth, bold finish." 
    },
    { 
      name: "Lemon Black Tea", 
      price: "₹140", 
      tag: "Light", 
      desc: "Premium Assam tea with fresh lemon squeeze, served hot or iced." 
    }
  ]
};

export const menuCategories = Object.keys(menuData);
