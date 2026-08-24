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
];

// Helper to filter products by category slug
export function getProductsByCategory(categorySlug: string): (ProductCardProduct & { category_slug: string })[] {
  const normalized = categorySlug.toLowerCase();
  
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
