import { ProductCardProduct } from '@/components/customer/ProductCard';

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export const CATEGORIES: CategoryData[] = [
  { id: 'cat-grocery', name: 'Grocery Staples', slug: 'grocery', icon: '/images/categories/category-grocery.svg', description: 'Dals, Pulses, Atta, Rice, Cooking Oils & Spices' },
  { id: 'cat-dairy', name: 'Dairy & Eggs', slug: 'dairy', icon: '/images/categories/category-dairy.svg', description: 'Fresh Milk, Pure Ghee, Butter, Paneer & Eggs' },
  { id: 'cat-packaged', name: 'Packaged Food', slug: 'packaged-food', icon: '/images/categories/category-packaged-food.svg', description: 'Biscuits, Snacks, Beverages, Noodles & Chocolates' },
  { id: 'cat-home', name: 'Home Care', slug: 'home-care', icon: '/images/categories/category-home-care.svg', description: 'Detergents, Dishwash, Surface Cleaners & Pest Control' },
  { id: 'cat-personal', name: 'Personal Care', slug: 'personal-care', icon: '/images/categories/category-personal-care.svg', description: 'Skin Care, Creams, Baby Care & Hygiene' },
  { id: 'cat-oral', name: 'Oral Care', slug: 'oral-care', icon: '/images/categories/category-oral-care.svg', description: 'Toothpaste, Toothbrushes & Mouthwash' },
  { id: 'cat-hair', name: 'Hair Care', slug: 'hair-care', icon: '/images/categories/category-hair-care.svg', description: 'Shampoos, Hair Oils & Conditioners' },
  { id: 'cat-bath', name: 'Bath & Body', slug: 'bath-body', icon: '/images/categories/category-bath-body.svg', description: 'Soaps, Body Washes & Talcum Powders' },
  { id: 'cat-fruits-veg', name: 'Fruits & Vegetables', slug: 'fruits-veg', icon: '/images/categories/category-fruits-veg.svg', description: 'Farm fresh onions, potatoes, tomatoes & seasonal fruits' },
  { id: 'cat-wellness', name: 'Wellness', slug: 'wellness', icon: '/images/categories/category-wellness.svg', description: 'Health drinks, Chyawanprash, Honey & Green Tea' },
];

