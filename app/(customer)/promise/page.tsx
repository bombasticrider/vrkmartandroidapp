'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  IndianRupee,
  Building2,
  KeyRound,
  FileCheck,
  Percent,
  ArrowRight,
  Star,
} from 'lucide-react';

export default function PromisePage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 pb-28 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#1e40af] to-[#0f172a] rounded-3xl p-6 sm:p-10 text-white shadow-xl text-center">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-[#F59E0B]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-44 h-44 bg-[#10B981]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F59E0B] mb-4">
          <Star className="w-4 h-4 fill-[#F59E0B]" />
          OFFICIAL LIFETIME BENEFITS
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          VRK MART LOYALTY PROGRAM &amp; HOUSING SCHEME
        </h1>
        <p className="text-blue-100 text-sm sm:text-lg mt-3 font-medium max-w-2xl mx-auto">
          Your Trusted Partner for a Secure Future
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold text-white/90">
          <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> 100% Genuine Groceries
          </span>
          <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Today&apos;s Market Price
          </span>
          <span className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Lifetime Family Protection
          </span>
        </div>
      </div>

      {/* SECTION 1: LOYALTY MILESTONE REWARDS */}
      <section className="space-y-4">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              🛒
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E3A8A] flex items-center gap-2">
                LOYALTY MILESTONE REWARDS
              </h2>
              <p className="text-sm sm:text-base text-gray-800 mt-1 font-medium leading-relaxed">
                Shop for <span className="font-bold text-gray-900 bg-amber-200/70 px-1.5 py-0.5 rounded">Rs 12,000 every month</span> regular Grocery, Provisions, and Household Articles continuously to unlock these exclusive benefits:
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 6 Months */}
          <div className="bg-white rounded-3xl p-5 border-2 border-blue-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 z-10 bg-blue-600 text-white text-xs font-black px-3.5 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-sm">
              6 Months
            </div>

            <div>
              {/* Hero Image */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-gray-50 border border-gray-100 shadow-inner">
                <Image
                  src="/images/milestones/01_mobile_recharge.webp"
                  alt="1-Year Mobile Recharge"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Heading */}
              <h3 className="text-lg font-extrabold text-gray-900">
                6 Months Continuously
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                Get a <strong className="text-gray-900">1-year mobile recharge</strong> for one family member (Valid on any network).
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-emerald-600 gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 1-Year Free Recharge
            </div>
          </div>

          {/* 12 Months */}
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 z-10 bg-[#F59E0B] text-white text-xs font-black px-3.5 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-sm">
              12 Months
            </div>

            <div>
              {/* Hero Image */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-gray-50 border border-gray-100 shadow-inner">
                <Image
                  src="/images/milestones/02_couple_tour.webp"
                  alt="3D/2N Couple Tour Vacation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Heading */}
              <h3 className="text-lg font-extrabold text-gray-900">
                12 Months Continuously
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                Get a <strong className="text-gray-900">3-Day / 2-Night Couple Tour Package</strong>.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-emerald-600 gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 3D/2N Vacation Package
            </div>
          </div>

          {/* 24 Months */}
          <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 z-10 bg-[#10B981] text-white text-xs font-black px-3.5 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-sm">
              24 Months
            </div>

            <div>
              {/* Hero Image */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-gray-50 border border-gray-100 shadow-inner">
                <Image
                  src="/images/milestones/03_job_opportunity.webp"
                  alt="Guaranteed Job Opportunity"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Heading */}
              <h3 className="text-lg font-extrabold text-gray-900">
                24 Months Continuously
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                Get a <strong className="text-gray-900">guaranteed Job Opportunity</strong> for one family member.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center text-xs font-bold text-emerald-600 gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Guaranteed Employment
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 36-MONTH LONG-TERM SECURITY BENEFITS */}
      <section className="space-y-4">
        <div className="bg-blue-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold shrink-0 shadow-inner">
              🛡️
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                36-MONTH LONG-TERM SECURITY BENEFITS
              </h2>
              <p className="text-sm sm:text-base text-blue-100 mt-1 font-medium leading-relaxed">
                Complete 36 months of regular continuous purchases to secure your family&apos;s future:
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Benefit 1: Free Education */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:border-[#1E3A8A] transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-3 bg-gray-50 border border-gray-100">
                <Image
                  src="/images/milestones/04_free_education.webp"
                  alt="Free Education"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-extrabold text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded">Higher Education</span>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mt-2">FREE EDUCATION</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                Free education for one child, up to his/her higher education choice.
              </p>
            </div>
          </div>

          {/* Benefit 2: Marriage Assistance */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:border-[#1E3A8A] transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-3 bg-gray-50 border border-gray-100">
                <Image
                  src="/images/milestones/05_marriage_assistance.webp"
                  alt="Marriage Assistance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-extrabold text-rose-700 uppercase bg-rose-50 px-2 py-0.5 rounded">Wedding Aid</span>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mt-2">MARRIAGE ASSISTANCE</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                Full marriage expenses for one girl child will be completely borne by us.
              </p>
            </div>
          </div>

          {/* Benefit 3: Basic Healthcare */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:border-[#1E3A8A] transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-3 bg-gray-50 border border-gray-100">
                <Image
                  src="/images/milestones/06_basic_healthcare.webp"
                  alt="Basic Healthcare"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-extrabold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">Family Health</span>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mt-2">BASIC HEALTHCARE</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                Free medical care coverage for up to 4 family members.
              </p>
            </div>
          </div>

          {/* Benefit 4: Major Medical Cover */}
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-300 bg-gradient-to-br from-amber-50/30 to-white shadow-sm hover:shadow-md transition-all sm:col-span-2 lg:col-span-2 group overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-44 h-40 rounded-2xl overflow-hidden shrink-0 border border-amber-200 shadow-sm bg-gray-50">
                <Image
                  src="/images/milestones/07_major_medical_cover.webp"
                  alt="Major Medical Cover"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <span className="text-xs font-extrabold text-amber-800 uppercase bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                  High Value Cover
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mt-2">
                  MAJOR MEDICAL COVER (₹20,00,000 – ₹30,00,000)
                </h3>
                <p className="text-sm text-gray-700 mt-1.5 leading-relaxed font-medium">
                  Free major medical expenses borne by us (<strong>From Rs. 20,00,000/- to Rs. 30,00,000/-</strong> for one member only).
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 5: Job Loss Protection */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:border-[#1E3A8A] transition-all sm:col-span-2 lg:col-span-1 group overflow-hidden">
            <div>
              <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-3 bg-gray-50 border border-gray-100">
                <Image
                  src="/images/milestones/08_job_loss_protection.webp"
                  alt="Job Loss Protection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs font-extrabold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded">Monthly Support</span>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mt-2">JOB LOSS PROTECTION</h3>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed font-medium">
                If you lose your job after 36 months, we will provide a <strong>Rs. 12,000/- monthly provision allowance</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTEREST-FREE 2BHK HOUSING SCHEME */}
      <section className="space-y-4">
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center font-black shadow">
              🏢
            </div>
            <div>
              <span className="text-emerald-200 text-xs font-bold uppercase tracking-wider">Dream Home Initiative</span>
              <h2 className="text-xl sm:text-2xl font-black">INTEREST-FREE 2BHK HOUSING SCHEME</h2>
            </div>
          </div>

          <p className="text-emerald-100 text-sm sm:text-base mt-2 font-medium">
            Own your dream home with our easy monthly installment plan:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1 mb-1">
                <IndianRupee className="w-3.5 h-3.5" /> Monthly Payment
              </div>
              <div className="text-lg sm:text-xl font-black text-white">Rs. 15,000/-</div>
              <div className="text-xs text-emerald-200 mt-1">Pay only per month</div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1 mb-1">
                <Building2 className="w-3.5 h-3.5" /> Property Value
              </div>
              <div className="text-lg sm:text-xl font-black text-white">Rs. 36 Lakhs</div>
              <div className="text-xs text-emerald-200 mt-1">2BHK Flat Value</div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1 mb-1">
                <Percent className="w-3.5 h-3.5" /> Interest Rate
              </div>
              <div className="text-lg sm:text-xl font-black text-[#F59E0B]">0% Interest</div>
              <div className="text-xs text-emerald-200 mt-1">Absolutely No Interest</div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1 mb-1">
                <FileCheck className="w-3.5 h-3.5" /> Registration
              </div>
              <div className="text-lg sm:text-xl font-black text-white">6 Months</div>
              <div className="text-xs text-emerald-200 mt-1">Plot Registration Done</div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 col-span-2 sm:col-span-1">
              <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1 mb-1">
                <KeyRound className="w-3.5 h-3.5" /> Handover
              </div>
              <div className="text-lg sm:text-xl font-black text-white">30 Months</div>
              <div className="text-xs text-emerald-200 mt-1">House Handed Over</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & DIRECT DIALERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md text-center space-y-5">
        <div>
          <span className="text-xs font-extrabold text-[#1E3A8A] bg-blue-50 px-3 py-1 rounded-full uppercase">
            Dedicated Member Support
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
            Have Questions About Benefits or Housing?
          </h2>
          <p className="text-sm text-gray-600 mt-1.5">
            Speak directly with our Bengaluru community organizers &amp; member managers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:9505934045"
            className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-blue-900 active:scale-95 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" /> Call: 95059 34045
          </a>
          <a
            href="tel:8792387996"
            className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-blue-900 active:scale-95 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" /> Call: 87923 87996
          </a>
          <a
            href="https://wa.me/919505934045"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Link
            href="/membership/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F59E0B] to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white px-8 py-4 rounded-2xl font-extrabold text-base shadow-lg transition-all"
          >
            <span>Become a Lifetime Member @ ₹1,000</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
