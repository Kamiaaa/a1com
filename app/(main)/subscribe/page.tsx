'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { MdPhoneInTalk, MdEmail } from 'react-icons/md';

interface PricingTier {
  _id: string;
  name: string;
  speed: string;
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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch('/api/packages');
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setPackages(result.data);
          
          // Auto-select package from URL parameter if available
          if (selectedPlanId) {
            const matched = result.data.find(
              (p: PricingTier) => p._id === selectedPlanId || p.name === selectedPlanId
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
    setStatusMessage(null);

    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatusMessage('Thank you! Our team will contact you within 24 hours.');
        setFormData({ name: '', phone: '', email: '', address: '', selectedPackage: '' });
      } else {
        setStatusMessage('Failed to submit request. Please try again.');
      }
    } catch (err) {
      setStatusMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Form */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
            Need <span className="text-blue-600">New Connection?</span>
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Fill up the form and our team will get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
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
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
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
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Email
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
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Address
              </label>
              <textarea
                name="address"
                rows={4}
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Selected Package
              </label>
              <select
                name="selectedPackage"
                value={formData.selectedPackage}
                onChange={handleChange}
                required
                className="w-full p-2 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a package</option>
                {packages.map((pkg) => (
                  <option key={pkg._id} value={pkg._id}>
                    {pkg.name} ({pkg.speed})
                  </option>
                ))}
              </select>
            </div>

            {statusMessage && (
              <p className="text-sm font-medium text-blue-600 mt-2">{statusMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full font-semibold text-sm transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>

        {/* Right Column: Support Card */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 text-center">
            24/7 Support <span className="text-blue-600">Service</span>
          </h2>

          <div className="relative w-full max-w-md h-96 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-slate-900">
            <Image
              src="/img/support-bg.jpg" // Add your support image path here
              alt="Support Team"
              fill
              className="object-cover opacity-25"
            />
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <MdPhoneInTalk className="w-10 h-10 text-blue-600" />
              <div className="text-center font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
                <p>16335</p>
                <p>09678-123123</p>
              </div>

              <div className="pt-4 flex flex-col items-center">
                <MdEmail className="w-8 h-8 text-blue-600 mb-1" />
                <a
                  href="mailto:info@link3.net"
                  className="font-bold text-xl text-slate-900 hover:underline"
                >
                  info@link3.net
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SubscribeFormContent />
    </Suspense>
  );
}