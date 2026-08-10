'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { MdPhoneInTalk, MdEmail, MdCheckCircleOutline, MdErrorOutline } from 'react-icons/md';

interface PricingTier {
  _id: string;
  name: string;
  speed: string;
  price: number;
}

// Hero Section matching application layout design
function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative h-[40vh] min-h-65 w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/page-back.png"
          alt="Hero background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Dark Overlay with slate gradient matching original styles */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-500 mix-blend-multiply opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-source text-white mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function SubscribeFormContent() {
  const searchParams = useSearchParams();
  const selectedPlanId = searchParams.get('plan');

  const [packages, setPackages] = useState<PricingTier[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    selectedPackage: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch('/api/packages');
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setPackages(result.data);

          if (selectedPlanId) {
            const matched = result.data.find(
              (p: PricingTier) =>
                p._id === selectedPlanId || p.name.toLowerCase() === selectedPlanId.toLowerCase()
            );
            if (matched) {
              setFormData((prev) => ({ ...prev, selectedPackage: matched._id }));
            }
          }
        }
      } catch (err) {
        console.error('Failed to load packages:', err);
      }
    }
    fetchPackages();
  }, [selectedPlanId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! Our team will contact you within 24 hours.',
        });
        setFormData({ name: '', phone: '', email: '', address: '', selectedPackage: '' });
      } else {
        const errData = await res.json().catch(() => ({}));
        setStatus({
          type: 'error',
          message: errData.error || 'Failed to submit request. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-900 text-white transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <HeroSection
        title="Subscribe Now"
        description="Choose your preferred high-speed internet package and place a connection request instantly."
      />

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Form */}
          <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              Need <span className="text-red-500">New Connection?</span>
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiUser className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiPhone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Installation Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  required
                  placeholder="Enter your detailed address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                />
              </div>

              {/* Selected Package */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Selected Package
                </label>
                <select
                  name="selectedPackage"
                  value={formData.selectedPackage}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-slate-400">
                    Select a package
                  </option>
                  {packages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id} className="bg-slate-900 text-white">
                      {pkg.name} ({pkg.speed}) - ৳{pkg.price}/mo
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Alert */}
              {status && (
                <div
                  className={`p-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                    status.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <MdCheckCircleOutline className="w-5 h-5 shrink-0" />
                  ) : (
                    <MdErrorOutline className="w-5 h-5 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 px-6 rounded-xl font-bold text-white transition-all duration-200
                  bg-linear-to-r from-red-500 to-red-700 hover:shadow-lg hover:shadow-red-500/20
                  transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500
                  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Submitting Request...' : 'Submit Request'}
              </button>
            </form>
          </div>

          {/* Right Column: Support Card */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
              24/7 Support <span className="text-red-500">Service</span>
            </h2>

            <div className="relative w-full max-w-md h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800/80 flex flex-col items-center justify-center p-6 text-white">
              <Image
                src="/img/subscribe.avif"
                alt="Support Team"
                fill
                className="object-cover opacity-20"
              />
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
                  <MdPhoneInTalk className="w-10 h-10" />
                </div>

                <div className="text-center font-extrabold text-2xl sm:text-3xl text-white leading-tight space-y-1">
                  <p className="hover:text-red-400 transition-colors">+8809644219999</p>
                  <p className="hover:text-red-400 transition-colors">+8801824382951</p>
                </div>

                <div className="pt-2 flex flex-col items-center">
                  <MdEmail className="w-6 h-6 text-red-500 mb-2" />
                  <a
                    href="mailto:a1communicationbdisp@gmail.com"
                    className="font-semibold text-lg text-slate-300 hover:text-red-400 transition-colors underline underline-offset-4"
                  >
                    a1communicationbdisp@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
        </div>
      }
    >
      <SubscribeFormContent />
    </Suspense>
  );
}