export const ALL_PRODUCTS: (ProductCardProduct & { category_slug: string })[] = [
  // ==========================================
  // ATTA, FLOURS & RICE (GROCERY STAPLES)
  // ==========================================
  {
    id: 'p-01',
    name: 'Aashirvaad Superior MP Shudh Chakki Atta',
    category: 'Atta & Flours',
    category_slug: 'grocery',
    brand: 'Aashirvaad',
    image_url: '/images/products/Atta.webp',
    variants: [
      { pack_size: '10 kg Pack', price: 550 },
      { pack_size: '5 kg Pack', price: 285 },
      { pack_size: '1 kg Pack', price: 62 },
    ],
  },
  {
    id: 'p-02',
    name: 'India Gate Basmati Rice Feast Rozzana',
    category: 'Rice & Grains',
    category_slug: 'grocery',
    brand: 'India Gate',
    image_url: '/images/products/basmati_rice.webp',
    variants: [
      { pack_size: '5 kg Bag', price: 495 },
      { pack_size: '1 kg Bag', price: 110 },
    ],
  },
  {
    id: 'p-03',
    name: 'Bullet GTS Super Fine Rice',
    category: 'Rice & Grains',
    category_slug: 'grocery',
    brand: 'Bullet GTS',
    image_url: '/images/products/gts_rice.webp',
    variants: [
      { pack_size: '25 kg Bag', price: 1450 },
      { pack_size: '10 kg Bag', price: 620 },
      { pack_size: '5 kg Bag', price: 320 },
    ],
  },
  {
    id: 'p-04',
    name: 'Fine Premium Besan Gram Flour',
    category: 'Atta & Flours',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/besan_flour.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 125 },
      { pack_size: '500 g Pack', price: 65 },
    ],
  },
  {
    id: 'p-05',
    name: 'Pure Refined Maida All Purpose Flour',
    category: 'Atta & Flours',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/Maida.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 58 },
      { pack_size: '500 g Pack', price: 30 },
    ],
  },
  {
    id: 'p-06',
    name: 'Roasted Sooji Rava Semolina',
    category: 'Atta & Flours',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/Sooji.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 65 },
      { pack_size: '500 g Pack', price: 35 },
    ],
  },
  {
    id: 'p-07',
    name: 'Premium Thick Poha Aval',
    category: 'Rice & Grains',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/Poha.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 70 },
      { pack_size: '500 g Pack', price: 38 },
    ],
  },
  {
    id: 'p-08',
    name: 'Bambino Roasted Vermicelli',
    category: 'Packaged Food',
    category_slug: 'packaged-food',
    brand: 'Bambino',
    image_url: '/images/products/Vermicelli.webp',
    variants: [
      { pack_size: '850 g Pack', price: 95 },
      { pack_size: '400 g Pack', price: 50 },
    ],
  },

  // ==========================================
  // DALS & PULSES (GROCERY STAPLES)
  // ==========================================
  {
    id: 'p-09',
    name: 'Unpolished Cleaned Toor Dal',
    category: 'Dals & Pulses',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/toor_dal.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 195 },
      { pack_size: '2 kg Pack', price: 385 },
      { pack_size: '500 g Pack', price: 100 },
    ],
  },
  {
    id: 'p-10',
    name: 'Desi High Protein Chana Dal',
    category: 'Dals & Pulses',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/channa_dal.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 120 },
      { pack_size: '500 g Pack', price: 62 },
    ],
  },
  {
    id: 'p-11',
    name: 'Nutritious Red Masoor Dal Split',
    category: 'Dals & Pulses',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/masoor_dal.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 110 },
      { pack_size: '500 g Pack', price: 58 },
    ],
  },
  {
    id: 'p-12',
    name: 'Raw Bold Groundnut Peanuts (Moongfali)',
    category: 'Dals & Pulses',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/Peanuts.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 180 },
      { pack_size: '500 g Pack', price: 95 },
    ],
  },
  {
    id: 'p-13',
    name: 'Dry Green Vatana Green Peas',
    category: 'Dals & Pulses',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/green_peas.webp',
    variants: [
      { pack_size: '1 kg Pack', price: 130 },
      { pack_size: '500 g Pack', price: 68 },
    ],
  },

  // ==========================================
  // EDIBLE OILS & GHEE
  // ==========================================
  {
    id: 'p-14',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    category: 'Edible Oils',
    category_slug: 'grocery',
    brand: 'Fortune',
    image_url: '/images/products/Fortune.webp',
    variants: [
      { pack_size: '1 Litre Pouch', price: 165 },
      { pack_size: '5 Litre Jar', price: 799 },
      { pack_size: '15 Litre Tin', price: 2350 },
    ],
  },
  {
    id: 'p-15',
    name: 'Freedom Refined Sunflower Oil',
    category: 'Edible Oils',
    category_slug: 'grocery',
    brand: 'Freedom',
    image_url: '/images/products/Freedom.webp',
    variants: [
      { pack_size: '1 Litre Pouch', price: 160 },
      { pack_size: '5 Litre Jar', price: 780 },
    ],
  },
  {
    id: 'p-16',
    name: 'Sunpure Pure Refined Sunflower Oil',
    category: 'Edible Oils',
    category_slug: 'grocery',
    brand: 'Sunpure',
    image_url: '/images/products/Sunpure.webp',
    variants: [
      { pack_size: '1 Litre Pouch', price: 160 },
      { pack_size: '5 Litre Jar', price: 780 },
    ],
  },
  {
    id: 'p-17',
    name: 'Gold Winner Refined Sunflower Oil',
    category: 'Edible Oils',
    category_slug: 'grocery',
    brand: 'Gold Winner',
    image_url: '/images/products/gold_winner.webp',
    variants: [
      { pack_size: '1 Litre Pouch', price: 165 },
      { pack_size: '5 Litre Jar', price: 795 },
    ],
  },
  {
    id: 'p-18',
    name: 'Saffola Gold Pro Healthy Blend Cooking Oil',
    category: 'Edible Oils',
    category_slug: 'grocery',
    brand: 'Saffola',
    image_url: '/images/products/Saffola.webp',
    variants: [
      { pack_size: '1 Litre Pouch', price: 195 },
      { pack_size: '5 Litre Jar', price: 950 },
    ],
  },
  {
    id: 'p-19',
    name: 'Ruchi Gold Refined Palm Oil',
    category: 'Edible Oils',
    category_slug: 'grocery',
    brand: 'Ruchi Gold',
    image_url: '/images/products/ruchi_gold.webp',
    variants: [
      { pack_size: '1 Litre Pouch', price: 125 },
      { pack_size: '5 Litre Jar', price: 610 },
    ],
  },
  {
    id: 'p-20',
    name: 'Amul Pure Cow Ghee',
    category: 'Dairy & Ghee',
    category_slug: 'dairy',
    brand: 'Amul',
    image_url: '/images/products/Ghee.webp',
    variants: [
      { pack_size: '1 Litre Tin', price: 650 },
      { pack_size: '500 ml Pouch', price: 335 },
      { pack_size: '200 ml Bottle', price: 145 },
    ],
  },

  // ==========================================
  // SPICES & MASALAS
  // ==========================================
  {
    id: 'p-21',
    name: 'Whole Dry Red Chilli Stemless',
    category: 'Spices & Masalas',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/Chilli.webp',
    variants: [
      { pack_size: '500 g Pack', price: 240 },
      { pack_size: '200 g Pack', price: 100 },
      { pack_size: '100 g Pack', price: 52 },
    ],
  },
  {
    id: 'p-22',
    name: 'Everest Tikhalal Hot Red Chilli Powder',
    category: 'Spices & Masalas',
    category_slug: 'grocery',
    brand: 'Everest',
    image_url: '/images/products/chilli_powder.webp',
    variants: [
      { pack_size: '500 g Box', price: 290 },
      { pack_size: '200 g Box', price: 122 },
      { pack_size: '100 g Box', price: 64 },
    ],
  },
  {
    id: 'p-23',
    name: 'Everest Pure Golden Turmeric Powder (Haldi)',
    category: 'Spices & Masalas',
    category_slug: 'grocery',
    brand: 'Everest',
    image_url: '/images/products/turmeric_powder.webp',
    variants: [
      { pack_size: '500 g Carton', price: 160 },
      { pack_size: '200 g Box', price: 68 },
      { pack_size: '100 g Box', price: 36 },
    ],
  },
  {
    id: 'p-24',
    name: 'Everest Coriander Powder (Dhaniya)',
    category: 'Spices & Masalas',
    category_slug: 'grocery',
    brand: 'Everest',
    image_url: '/images/products/dhaniya_powder.webp',
    variants: [
      { pack_size: '500 g Box', price: 165 },
      { pack_size: '200 g Box', price: 70 },
      { pack_size: '100 g Box', price: 38 },
    ],
  },

  // ==========================================
  // SUGAR, SALT & JAGGERY
  // ==========================================
  {
    id: 'p-25',
    name: 'Madhur Pure & Hygienic Sulphur Free Sugar',
    category: 'Sugar & Salt',
    category_slug: 'grocery',
    brand: 'Madhur',
    image_url: '/images/products/Sugar.webp',
    variants: [
      { pack_size: '5 kg Mega Pack', price: 275 },
      { pack_size: '1 kg Pouch', price: 58 },
    ],
  },
  {
    id: 'p-26',
    name: 'Organic Kolhapuri Solid Jaggery Block (Gud)',
    category: 'Sugar & Salt',
    category_slug: 'grocery',
    brand: 'Premia',
    image_url: '/images/products/Jaggary.webp',
    variants: [
      { pack_size: '1 kg Block', price: 85 },
      { pack_size: '500 g Block', price: 45 },
    ],
  },
  {
    id: 'p-27',
    name: 'Tata Salt Vaccum Evaporated Iodized Salt',
    category: 'Sugar & Salt',
    category_slug: 'grocery',
    brand: 'Tata',
    image_url: '/images/products/Salt.webp',
    variants: [
      { pack_size: '1 kg Pouch', price: 28 },
      { pack_size: '2 kg Twin Pack', price: 56 },
    ],
  },

  // ==========================================
  // BEVERAGES & HEALTH DRINKS
  // ==========================================
  {
    id: 'p-28',
    name: 'Bru Instant Coffee Powder',
    category: 'Beverages',
    category_slug: 'packaged-food',
    brand: 'Bru',
    image_url: '/images/products/Bru.webp',
    variants: [
      { pack_size: '200 g Jar', price: 385 },
      { pack_size: '100 g Pouch', price: 195 },
      { pack_size: '50 g Pouch', price: 100 },
    ],
  },
  {
    id: 'p-29',
    name: 'Brooke Bond Red Label Strong CTC Tea',
    category: 'Beverages',
    category_slug: 'packaged-food',
    brand: 'Brooke Bond',
    image_url: '/images/products/red_label.webp',
    variants: [
      { pack_size: '1 kg Box', price: 560 },
      { pack_size: '500 g Pouch', price: 290 },
      { pack_size: '250 g Box', price: 150 },
    ],
  },
  {
    id: 'p-30',
    name: 'Brooke Bond Taj Mahal Rich CTC Tea',
    category: 'Beverages',
    category_slug: 'packaged-food',
    brand: 'Brooke Bond',
    image_url: '/images/products/taj_mahal.webp',
    variants: [
      { pack_size: '1 kg Box', price: 740 },
      { pack_size: '500 g Box', price: 380 },
      { pack_size: '250 g Box', price: 195 },
    ],
  },
  {
    id: 'p-31',
    name: 'Boost Chocolate Energy & Nutrition Drink',
    category: 'Health Drinks',
    category_slug: 'wellness',
    brand: 'Boost',
    image_url: '/images/products/Boost.webp',
    variants: [
      { pack_size: '1 kg Refill', price: 520 },
      { pack_size: '500 g Jar', price: 295 },
    ],
  },
  {
    id: 'p-32',
    name: 'Complan Royale Chocolate Health Drink',
    category: 'Health Drinks',
    category_slug: 'wellness',
    brand: 'Complan',
    image_url: '/images/products/Complan.webp',
    variants: [
      { pack_size: '1 kg Refill', price: 610 },
      { pack_size: '500 g Jar', price: 340 },
    ],
  },
  {
    id: 'p-33',
    name: 'Coca Cola Original Taste Soft Drink',
    category: 'Cold Drinks',
    category_slug: 'packaged-food',
    brand: 'Coca Cola',
    image_url: '/images/products/Coke.webp',
    variants: [
      { pack_size: '2 Litre Bottle', price: 95 },
      { pack_size: '750 ml Bottle', price: 40 },
      { pack_size: '250 ml Can', price: 35 },
    ],
  },
  {
    id: 'p-34',
    name: 'Pepsi Refreshing Cola Soft Drink',
    category: 'Cold Drinks',
    category_slug: 'packaged-food',
    brand: 'Pepsi',
    image_url: '/images/products/Pepsi.webp',
    variants: [
      { pack_size: '2 Litre Bottle', price: 95 },
      { pack_size: '750 ml Bottle', price: 40 },
      { pack_size: '250 ml Can', price: 35 },
    ],
  },
  {
    id: 'p-35',
    name: 'Maaza Real Mango Juice Pulp Drink',
    category: 'Cold Drinks',
    category_slug: 'packaged-food',
    brand: 'Maaza',
    image_url: '/images/products/Maaza.webp',
    variants: [
      { pack_size: '1.2 Litre Bottle', price: 75 },
      { pack_size: '600 ml Bottle', price: 40 },
      { pack_size: '150 ml Tetrapack', price: 15 },
    ],
  },

  // ==========================================
  // PACKAGED FOODS & BREAKFAST
  // ==========================================
  {
    id: 'p-36',
    name: 'Maggi 2-Minute Instant Noodles Masala',
    category: 'Instant Noodles',
    category_slug: 'packaged-food',
    brand: 'Nestle',
    image_url: '/images/products/Maggi.webp',
    variants: [
      { pack_size: 'Pack of 12 (840g)', price: 180 },
      { pack_size: 'Pack of 4 (280g)', price: 60 },
      { pack_size: 'Single Pack (70g)', price: 15 },
    ],
  },
  {
    id: 'p-37',
    name: "Kellogg's Corn Flakes Original Real Almond & Honey",
    category: 'Breakfast Cereals',
    category_slug: 'packaged-food',
    brand: "Kellogg's",
    image_url: '/images/products/Kelloggs.webp',
    variants: [
      { pack_size: '1.2 kg Family Pack', price: 460 },
      { pack_size: '475 g Box', price: 210 },
    ],
  },
  {
    id: 'p-38',
    name: 'Kissan Fresh Tomato Ketchup Sauce',
    category: 'Sauces & Spreads',
    category_slug: 'packaged-food',
    brand: 'Kissan',
    image_url: '/images/products/Kissan.webp',
    variants: [
      { pack_size: '1.2 kg Squeezy Bottle', price: 175 },
      { pack_size: '500 g Pouch', price: 85 },
    ],
  },

  // ==========================================
  // BISCUITS, SNACKS & CHOCOLATES
  // ==========================================
  {
    id: 'p-39',
    name: 'Cadbury Dairy Milk Silk Chocolate Bar',
    category: 'Chocolates',
    category_slug: 'packaged-food',
    brand: 'Cadbury',
    image_url: '/images/products/Cadbury.webp',
    variants: [
      { pack_size: '150 g Giant Bar', price: 185 },
      { pack_size: '60 g Regular Bar', price: 80 },
    ],
  },
  {
    id: 'p-40',
    name: 'Snickers Peanut & Caramel Milk Chocolate',
    category: 'Chocolates',
    category_slug: 'packaged-food',
    brand: 'Snickers',
    image_url: '/images/products/Snickers.webp',
    variants: [
      { pack_size: '45 g Bar', price: 50 },
      { pack_size: '22 g Mini Bar', price: 25 },
    ],
  },
  {
    id: 'p-41',
    name: 'Oreo Original Vanilla Creme Sandwich Biscuits',
    category: 'Biscuits & Cookies',
    category_slug: 'packaged-food',
    brand: 'Oreo',
    image_url: '/images/products/Oreo.webp',
    variants: [
      { pack_size: '300 g Family Pack', price: 100 },
      { pack_size: '120 g Standard Pack', price: 40 },
    ],
  },
  {
    id: 'p-42',
    name: 'Parle-G Original Glucose Biscuits',
    category: 'Biscuits & Cookies',
    category_slug: 'packaged-food',
    brand: 'Parle',
    image_url: '/images/products/parle_g.webp',
    variants: [
      { pack_size: '800 g Super Saver', price: 90 },
      { pack_size: '250 g Value Pack', price: 30 },
    ],
  },
  {
    id: 'p-43',
    name: 'Britannia Good Day Butter Cookies',
    category: 'Biscuits & Cookies',
    category_slug: 'packaged-food',
    brand: 'Britannia',
    image_url: '/images/products/good_day.webp',
    variants: [
      { pack_size: '600 g Jumbo Pack', price: 150 },
      { pack_size: '200 g Standard Pack', price: 50 },
    ],
  },
  {
    id: 'p-44',
    name: 'Sunfeast Dark Fantasy Choco Fills',
    category: 'Biscuits & Cookies',
    category_slug: 'packaged-food',
    brand: 'Sunfeast',
    image_url: '/images/products/dark_fantasy.webp',
    variants: [
      { pack_size: '300 g Luxury Pack', price: 175 },
      { pack_size: '75 g Standard Pack', price: 45 },
    ],
  },
  {
    id: 'p-45',
    name: 'Sunfeast Marie Light Rich Crisp Biscuits',
    category: 'Biscuits & Cookies',
    category_slug: 'packaged-food',
    brand: 'Sunfeast',
    image_url: '/images/products/marie_light.webp',
    variants: [
      { pack_size: '300 g Value Pack', price: 45 },
      { pack_size: '120 g Pack', price: 20 },
    ],
  },
  {
    id: 'p-46',
    name: 'Britannia Fruity Treat Soft Cakes',
    category: 'Cakes & Rusk',
    category_slug: 'packaged-food',
    brand: 'Britannia',
    image_url: '/images/products/b_cakes.webp',
    variants: [
      { pack_size: '140 g Pack of 6', price: 40 },
      { pack_size: '45 g Twin Pack', price: 15 },
    ],
  },
  {
    id: 'p-47',
    name: 'Britannia Toastea Crispy Wheat Rusk',
    category: 'Cakes & Rusk',
    category_slug: 'packaged-food',
    brand: 'Britannia',
    image_url: '/images/products/b_rusk.webp',
    variants: [
      { pack_size: '600 g Family Pack', price: 90 },
      { pack_size: '200 g Standard Pack', price: 35 },
    ],
  },
  {
    id: 'p-48',
    name: "Lay's Classic Salted Potato Chips",
    category: 'Snacks & Munchies',
    category_slug: 'packaged-food',
    brand: "Lay's",
    image_url: '/images/products/Lays.webp',
    variants: [
      { pack_size: '115 g Party Pack', price: 50 },
      { pack_size: '50 g Standard Pack', price: 20 },
    ],
  },
  {
    id: 'p-49',
    name: 'Kurkure Masala Munch Crispy Snacks',
    category: 'Snacks & Munchies',
    category_slug: 'packaged-food',
    brand: 'Kurkure',
    image_url: '/images/products/Kurkure.webp',
    variants: [
      { pack_size: '115 g Party Pack', price: 50 },
      { pack_size: '50 g Standard Pack', price: 20 },
    ],
  },
  {
    id: 'p-50',
    name: 'Bingo Mad Angles Achaari Masti',
    category: 'Snacks & Munchies',
    category_slug: 'packaged-food',
    brand: 'Bingo',
    image_url: '/images/products/Bingo.webp',
    variants: [
      { pack_size: '130 g Party Pack', price: 50 },
      { pack_size: '66 g Standard Pack', price: 20 },
    ],
  },
  {
    id: 'p-51',
    name: "Haldiram's Nagpur Aloo Bhujia Namkeen",
    category: 'Snacks & Munchies',
    category_slug: 'packaged-food',
    brand: "Haldiram's",
    image_url: '/images/products/Haldirams.webp',
    variants: [
      { pack_size: '1 kg Mega Pack', price: 280 },
      { pack_size: '400 g Value Pack', price: 120 },
      { pack_size: '150 g Pack', price: 50 },
    ],
  },

  // ==========================================
  // HOME CARE & CLEANING
  // ==========================================
  {
    id: 'p-52',
    name: 'Ariel Matic Front & Top Load Detergent Powder',
    category: 'Laundry & Detergents',
    category_slug: 'home-care',
    brand: 'Ariel',
    image_url: '/images/products/ariel.webp',
    variants: [
      { pack_size: '4 kg Value Bag', price: 980 },
      { pack_size: '2 kg Pack', price: 510 },
      { pack_size: '1 kg Pouch', price: 265 },
    ],
  },
  {
    id: 'p-53',
    name: 'Rin Supreme Detergent Bar Cake',
    category: 'Laundry & Detergents',
    category_slug: 'home-care',
    brand: 'Rin',
    image_url: '/images/products/rin.webp',
    variants: [
      { pack_size: 'Pack of 4 (1000g)', price: 90 },
      { pack_size: '250 g Bar', price: 25 },
    ],
  },
  {
    id: 'p-54',
    name: 'Comfort After Wash Morning Fresh Fabric Conditioner',
    category: 'Laundry & Detergents',
    category_slug: 'home-care',
    brand: 'Comfort',
    image_url: '/images/products/comfort.webp',
    variants: [
      { pack_size: '2 Litre Bottle', price: 480 },
      { pack_size: '860 ml Bottle', price: 235 },
      { pack_size: '200 ml Pouch', price: 60 },
    ],
  },
  {
    id: 'p-55',
    name: 'Vim Lemon Dishwash Liquid Gel',
    category: 'Utensil Care',
    category_slug: 'home-care',
    brand: 'Vim',
    image_url: '/images/products/vim.webp',
    variants: [
      { pack_size: '2 Litre Economy Can', price: 520 },
      { pack_size: '750 ml Bottle', price: 210 },
      { pack_size: '250 ml Bottle', price: 75 },
    ],
  },
  {
    id: 'p-56',
    name: 'Harpic Power Plus Toilet Cleaner Liquid',
    category: 'Toilet & Bathroom',
    category_slug: 'home-care',
    brand: 'Harpic',
    image_url: '/images/products/harpic.webp',
    variants: [
      { pack_size: '1 Litre Twin Pack', price: 380 },
      { pack_size: '1 Litre Bottle', price: 195 },
      { pack_size: '500 ml Bottle', price: 105 },
    ],
  },
  {
    id: 'p-57',
    name: 'Lizol Disinfectant Floor Cleaner Citrus',
    category: 'Surface Cleaners',
    category_slug: 'home-care',
    brand: 'Lizol',
    image_url: '/images/products/lizol.webp',
    variants: [
      { pack_size: '2 Litre Economy Can', price: 410 },
      { pack_size: '1 Litre Bottle', price: 225 },
      { pack_size: '500 ml Bottle', price: 120 },
    ],
  },
  {
    id: 'p-58',
    name: 'Odonil Room Air Freshener Blocks Assorted',
    category: 'Air Fresheners',
    category_slug: 'home-care',
    brand: 'Odonil',
    image_url: '/images/products/odonil.webp',
    variants: [
      { pack_size: 'Pack of 4 (200g)', price: 195 },
      { pack_size: '50 g Single Block', price: 55 },
    ],
  },
  {
    id: 'p-59',
    name: 'All Out Ultra Mosquito Liquid Vaporizer Refill',
    category: 'Pest Control',
    category_slug: 'home-care',
    brand: 'All Out',
    image_url: '/images/products/all_out.webp',
    variants: [
      { pack_size: 'Pack of 4 Refills (180ml)', price: 320 },
      { pack_size: 'Pack of 2 Refills', price: 170 },
      { pack_size: 'Single Refill (45ml)', price: 90 },
    ],
  },
  {
    id: 'p-60',
    name: 'GoodKnight Gold Flash Liquid Vaporizer Machine + Refill',
    category: 'Pest Control',
    category_slug: 'home-care',
    brand: 'GoodKnight',
    image_url: '/images/products/good_night.webp',
    variants: [
      { pack_size: 'Machine + 2 Refills', price: 210 },
      { pack_size: 'Refill Twin Pack', price: 165 },
    ],
  },

  // ==========================================
  // ORAL CARE
  // ==========================================
  {
    id: 'p-61',
    name: 'Colgate Strong Teeth Calcium Cavity Protection Toothpaste',
    category: 'Toothpaste',
    category_slug: 'oral-care',
    brand: 'Colgate',
    image_url: '/images/products/colgate.webp',
    variants: [
      { pack_size: '500 g Saver Pack', price: 285 },
      { pack_size: '200 g Standard Tube', price: 125 },
      { pack_size: '100 g Tube', price: 65 },
    ],
  },
  {
    id: 'p-62',
    name: 'Sensodyne Rapid Relief Sensitivity Toothpaste',
    category: 'Toothpaste',
    category_slug: 'oral-care',
    brand: 'Sensodyne',
    image_url: '/images/products/sensodyne.webp',
    variants: [
      { pack_size: '150 g Twin Pack', price: 350 },
      { pack_size: '80 g Single Tube', price: 190 },
    ],
  },
  {
    id: 'p-63',
    name: 'Oral-B CrossAction Pro Health Soft Toothbrush',
    category: 'Toothbrushes',
    category_slug: 'oral-care',
    brand: 'Oral-B',
    image_url: '/images/products/oral_b.webp',
    variants: [
      { pack_size: 'Pack of 4 Family Set', price: 220 },
      { pack_size: 'Single Toothbrush', price: 60 },
    ],
  },

  // ==========================================
  // BATH, SOAP & HAIR CARE
  // ==========================================
  {
    id: 'p-64',
    name: 'Lifebuoy Total 10 Antibacterial Germ Protection Soap',
    category: 'Bathing Soaps',
    category_slug: 'bath-body',
    brand: 'Lifebuoy',
    image_url: '/images/products/lifebouy.webp',
    variants: [
      { pack_size: 'Pack of 4 (500g)', price: 150 },
      { pack_size: '125 g Single Bar', price: 40 },
    ],
  },
  {
    id: 'p-65',
    name: 'Dove Deeply Nourishing Moisturizing Cream Beauty Soap',
    category: 'Bathing Soaps',
    category_slug: 'bath-body',
    brand: 'Dove',
    image_url: '/images/products/dove.webp',
    variants: [
      { pack_size: 'Pack of 4 (400g)', price: 275 },
      { pack_size: '100 g Single Bar', price: 75 },
    ],
  },
  {
    id: 'p-66',
    name: 'Mysore Sandal Pure Sandalwood Oil Soap',
    category: 'Bathing Soaps',
    category_slug: 'bath-body',
    brand: 'Mysore Sandal',
    image_url: '/images/products/mysore_sandal.webp',
    variants: [
      { pack_size: 'Pack of 3 (450g)', price: 285 },
      { pack_size: '150 g Single Bar', price: 100 },
    ],
  },
  {
    id: 'p-67',
    name: 'Clinic Plus Strong & Long Health Shampoo with Milk Protein',
    category: 'Shampoo & Conditioner',
    category_slug: 'hair-care',
    brand: 'Clinic Plus',
    image_url: '/images/products/clinic_plus.webp',
    variants: [
      { pack_size: '1 Litre Family Bottle', price: 650 },
      { pack_size: '650 ml Bottle', price: 450 },
      { pack_size: '340 ml Bottle', price: 250 },
    ],
  },
  {
    id: 'p-68',
    name: 'Parachute 100% Pure Coconut Hair Oil',
    category: 'Hair Oils',
    category_slug: 'hair-care',
    brand: 'Parachute',
    image_url: '/images/products/parachute.webp',
    variants: [
      { pack_size: '500 ml Bottle', price: 225 },
      { pack_size: '300 ml Bottle', price: 145 },
      { pack_size: '175 ml Bottle', price: 90 },
    ],
  },
  {
    id: 'p-69',
    name: 'Indulekha Bringha Ayurvedic Hair Fall Oil with Comb',
    category: 'Hair Oils',
    category_slug: 'hair-care',
    brand: 'Indulekha',
    image_url: '/images/products/indulekha.webp',
    variants: [
      { pack_size: '100 ml Bottle', price: 430 },
      { pack_size: '50 ml Bottle', price: 240 },
    ],
  },

  // ==========================================
  // SKIN CARE, COSMETICS & HYGIENE
  // ==========================================
  {
    id: 'p-70',
    name: 'Glow & Lovely Advanced Multivitamin Brightening Cream',
    category: 'Skin Care',
    category_slug: 'personal-care',
    brand: 'Glow & Lovely',
    image_url: '/images/products/fair_and_lovely.webp',
    variants: [
      { pack_size: '110 g Tube', price: 210 },
      { pack_size: '50 g Tube', price: 110 },
      { pack_size: '25 g Tube', price: 60 },
    ],
  },
  {
    id: 'p-71',
    name: "Pond's Dreamflower Fragrant Talcum Powder",
    category: 'Talcs & Powders',
    category_slug: 'bath-body',
    brand: "Pond's",
    image_url: '/images/products/ponds.webp',
    variants: [
      { pack_size: '400 g Saver Can', price: 290 },
      { pack_size: '200 g Can', price: 160 },
      { pack_size: '100 g Bottle', price: 85 },
    ],
  },
  {
    id: 'p-72',
    name: 'Nivea Soft Light Moisturising Cream with Vitamin E',
    category: 'Skin Care',
    category_slug: 'personal-care',
    brand: 'Nivea',
    image_url: '/images/products/nivea.webp',
    variants: [
      { pack_size: '300 ml Tub', price: 399 },
      { pack_size: '200 ml Tub', price: 280 },
      { pack_size: '100 ml Tub', price: 160 },
    ],
  },
  {
    id: 'p-73',
    name: 'Vaseline Original Pure Skin Jelly',
    category: 'Skin Care',
    category_slug: 'personal-care',
    brand: 'Vaseline',
    image_url: '/images/products/vasaline.webp',
    variants: [
      { pack_size: '100 g Tub', price: 125 },
      { pack_size: '50 g Tub', price: 70 },
      { pack_size: '25 g Mini Tub', price: 40 },
    ],
  },
  {
    id: 'p-74',
    name: 'Elle 18 Color Pops Matte Lip Color',
    category: 'Cosmetics',
    category_slug: 'personal-care',
    brand: 'Elle 18',
    image_url: '/images/products/lipstic.webp',
    variants: [
      { pack_size: '4.3 g Bullet', price: 100 },
    ],
  },
  {
    id: 'p-75',
    name: 'Gillette Mach 3 Turbo Razor Blade Cartridges',
    category: "Men's Grooming",
    category_slug: 'personal-care',
    brand: 'Gillette',
    image_url: '/images/products/gillette.webp',
    variants: [
      { pack_size: 'Pack of 4 Cartridges', price: 650 },
      { pack_size: 'Pack of 2 Cartridges', price: 360 },
      { pack_size: 'Single Razor', price: 250 },
    ],
  },
  {
    id: 'p-76',
    name: 'Whisper Choice Ultra Sanitary Napkins XL Wings',
    category: 'Feminine Hygiene',
    category_slug: 'personal-care',
    brand: 'Whisper',
    image_url: '/images/products/whispers.webp',
    variants: [
      { pack_size: 'Pack of 40 Pads', price: 320 },
      { pack_size: 'Pack of 20 Pads', price: 170 },
      { pack_size: 'Pack of 6 Pads', price: 55 },
    ],
  },
  {
    id: 'p-77',
    name: 'Pampers All Round Protection Baby Diaper Pants L',
    category: 'Baby Care',
    category_slug: 'personal-care',
    brand: 'Pampers',
    image_url: '/images/products/pampers.webp',
    variants: [
      { pack_size: 'Large 64 Pants Mega Box', price: 999 },
      { pack_size: 'Large 32 Pants Pack', price: 549 },
      { pack_size: 'Large 10 Pants Pack', price: 199 },
    ],
  },

  // ==========================================
  // FRUITS & VEGETABLES (CONSOLIDATED CATALOG - 228 PRODUCTS)
  // ==========================================
  {
    id: "VRK-1001",
    name: "Green Chilli (Menasinakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_chilli_1001.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 11
          }
    ],
  },
  {
    id: "VRK-1002",
    name: "Onion (Eerulli)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/onion_1002.webp",
    variants: [
          {
                "pack_size": "1 kg",
                "price": 52
          }
    ],
  },
  {
    id: "VRK-1003",
    name: "Coriander Bunch (Kottambari Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/coriander_bunch_1003.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 12
          }
    ],
  },
  {
    id: "VRK-1004",
    name: "Potato (Alugadde)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/potato_1004.webp",
    variants: [
          {
                "pack_size": "1 kg",
                "price": 25
          }
    ],
  },
  {
    id: "VRK-1005",
    name: "Lemon (Nimbe)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/lemon_1005.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 46
          }
    ],
  },
  {
    id: "VRK-1006",
    name: "Green Cucumber (Southekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_cucumber_1006.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 17
          }
    ],
  },
  {
    id: "VRK-1007",
    name: "Orange Carrot",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/orange_carrot_1007.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 43
          }
    ],
  },
  {
    id: "VRK-1008",
    name: "Curry Leaves (Karibevina Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/curry_leaves_1008.webp",
    variants: [
          {
                "pack_size": "50 g",
                "price": 8
          }
    ],
  },
  {
    id: "VRK-1009",
    name: "Mint Leaves (Pudina Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/mint_leaves_1009.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 11
          }
    ],
  },
  {
    id: "VRK-1010",
    name: "Green Capsicum (Dappa Menasinakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_capsicum_1010.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 18
          }
    ],
  },
  {
    id: "VRK-1011",
    name: "English Cucumber (Southekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/english_cucumber_1011.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 32
          }
    ],
  },
  {
    id: "VRK-1012",
    name: "Desi Tomato",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/desi_tomato_1012.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 14
          }
    ],
  },
  {
    id: "VRK-1013",
    name: "Ooty Carrot",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ooty_carrot_1013.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 33
          }
    ],
  },
  {
    id: "VRK-1014",
    name: "Garlic (Bellulli)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/garlic_1014.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 40
          }
    ],
  },
  {
    id: "VRK-1015",
    name: "Button Mushroom (Anabe)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/button_mushroom_1015.webp",
    variants: [
          {
                "pack_size": "180 g",
                "price": 69
          }
    ],
  },
  {
    id: "VRK-1016",
    name: "Haricot Beans (Hurulikayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/haricot_beans_1016.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 25
          }
    ],
  },
  {
    id: "VRK-1017",
    name: "Spinach",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/spinach_1017.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 22
          }
    ],
  },
  {
    id: "VRK-1018",
    name: "Ginger",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ginger_1018.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 21
          }
    ],
  },
  {
    id: "VRK-1019",
    name: "Hybrid Tomato",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/hybrid_tomato_1019.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 13
          }
    ],
  },
  {
    id: "VRK-1020",
    name: "Coriander (Without Roots)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/coriander_1020.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 20
          }
    ],
  },
  {
    id: "VRK-1021",
    name: "Organically Grown Ginger (Shunti)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ginger_1021.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 48
          }
    ],
  },
  {
    id: "VRK-1022",
    name: "Organically Grown Tomato (Desi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_tomato_1022.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 32
          }
    ],
  },
  {
    id: "VRK-1023",
    name: "Broccoli (Kosugadde)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/broccoli_1023.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 40
          }
    ],
  },
  {
    id: "VRK-1024",
    name: "Peeled Garlic (Bellulli)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/peeled_garlic_1024.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 58
          }
    ],
  },
  {
    id: "VRK-1025",
    name: "Varikatri Brinjal (Badanekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/varikatri_brinjal_1025.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 15
          }
    ],
  },
  {
    id: "VRK-1026",
    name: "Cabbage (Yele Kosu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/cabbage_1026.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 19
          }
    ],
  },
  {
    id: "VRK-1027",
    name: "Cauliflower (Hoo Kosu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/cauliflower_1027.webp",
    variants: [
          {
                "pack_size": "300 g",
                "price": 33
          }
    ],
  },
  {
    id: "VRK-1028",
    name: "Beetroot",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/beetroot_1028.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 31
          }
    ],
  },
  {
    id: "VRK-1029",
    name: "Organically Grown Coriander (without Roots)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_coriander_1029.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 35
          }
    ],
  },
  {
    id: "VRK-1030",
    name: "Lady Finger (Bendekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/lady_finger_1030.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 15
          }
    ],
  },
  {
    id: "VRK-1031",
    name: "French Beans - 250 g (Hurulikayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/french_beans_250_g_1031.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 27
          }
    ],
  },
  {
    id: "VRK-1032",
    name: "Bottle Gourd (Sore Kayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/bottle_gourd_1032.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 20
          }
    ],
  },
  {
    id: "VRK-1033",
    name: "Spring Onion by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/spring_onion_by_origin_fresh_1033.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 79
          }
    ],
  },
  {
    id: "VRK-1034",
    name: "American Sweet Corn Cob (Jola)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/american_sweet_corn_cob_1034.webp",
    variants: [
          {
                "pack_size": "1 Unit",
                "price": 20
          }
    ],
  },
  {
    id: "VRK-1035",
    name: "Dill Leaves (Shepu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/dill_leaves_1035.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 12
          }
    ],
  },
  {
    id: "VRK-1036",
    name: "Amla (Nelli Kai)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/amla_1036.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 34
          }
    ],
  },
  {
    id: "VRK-1037",
    name: "Spring Onion (Eerulli Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/spring_onion_1037.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 21
          }
    ],
  },
  {
    id: "VRK-1038",
    name: "Organically Grown Green Cucumber (Southekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_green_cucumber_1038.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 35
          }
    ],
  },
  {
    id: "VRK-1039",
    name: "Organically Grown- Lady Finger (Bendekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_lady_finger_1039.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 30
          }
    ],
  },
  {
    id: "VRK-1040",
    name: "Radish (Moolangi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/radish_1040.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 23
          }
    ],
  },
  {
    id: "VRK-1041",
    name: "Corn Whole by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/corn_whole_by_origin_fresh_1041.webp",
    variants: [
          {
                "pack_size": "1 Unit",
                "price": 69
          }
    ],
  },
  {
    id: "VRK-1042",
    name: "Sweet Potato (Hasi Genasu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/sweet_potato_1042.webp",
    variants: [
          {
                "pack_size": "450 g",
                "price": 40
          }
    ],
  },
  {
    id: "VRK-1043",
    name: "Drumstick (Nuggekaayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/drumstick_1043.webp",
    variants: [
          {
                "pack_size": "2 pcs",
                "price": 20
          }
    ],
  },
  {
    id: "VRK-1044",
    name: "Organically Grown Green Beans by Bhoomi Farms",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_green_beans_by_bhoomi_farms_1044.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 99
          }
    ],
  },
  {
    id: "VRK-1045",
    name: "Assorted Capsicum - (Red, Yellow, Green)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/assorted_capsicum_1045.webp",
    variants: [
          {
                "pack_size": "3 pcs",
                "price": 112
          }
    ],
  },
  {
    id: "VRK-1046",
    name: "Organically Grown - Onion (Eerulli)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_onion_1046.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 59
          }
    ],
  },
  {
    id: "VRK-1047",
    name: "Knol Khol (Navilu Kosu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/knol_khol_1047.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 21
          }
    ],
  },
  {
    id: "VRK-1049",
    name: "Fenugreek (Menthe Kalu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/fenugreek_1049.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 26
          }
    ],
  },
  {
    id: "VRK-1050",
    name: "Ridge Gourd (Heerekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ridge_gourd_1050.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 23
          }
    ],
  },
  {
    id: "VRK-1051",
    name: "Brinjal - Bharta (Badanekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/brinjal_bharta_1051.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 29
          }
    ],
  },
  {
    id: "VRK-1052",
    name: "Ivy Gourd (Thondekaayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ivy_gourd_1052.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 11
          }
    ],
  },
  {
    id: "VRK-1053",
    name: "Cluster Beans (Gorikayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/cluster_beans_1053.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 16
          }
    ],
  },
  {
    id: "VRK-1054",
    name: "Chow Chow",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/chow_chow_1054.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 27
          }
    ],
  },
  {
    id: "VRK-1055",
    name: "Green Peas (Battani)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_peas_1055.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 72
          },
          {
                "pack_size": "200 g",
                "price": 110
          }
    ],
  },
  {
    id: "VRK-1056",
    name: "Sweet Corn - Packet (Sihi Corn)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/sweet_corn_packet_1056.webp",
    variants: [
          {
                "pack_size": "180 g",
                "price": 32
          }
    ],
  },
  {
    id: "VRK-1057",
    name: "Organically Grown Bottle Gourd by Bhoomi Farms",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_bottle_gourd_by_bhoomi_farms_1057.webp",
    variants: [
          {
                "pack_size": "600 g",
                "price": 109
          }
    ],
  },
  {
    id: "VRK-1058",
    name: "Fenugreek Leaves (without Roots)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/fenugreek_leaves_1058.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 31
          }
    ],
  },
  {
    id: "VRK-1059",
    name: "Green Lettuce (Letis Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_lettuce_1059.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 27
          }
    ],
  },
  {
    id: "VRK-1060",
    name: "Green Capsicum by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_capsicum_by_origin_fresh_1060.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 57
          }
    ],
  },
  {
    id: "VRK-1061",
    name: "Organically Grown Beetroot",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_beetroot_1061.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 34
          }
    ],
  },
  {
    id: "VRK-1062",
    name: "Organically Grown Lemon (Nimbe)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_lemon_1062.webp",
    variants: [
          {
                "pack_size": "220 g",
                "price": 60
          }
    ],
  },
  {
    id: "VRK-1063",
    name: "Drumstick Leaves (Moringa Leaves)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/drumstick_leaves_1063.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 18
          }
    ],
  },
  {
    id: "VRK-1064",
    name: "Raw Banana (Baale Kayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/raw_banana_1064.webp",
    variants: [
          {
                "pack_size": "3 pcs",
                "price": 48
          }
    ],
  },
  {
    id: "VRK-1065",
    name: "Broad Beans 250 g (Avarekai)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/broad_beans_250_g_1065.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 18
          }
    ],
  },
  {
    id: "VRK-1066",
    name: "Green Pumpkin (Kumbalakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_pumpkin_1066.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 45
          }
    ],
  },
  {
    id: "VRK-1067",
    name: "Avarekai Peeled (Avarekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/avarekai_peeled_1067.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 97
          }
    ],
  },
  {
    id: "VRK-1068",
    name: "Organically Grown Cabbage by Bhoomi Farms",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_cabbage_by_bhoomi_farms_1068.webp",
    variants: [
          {
                "pack_size": "300 g",
                "price": 129
          }
    ],
  },
  {
    id: "VRK-1069",
    name: "Sambhar Onion (Eerulli)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/sambhar_onion_1069.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 27
          }
    ],
  },
  {
    id: "VRK-1070",
    name: "Organically Grown Green Capsicum",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_green_capsicum_1070.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 33
          }
    ],
  },
  {
    id: "VRK-1071",
    name: "Organically Grown Chilli (Menasinakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_chilli_1071.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 26
          }
    ],
  },
  {
    id: "VRK-1072",
    name: "Baby Potato (Baby Alugadde)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/baby_potato_1072.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 21
          }
    ],
  },
  {
    id: "VRK-1073",
    name: "Mangalore Cucumber (Southekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/mangalore_cucumber_1073.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 19
          }
    ],
  },
  {
    id: "VRK-1075",
    name: "Baby Corn - Packet",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/baby_corn_packet_1075.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 45
          }
    ],
  },
  {
    id: "VRK-1076",
    name: "Italian Basil Leaves (Tulasi Yelegalu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/italian_basil_leaves_1076.webp",
    variants: [
          {
                "pack_size": "50 g",
                "price": 35
          }
    ],
  },
  {
    id: "VRK-1077",
    name: "Cowpea Beans (Alasande Kayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/cowpea_beans_1077.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 21
          }
    ],
  },
  {
    id: "VRK-1078",
    name: "Green Moong Sprouts (Molke Kalu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_moong_sprouts_1078.webp",
    variants: [
          {
                "pack_size": "150 g",
                "price": 48
          }
    ],
  },
  {
    id: "VRK-1079",
    name: "Red Bell Pepper (Kempu Dappa Menasina Kaayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/red_bell_pepper_1079.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 49
          }
    ],
  },
  {
    id: "VRK-1080",
    name: "Organically Grown Garlic (Bellulli)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_garlic_1080.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 47
          }
    ],
  },
  {
    id: "VRK-1081",
    name: "Green Amaranthus Leaves (Tandulsa)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_amaranthus_leaves_1081.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 17
          }
    ],
  },
  {
    id: "VRK-1082",
    name: "Organically Grown Ooty Carrot",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ooty_carrot_1082.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 52
          }
    ],
  },
  {
    id: "VRK-1083",
    name: "Ozone Washed Light Green Chilli (Pesticide Cleaned)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ozone_washed_light_green_chilli_1083.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 19
          }
    ],
  },
  {
    id: "VRK-1084",
    name: "Ooty Potato",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ooty_potato_1084.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 46
          }
    ],
  },
  {
    id: "VRK-1085",
    name: "Green Zucchini",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_zucchini_1085.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 28
          }
    ],
  },
  {
    id: "VRK-1086",
    name: "Hydroponic Iceberg Lettuce by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/hydroponic_iceberg_lettuce_by_origin_fresh_1086.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 145
          }
    ],
  },
  {
    id: "VRK-1087",
    name: "Long Purple Brinjal (Badanekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/long_purple_brinjal_1087.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 22
          }
    ],
  },
  {
    id: "VRK-1088",
    name: "Horse Gram Sprouts (Molke Kalu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/horse_gram_sprouts_1088.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 36
          }
    ],
  },
  {
    id: "VRK-1089",
    name: "Organically Grown American Corn Cob",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_american_corn_cob_1089.webp",
    variants: [
          {
                "pack_size": "1 Unit",
                "price": 31
          }
    ],
  },
  {
    id: "VRK-1090",
    name: "Cherry Tomatoes - Packet",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/cherry_tomatoes_packet_1090.webp",
    variants: [
          {
                "pack_size": "150 g",
                "price": 26
          }
    ],
  },
  {
    id: "VRK-1091",
    name: "Organically Grown Bottle Gourd (Sore Kayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_bottle_gourd_1091.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 43
          }
    ],
  },
  {
    id: "VRK-1092",
    name: "Cabbage by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/cabbage_by_origin_fresh_1092.webp",
    variants: [
          {
                "pack_size": "600 g",
                "price": 99
          }
    ],
  },
  {
    id: "VRK-1093",
    name: "Bitter Gourd (Hagalakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/bitter_gourd_1093.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 28
          }
    ],
  },
  {
    id: "VRK-1094",
    name: "Iceberg Lettuce (Letis Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/iceberg_lettuce_1094.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 32
          }
    ],
  },
  {
    id: "VRK-1095",
    name: "Pulao Mix",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/pulao_mix_1095.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 89
          }
    ],
  },
  {
    id: "VRK-1096",
    name: "Picador Chilli (Menasinakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/picador_chilli_1096.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 15
          }
    ],
  },
  {
    id: "VRK-1097",
    name: "Baby Onion (Peeled)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/baby_onion_1097.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 46
          }
    ],
  },
  {
    id: "VRK-1098",
    name: "Organically Grown Potato (Alugadde)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_potato_1098.webp",
    variants: [
          {
                "pack_size": "1 kg",
                "price": 65
          }
    ],
  },
  {
    id: "VRK-1099",
    name: "Long Green Brinjal (Badanekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/long_green_brinjal_1099.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 36
          }
    ],
  },
  {
    id: "VRK-1100",
    name: "Organically Grown French Beans (Hurulikayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_french_beans_1100.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 39
          }
    ],
  },
  {
    id: "VRK-1101",
    name: "Oyster Mushroom by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/oyster_mushroom_by_origin_fresh_1101.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 179
          }
    ],
  },
  {
    id: "VRK-1102",
    name: "Organically Grown Mint Leaves (Pudina Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_mint_leaves_1102.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 32
          }
    ],
  },
  {
    id: "VRK-1103",
    name: "Organically Grown Orange Carrot",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_orange_carrot_1103.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 42
          }
    ],
  },
  {
    id: "VRK-1104",
    name: "Ash Gourd 250 g Portion (Kumbala Kayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ash_gourd_250_g_portion_1104.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 38
          }
    ],
  },
  {
    id: "VRK-1105",
    name: "Organically Grown Bitter Gourd (Hagalakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_bitter_gourd_1105.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 20
          }
    ],
  },
  {
    id: "VRK-1106",
    name: "Organically Grown Sweet Whole Pumpkin by Bhoomi Farms",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_sweet_whole_pumpkin_by_bhoomi_farms_1106.webp",
    variants: [
          {
                "pack_size": "5 kg",
                "price": 159
          }
    ],
  },
  {
    id: "VRK-1107",
    name: "Hydroponic Celery by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/hydroponic_celery_by_origin_fresh_1107.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 127
          }
    ],
  },
  {
    id: "VRK-1108",
    name: "Pointed Gourd (250 g)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/pointed_gourd_1108.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 51
          }
    ],
  },
  {
    id: "VRK-1109",
    name: "Pumpkin Yellow (Cut)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/pumpkin_yellow_1109.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 42
          }
    ],
  },
  {
    id: "VRK-1110",
    name: "Baby Spinach",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/baby_spinach_1110.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 49
          }
    ],
  },
  {
    id: "VRK-1111",
    name: "Organically Grown Ivy Gourd (Thondekaayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ivy_gourd_1111.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 30
          }
    ],
  },
  {
    id: "VRK-1112",
    name: "Green Tomato (Hasiru Tomaato)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_tomato_1112.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 14
          }
    ],
  },
  {
    id: "VRK-1113",
    name: "Organically Grown Cabbage (Yele Kosu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_cabbage_1113.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 43
          }
    ],
  },
  {
    id: "VRK-1114",
    name: "Brown Chana Sprouts (Molke Kalu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/brown_chana_sprouts_1114.webp",
    variants: [
          {
                "pack_size": "150 g",
                "price": 35
          }
    ],
  },
  {
    id: "VRK-1115",
    name: "Neem Leaves (Bevu Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/neem_leaves_1115.webp",
    variants: [
          {
                "pack_size": "1 pack",
                "price": 19
          }
    ],
  },
  {
    id: "VRK-1116",
    name: "Forest Bitter Gourd (Hagalakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/forest_bitter_gourd_1116.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 23
          }
    ],
  },
  {
    id: "VRK-1117",
    name: "White Oyster Mushroom (Anabe)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/white_oyster_mushroom_1117.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 61
          }
    ],
  },
  {
    id: "VRK-1118",
    name: "Organically Grown - English Cucumber (Southekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_english_cucumber_1118.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 47
          }
    ],
  },
  {
    id: "VRK-1119",
    name: "Raw Turmeric (Arishina)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/raw_turmeric_1119.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 72
          }
    ],
  },
  {
    id: "VRK-1120",
    name: "Premium Asparagus",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/premium_asparagus_1120.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 139
          }
    ],
  },
  {
    id: "VRK-1121",
    name: "Yellow Bell Pepper (Haladi Dappa Menasina Kaayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/yellow_bell_pepper_1121.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 43
          }
    ],
  },
  {
    id: "VRK-1122",
    name: "Drumstick Cut (Nuggekaayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/drumstick_cut_1122.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 38
          }
    ],
  },
  {
    id: "VRK-1123",
    name: "Hydroponic Spinach",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/hydroponic_spinach_1123.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 53
          }
    ],
  },
  {
    id: "VRK-1124",
    name: "Ozone Washed Ooty Carrot (Pesticide Cleaned)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ozone_washed_ooty_carrot_1124.webp",
    variants: [
          {
                "pack_size": "260 g",
                "price": 42
          }
    ],
  },
  {
    id: "VRK-1125",
    name: "Disco Pumpkin (Kumbalakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/disco_pumpkin_1125.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 54
          }
    ],
  },
  {
    id: "VRK-1126",
    name: "Fresh Rosemary",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/fresh_rosemary_1126.webp",
    variants: [
          {
                "pack_size": "10 g",
                "price": 18
          }
    ],
  },
  {
    id: "VRK-1127",
    name: "Red Amaranthus Leaves (without roots)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/red_amaranthus_leaves_1127.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 30
          },
          {
                "pack_size": "250 g",
                "price": 21
          }
    ],
  },
  {
    id: "VRK-1128",
    name: "Organically Grown Ridge Gourd",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ridge_gourd_1128.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 54
          }
    ],
  },
  {
    id: "VRK-1129",
    name: "Ash Gourd (Kumbala Kayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ash_gourd_1129.webp",
    variants: [
          {
                "pack_size": "5 kg",
                "price": 54
          }
    ],
  },
  {
    id: "VRK-1130",
    name: "Ginger Chopped (Shunti)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ginger_chopped_1130.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 41
          }
    ],
  },
  {
    id: "VRK-1132",
    name: "Yellow Zucchini",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/yellow_zucchini_1132.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 41
          }
    ],
  },
  {
    id: "VRK-1133",
    name: "Arvi (Kesuvina Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/arvi_1133.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 21
          }
    ],
  },
  {
    id: "VRK-1134",
    name: "Galangal  by Origin Fresh (Herb)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/galangal_by_origin_fresh_1134.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 145
          }
    ],
  },
  {
    id: "VRK-1135",
    name: "Banana Stem (Baale Beru)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/banana_stem_1135.webp",
    variants: [
          {
                "pack_size": "800 g",
                "price": 19
          }
    ],
  },
  {
    id: "VRK-1136",
    name: "Organically Grown Drumstick",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_drumstick_1136.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 44
          }
    ],
  },
  {
    id: "VRK-1137",
    name: "Organically Grown Sweet Diced Pumpkin by Bhoomi Farms",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_sweet_diced_pumpkin_by_bhoomi_farms_1137.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 38
          }
    ],
  },
  {
    id: "VRK-1138",
    name: "Mix Cherry Tomatoes",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/mix_cherry_tomatoes_1138.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 39
          }
    ],
  },
  {
    id: "VRK-1139",
    name: "Organically Grown Chow Chow",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_chow_chow_1139.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 28
          }
    ],
  },
  {
    id: "VRK-1140",
    name: "Raw Papaya (Parangi Kaayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/raw_papaya_1140.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 43
          }
    ],
  },
  {
    id: "VRK-1141",
    name: "Organically Grown Sambhar Onion",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_sambhar_onion_1141.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 45
          }
    ],
  },
  {
    id: "VRK-1142",
    name: "Snake Gourd (Paduvalakai)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/snake_gourd_1142.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 23
          }
    ],
  },
  {
    id: "VRK-1143",
    name: "Thai Bird Eye Chilli - Red (Menasinakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/thai_bird_eye_chilli_red_1143.webp",
    variants: [
          {
                "pack_size": "20 g",
                "price": 69
          }
    ],
  },
  {
    id: "VRK-1144",
    name: "Cauliflower Florets (Hoo Kosu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/cauliflower_florets_1144.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 45
          }
    ],
  },
  {
    id: "VRK-1145",
    name: "Leek by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/leek_by_origin_fresh_1145.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 153
          }
    ],
  },
  {
    id: "VRK-1146",
    name: "Lemongrass (Nimbe Hullu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/lemongrass_1146.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 32
          }
    ],
  },
  {
    id: "VRK-1147",
    name: "Broccoli Florets",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/broccoli_florets_1147.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 89
          }
    ],
  },
  {
    id: "VRK-1148",
    name: "Lettuce Mix",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/lettuce_mix_1148.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 34
          }
    ],
  },
  {
    id: "VRK-1149",
    name: "Groundnuts",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/groundnuts_1149.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 44
          }
    ],
  },
  {
    id: "VRK-1150",
    name: "Organically Grown Snake Gourd",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_snake_gourd_1150.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 46
          }
    ],
  },
  {
    id: "VRK-1151",
    name: "Spine Gourd (Maada Hagalakayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/spine_gourd_1151.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 65
          }
    ],
  },
  {
    id: "VRK-1152",
    name: "Red Cabbage (Yele Kosu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/red_cabbage_1152.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 68
          }
    ],
  },
  {
    id: "VRK-1153",
    name: "Organically Grown Colocasia (Kesuvina Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_colocasia_1153.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 35
          }
    ],
  },
  {
    id: "VRK-1154",
    name: "Ozone Washed Beetroot (Pesticide Cleaned)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ozone_washed_beetroot_1154.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 35
          }
    ],
  },
  {
    id: "VRK-1155",
    name: "Organically Grown Radish",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_radish_1155.webp",
    variants: [
          {
                "pack_size": "350 g",
                "price": 38
          }
    ],
  },
  {
    id: "VRK-1156",
    name: "Ozone Washed Hybrid Tomato (Pesticide Cleaned)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ozone_washed_hybrid_tomato_1156.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 26
          }
    ],
  },
  {
    id: "VRK-1157",
    name: "Bok Choy",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/bok_choy_1157.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 63
          }
    ],
  },
  {
    id: "VRK-1158",
    name: "Jumbo Green Asparagus",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/jumbo_green_asparagus_1158.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 139
          }
    ],
  },
  {
    id: "VRK-1159",
    name: "Mustard Leaves (Saasive Soppu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/mustard_leaves_1159.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 22
          }
    ],
  },
  {
    id: "VRK-1160",
    name: "Organically Grown Ash Gourd (Portion)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ash_gourd_1160.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 34
          }
    ],
  },
  {
    id: "VRK-1161",
    name: "Organically Grown Sambhar Cucumber",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_sambhar_cucumber_1161.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 42
          }
    ],
  },
  {
    id: "VRK-1162",
    name: "Ozone Washed Haricot Beans (Pesticide Cleaned)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ozone_washed_haricot_beans_1162.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 42
          }
    ],
  },
  {
    id: "VRK-1163",
    name: "Lemon - Imported (Nimbe)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/lemon_imported_1163.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 114
          }
    ],
  },
  {
    id: "VRK-1164",
    name: "Lady Finger Diced (Bendekayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/lady_finger_diced_1164.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 44
          }
    ],
  },
  {
    id: "VRK-1165",
    name: "Ozone Washed Capsicum (Pesticide Cleaned)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ozone_washed_capsicum_1165.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 34
          }
    ],
  },
  {
    id: "VRK-1166",
    name: "Premium Yellow Capsicum",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/premium_yellow_capsicum_1166.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 209
          }
    ],
  },
  {
    id: "VRK-1167",
    name: "Wheat Grass",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/wheat_grass_1167.webp",
    variants: [
          {
                "pack_size": "25 g",
                "price": 41
          }
    ],
  },
  {
    id: "VRK-1168",
    name: "Celery",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/celery_1168.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 26
          }
    ],
  },
  {
    id: "VRK-1169",
    name: "Fresh Green Jalapeno",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/fresh_green_jalapeno_1169.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 81
          }
    ],
  },
  {
    id: "VRK-1170",
    name: "Organically Grown Sweet Pumpkin  by Bhoomi Farms (Portion)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_sweet_pumpkin_by_bhoomi_farms_1170.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 45
          }
    ],
  },
  {
    id: "VRK-1171",
    name: "Shimeji White Mushroom by Origin Fresh",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/shimeji_white_mushroom_by_origin_fresh_1171.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 366
          }
    ],
  },
  {
    id: "VRK-1172",
    name: "Organically Grown Knol Khol",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_knol_khol_1172.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 30
          }
    ],
  },
  {
    id: "VRK-1173",
    name: "Fresh Thyme",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/fresh_thyme_1173.webp",
    variants: [
          {
                "pack_size": "10 g",
                "price": 14
          }
    ],
  },
  {
    id: "VRK-1174",
    name: "Indian Pencil Asparagus",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/indian_pencil_asparagus_1174.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 139
          }
    ],
  },
  {
    id: "VRK-1175",
    name: "Milky Mushroom (Anabe)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/milky_mushroom_1175.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 110
          }
    ],
  },
  {
    id: "VRK-1176",
    name: "Ooty Beetroot",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/ooty_beetroot_1176.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 27
          }
    ],
  },
  {
    id: "VRK-1177",
    name: "Organically Grown Broad Beans",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_broad_beans_1177.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 35
          }
    ],
  },
  {
    id: "VRK-1178",
    name: "Gondhoraj Lime",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/gondhoraj_lime_1178.webp",
    variants: [
          {
                "pack_size": "3 pcs",
                "price": 104
          }
    ],
  },
  {
    id: "VRK-1179",
    name: "Organically Grown Raw Papaya",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_raw_papaya_1179.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 41
          }
    ],
  },
  {
    id: "VRK-1180",
    name: "Premium Yellow Lemon",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/premium_yellow_lemon_1180.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 689
          }
    ],
  },
  {
    id: "VRK-1181",
    name: "Cabbage - Shredded (Yele Kosu)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/cabbage_shredded_1181.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 32
          }
    ],
  },
  {
    id: "VRK-1182",
    name: "Chinese Fried Rice/Noodles Veggie Mix (Tarkari Mix)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/chinese_fried_rice_noodles_veggie_mix_1182.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 48
          }
    ],
  },
  {
    id: "VRK-1183",
    name: "Yam (Portion)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/yam_1183.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 61
          }
    ],
  },
  {
    id: "VRK-1184",
    name: "Out of Stock",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/out_of_stock_1184.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 45
          }
    ],
  },
  {
    id: "VRK-1185",
    name: "Organically Grown Ring Beans (Hurulikayi)",
    category: "Fresh Vegetables",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ring_beans_1185.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 45
          }
    ],
  },
  {
    id: "VRK-1186",
    name: "Yellaki Banana (Yellaki Baale Hannu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/yellaki_banana_1186.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 74
          }
    ],
  },
  {
    id: "VRK-1187",
    name: "Baby Banana (Baale Hannu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/baby_banana_1187.webp",
    variants: [
          {
                "pack_size": "4 pcs",
                "price": 25
          }
    ],
  },
  {
    id: "VRK-1188",
    name: "Brown Coconut (Tenginakayi)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/brown_coconut_1188.webp",
    variants: [
          {
                "pack_size": "1 Unit",
                "price": 47
          }
    ],
  },
  {
    id: "VRK-1189",
    name: "Blueberry from Peru by Origin Fresh",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/blueberry_from_peru_by_origin_fresh_1189.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 409
          }
    ],
  },
  {
    id: "VRK-1190",
    name: "Tender Coconut (Thengina Kayi)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/tender_coconut_1190.webp",
    variants: [
          {
                "pack_size": "1 Unit",
                "price": 75
          }
    ],
  },
  {
    id: "VRK-1191",
    name: "Banana (Baale Hannu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/banana_1191.webp",
    variants: [
          {
                "pack_size": "3 pcs",
                "price": 25
          }
    ],
  },
  {
    id: "VRK-1192",
    name: "Royal Gala Apple (Italy / Poland)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/royal_gala_apple_1192.webp",
    variants: [
          {
                "pack_size": "300 g",
                "price": 153
          }
    ],
  },
  {
    id: "VRK-1193",
    name: "Peeled Pomegranate - Snack Pack",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/peeled_pomegranate_snack_pack_1193.webp",
    variants: [
          {
                "pack_size": "80 g",
                "price": 69
          }
    ],
  },
  {
    id: "VRK-1194",
    name: "Mini Orange (Imported)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/mini_orange_1194.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 105
          }
    ],
  },
  {
    id: "VRK-1195",
    name: "Organically Grown Yellaki Banana By Akshayakalpa Organic - 500 g",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_yellaki_banana_by_akshayakalpa_organic_500_1195.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 98
          }
    ],
  },
  {
    id: "VRK-1196",
    name: "Avocado Hass - Tanzania (Benne Hannu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/avocado_hass_tanzania_1196.webp",
    variants: [
          {
                "pack_size": "150 g",
                "price": 89
          }
    ],
  },
  {
    id: "VRK-1197",
    name: "Papaya",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/papaya_1197.webp",
    variants: [
          {
                "pack_size": "700 g",
                "price": 76
          }
    ],
  },
  {
    id: "VRK-1198",
    name: "Pomegranate - 2 pieces (350-450 g)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/pomegranate_2_pieces_1198.webp",
    variants: [
          {
                "pack_size": "450 g",
                "price": 75
          }
    ],
  },
  {
    id: "VRK-1199",
    name: "Blueberry - Imported",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/blueberry_imported_1199.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 229
          }
    ],
  },
  {
    id: "VRK-1200",
    name: "Jumbo Blueberry",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/jumbo_blueberry_1200.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 319
          }
    ],
  },
  {
    id: "VRK-1201",
    name: "Thai Pink Guava (Seebe Hannu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/thai_pink_guava_1201.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 92
          }
    ],
  },
  {
    id: "VRK-1202",
    name: "Grapes - Bangalore Blue (Nili Drakshigalu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/grapes_bangalore_blue_1202.webp",
    variants: [
          {
                "pack_size": "400 g",
                "price": 50
          }
    ],
  },
  {
    id: "VRK-1203",
    name: "Kiran Watermelon",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/kiran_watermelon_1203.webp",
    variants: [
          {
                "pack_size": "2 kg",
                "price": 88
          }
    ],
  },
  {
    id: "VRK-1204",
    name: "Everyday Apple",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/everyday_apple_1204.webp",
    variants: [
          {
                "pack_size": "210 g",
                "price": 90
          }
    ],
  },
  {
    id: "VRK-1205",
    name: "Green Kiwi (Kiwi Hannu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/green_kiwi_1205.webp",
    variants: [
          {
                "pack_size": "3 pcs",
                "price": 131
          }
    ],
  },
  {
    id: "VRK-1206",
    name: "Avocado Hass (Tanzania)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/avocado_hass_1206.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 169
          }
    ],
  },
  {
    id: "VRK-1207",
    name: "Pink Lady Apple - USA (Sebu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/pink_lady_apple_usa_1207.webp",
    variants: [
          {
                "pack_size": "300 g",
                "price": 149
          }
    ],
  },
  {
    id: "VRK-1208",
    name: "Premium Mini Orange",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/premium_mini_orange_1208.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 102
          }
    ],
  },
  {
    id: "VRK-1209",
    name: "Brown Coconut Chunks (Thengina Kayi)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/brown_coconut_chunks_1209.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 44
          }
    ],
  },
  {
    id: "VRK-1210",
    name: "Pomegranate - 1 piece (175-225 g)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/pomegranate_1_piece_1210.webp",
    variants: [
          {
                "pack_size": "225 g",
                "price": 38
          }
    ],
  },
  {
    id: "VRK-1211",
    name: "Nendran Banana (Baale Hannu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/nendran_banana_1211.webp",
    variants: [
          {
                "pack_size": "3 pcs",
                "price": 83
          }
    ],
  },
  {
    id: "VRK-1212",
    name: "Pear Beauty - South Africa (Marasebu)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/pear_beauty_south_africa_1212.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 169
          }
    ],
  },
  {
    id: "VRK-1213",
    name: "Chowghat Orange Dwarf Coconut (300+ ml)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/chowghat_orange_dwarf_coconut_1213.webp",
    variants: [
          {
                "pack_size": "1 Unit",
                "price": 89
          }
    ],
  },
  {
    id: "VRK-1214",
    name: "Premium Imported Orange",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/premium_imported_orange_1214.webp",
    variants: [
          {
                "pack_size": "750 g",
                "price": 279
          }
    ],
  },
  {
    id: "VRK-1215",
    name: "Valencia Navel Orange (Imported)",
    category: "Fresh Fruits",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/valencia_navel_orange_1215.webp",
    variants: [
          {
                "pack_size": "350 g",
                "price": 116
          }
    ],
  },
  {
    id: "VRK-1238",
    name: "Hydroponic Red Bell Pepper By Evergreen Farms",
    category: "Exotics",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/hydroponic_red_bell_pepper_by_evergreen_farms_1238.webp",
    variants: [
          {
                "pack_size": "125 g",
                "price": 79
          }
    ],
  },
  {
    id: "VRK-1240",
    name: "Zespri Sungold Kiwi (Kiwi Hannu)",
    category: "Exotics",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/zespri_sungold_kiwi_1240.webp",
    variants: [
          {
                "pack_size": "2 pcs",
                "price": 115
          }
    ],
  },
  {
    id: "VRK-1242",
    name: "Shine Muscat Green Grapes (Hasiru Drakshigalu)",
    category: "Exotics",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/shine_muscat_green_grapes_1242.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 106
          }
    ],
  },
  {
    id: "VRK-1243",
    name: "Mr. Apple New Zealand Royal Gala (Sebu)",
    category: "Exotics",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/mr_apple_new_zealand_royal_gala_1243.webp",
    variants: [
          {
                "pack_size": "300 g",
                "price": 153
          }
    ],
  },
  {
    id: "VRK-1244",
    name: "Hydroponic Red Cherry Tomatoes By Evergreen Farms",
    category: "Exotics",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/hydroponic_red_cherry_tomatoes_by_evergreen_farms_1244.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 99
          }
    ],
  },
  {
    id: "VRK-1245",
    name: "Red-Globe Grapes (Kempu Drakshigalu)",
    category: "Exotics",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/red_globe_grapes_1245.webp",
    variants: [
          {
                "pack_size": "200 g",
                "price": 103
          }
    ],
  },
  {
    id: "VRK-1265",
    name: "Premium Basil Leaves",
    category: "Leafs & Herbs",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/premium_basil_leaves_1265.webp",
    variants: [
          {
                "pack_size": "50 g",
                "price": 109
          }
    ],
  },
  {
    id: "VRK-1268",
    name: "Premium Parsley",
    category: "Leafs & Herbs",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/premium_parsley_1268.webp",
    variants: [
          {
                "pack_size": "40 g",
                "price": 119
          }
    ],
  },
  {
    id: "VRK-1274",
    name: "Premium Lemongrass",
    category: "Leafs & Herbs",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/premium_lemongrass_1274.webp",
    variants: [
          {
                "pack_size": "100 g",
                "price": 109
          }
    ],
  },
  {
    id: "VRK-1276",
    name: "Organically Grown Palak / Spinach by Bhoomi Farms",
    category: "Leafs & Herbs",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ring_beans_1185.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 99
          }
    ],
  },
  {
    id: "VRK-1277",
    name: "Holy Tulsi (Tulsi Soppu)",
    category: "Leafs & Herbs",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ring_beans_1185.webp",
    variants: [
          {
                "pack_size": "10 g",
                "price": 15
          }
    ],
  },
  {
    id: "VRK-1278",
    name: "Malabar Spinach (Basale Soppu / Palak Soppu)",
    category: "Leafs & Herbs",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ring_beans_1185.webp",
    variants: [
          {
                "pack_size": "250 g",
                "price": 22
          }
    ],
  },
  {
    id: "VRK-1279",
    name: "Parsley",
    category: "Leafs & Herbs",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ring_beans_1185.webp",
    variants: [
          {
                "pack_size": "25 g",
                "price": 20
          }
    ],
  },
  {
    id: "VRK-1280",
    name: "Premium Iceberg Lettuce by Freshbury",
    category: "Leafs & Herbs",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/organically_grown_ring_beans_1185.webp",
    variants: [
          {
                "pack_size": "150 g",
                "price": 119
          }
    ],
  },
  {
    id: "VRK-1299",
    name: "Muskmelon (Karbuja)",
    category: "Seasonal",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/muskmelon_1299.webp",
    variants: [
          {
                "pack_size": "500 g",
                "price": 52
          }
    ],
  },
  {
    id: "VRK-1308",
    name: "Sweet Lime (Sihi Mosambi)",
    category: "Seasonal",
    category_slug: "fruits-veg",
    brand: "Fresh Produce",
    image_url: "/images/products/fruits-veg/sweet_lime_1308.webp",
    variants: [
          {
                "pack_size": "700 g",
                "price": 38
          }
    ],
  },
];

// Helper to filter products by category slug
export function getProductsByCategory(categorySlug: string): (ProductCardProduct & { category_slug: string })[] {
  const normalized = categorySlug.toLowerCase();
  
  if (normalized === 'fruits-veg' || normalized === 'fruits-vegetables') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'fruits-veg');
  }
  if (normalized === 'grocery' || normalized === 'groceries') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'grocery');
  }
  if (normalized === 'dairy') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'dairy');
  }
  if (normalized === 'packaged-food') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'packaged-food');
  }
  if (normalized === 'home-care') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'home-care');
  }
  if (normalized === 'personal-care') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'personal-care');
  }
  if (normalized === 'oral-care') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'oral-care');
  }
  if (normalized === 'hair-care') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'hair-care');
  }
  if (normalized === 'bath-body') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'bath-body');
  }
  if (normalized === 'wellness') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'wellness');
  }

  // Fallback match
  const matches = ALL_PRODUCTS.filter(p => 
    p.category_slug === normalized || (p.category || '').toLowerCase().includes(normalized)
  );
  return matches.length > 0 ? matches : ALL_PRODUCTS.slice(0, 8);
}
