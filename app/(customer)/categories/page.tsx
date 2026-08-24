import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Grocery Staples', slug: 'grocery', icon: '/images/categories/category-grocery.svg', desc: 'Atta, Rice, Dal, Oil & Spices' },
  { name: 'Dairy & Eggs', slug: 'dairy', icon: '/images/categories/category-dairy.svg', desc: 'Fresh Milk, Curd, Butter & Eggs' },
  { name: 'Packaged Food', slug: 'packaged-food', icon: '/images/categories/category-packaged-food.svg', desc: 'Noodles, Biscuits, Sauces & Spreads' },
  { name: 'Fruits & Vegetables', slug: 'fruits-veg', icon: '/images/categories/category-fruits-veg.svg', desc: 'Fresh daily farm-picked produce' },
  { name: 'Home Care', slug: 'home-care', icon: '/images/categories/category-home-care.svg', desc: 'Detergents, Cleaners & Utensil Care' },
  { name: 'Personal Care', slug: 'personal-care', icon: '/images/categories/category-personal-care.svg', desc: 'Soaps, Skin Care & Deodorants' },
  { name: 'Oral Care', slug: 'oral-care', icon: '/images/categories/category-oral-care.svg', desc: 'Toothpastes, Brushes & Mouthwash' },
  { name: 'Bath & Body', slug: 'bath-body', icon: '/images/categories/category-bath-body.svg', desc: 'Body Wash, Handwash & Lotions' },
  { name: 'Hair Care', slug: 'hair-care', icon: '/images/categories/category-hair-care.svg', desc: 'Shampoos, Conditioners & Hair Oils' },
  { name: 'Wellness', slug: 'wellness', icon: '/images/categories/category-wellness.svg', desc: 'Ayurveda, Health Supplements & Green Tea' },
];

export default function CategoriesPage() {
  return (
    <div className="py-6 px-4 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-[#1E3A8A]">Explore Categories</h1>
        <p className="text-gray-500 text-sm mt-1">Shop grocery staples and essentials at DMart-level low prices</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1E3A8A]/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50/60 flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1E3A8A] group-hover:text-white transition-all shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
