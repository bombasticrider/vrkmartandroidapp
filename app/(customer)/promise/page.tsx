import React from 'react';
import Link from 'next/link';
import { Phone, CheckCircle, Smartphone, Stethoscope, Briefcase, GraduationCap, Shield, Heart, Home } from 'lucide-react';

const promises = [
  { icon: Smartphone, title: 'Mobile Recharge Assistance', desc: 'Special member rates and dedicated assistance.' },
  { icon: Stethoscope, title: 'Free Medical Consultation', desc: 'Access to verified doctors.' },
  { icon: Briefcase, title: 'Job Assistance Network', desc: 'Connecting members to local job opportunities.' },
  { icon: GraduationCap, title: 'Education Support', desc: 'Guidance and material support for students.' },
  { icon: Shield, title: '₹20-30 Lakh Life Cover', desc: 'Financial security for your family.' },
  { icon: Heart, title: 'Marriage Support Fund', desc: 'Financial aid for member weddings.' },
  { icon: Home, title: 'Grihamu Housing Scheme', desc: 'Support for securing affordable housing.' },
];

export default function PromisePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#1E3A8A] flex items-center justify-center">
          <span className="text-[#F59E0B] mr-2">⭐</span> VRK Promise
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Your 7 Lifetime Benefits</p>
      </div>

      <div className="space-y-4 mb-10">
        {promises.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#F59E0B] flex items-start space-x-4">
              <div className="bg-blue-50 p-3 rounded-full text-[#1E3A8A]">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-lg">{p.title}</h3>
                  <span className="hidden sm:inline-block bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-bold px-2 py-1 rounded uppercase">Member Benefit</span>
                </div>
                <p className="text-gray-600 mt-1">{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#1E3A8A] rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-bold mb-6">Need Immediate Assistance?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a href="tel:9505934045" className="bg-white text-[#1E3A8A] px-6 py-3 rounded-full font-bold flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Phone className="w-5 h-5 mr-2" /> Call: 95059 34045
          </a>
          <a href="tel:8792387996" className="bg-white text-[#1E3A8A] px-6 py-3 rounded-full font-bold flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Phone className="w-5 h-5 mr-2" /> Call: 87923 87996
          </a>
        </div>
        <Link href="/membership/register" className="inline-block bg-[#F59E0B] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-600 transition-colors">
          Become a Member Today
        </Link>
      </div>
    </div>
  );
}
