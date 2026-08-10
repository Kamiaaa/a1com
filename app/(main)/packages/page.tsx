'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GiCheckMark, GiPayMoney } from 'react-icons/gi';
import {
  MdDataUsage,
  MdLockClock,
  MdOutlineSupportAgent,
  MdOutlineRocketLaunch,
  MdOutlineCheckCircle,
  MdOutlineNetworkCell,
} from 'react-icons/md';
import { FaTachometerAlt } from 'react-icons/fa';
import { FiWifi, FiServer, FiMonitor } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { BsClock } from 'react-icons/bs';
import { LuGamepad2, LuRouter, LuWifi } from 'react-icons/lu';

const iconMap: { [key: string]: React.ReactNode } = {
  FiWifi: <FiWifi className="h-7 w-7" />,
  LuGamepad2: <LuGamepad2 className="h-7 w-7" />,
  HiOutlineSparkles: <HiOutlineSparkles className="h-7 w-7" />,
  MdDataUsage: <MdDataUsage className="h-7 w-7" />,
  FaTachometerAlt: <FaTachometerAlt className="h-7 w-7" />,
  FiServer: <FiServer className="h-7 w-7" />,
  FiMonitor: <FiMonitor className="h-7 w-7" />,
  LuRouter: <LuRouter className="h-7 w-7" />,
  LuWifi: <LuWifi className="h-7 w-7" />,
};

interface PricingTier {
  _id: string;
  name: string;
  price: number;
  speed: string;
  speedMbps: number;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  icon: string;
  color: string;
  iconBg: string;
  displayOrder: number;
  isActive: boolean;
}

const PricingCard: React.FC<{ tier: PricingTier; onSelect: (tier: PricingTier) => void }> = ({ tier, onSelect }) => {
  const iconComponent = iconMap[tier.icon] || <FiWifi className="h-7 w-7" />;

  return (
    <div className={`
      relative flex flex-col w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden
      transition-all duration-300 hover:scale-105 hover:shadow-red-500/10
      ${tier.isPopular ? 'ring-2 ring-amber-500 md:scale-105' : 'ring-1 ring-slate-800'}
    `}>
      <div className={`absolute inset-0 bg-gradient-to-br ${tier.color || 'from-red-500 to-orange-500'} opacity-5`} />

      {tier.isPopular && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white px-4 py-1 rounded-bl-2xl text-sm font-semibold shadow-lg flex items-center gap-1">
            <HiOutlineSparkles className="w-4 h-4" />
            Most Popular
          </div>
        </div>
      )}

      {/* Card Body - Styled slate-800 to pop from slate-900 background */}
      <div className="relative bg-slate-800/90 backdrop-blur-sm p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${tier.iconBg || 'bg-red-500'} text-white shadow-lg`}>
            {iconComponent}
          </div>
          <div className="text-right">
            <p className="py-2 text-sm font-medium text-slate-400 uppercase tracking-wider">
              {tier.speed}
            </p>
            <h3 className="text-2xl font-bold text-white">
              {tier.name}
            </h3>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6 text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-black text-white">৳</span>
            <span className="text-5xl font-black text-white">{tier.price}</span>
            <span className="text-slate-400">/mo</span>
          </div>
        </div>

        {/* Speed Badge */}
        <div className="mb-4 flex justify-center">
          <div className={`px-4 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${tier.color || 'from-red-500 to-orange-500'}`}>
            {tier.speed}
          </div>
        </div>

        {/* Features */}
        <div className="grow mb-8">
          <p className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
            <MdOutlineCheckCircle className="w-4 h-4 text-red-500" />
            What's Included:
          </p>
          <ul className="space-y-3">
            {tier.features?.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className={`shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${tier.color || 'from-red-500 to-orange-500'} flex items-center justify-center`}>
                  <GiCheckMark className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={() => onSelect(tier)}
          className={`
            w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-200
            bg-gradient-to-r ${tier.color || 'from-red-500 to-orange-500'} hover:shadow-lg hover:shadow-red-500/20
            transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500
            flex items-center justify-center gap-2 cursor-pointer
          `}
        >
          <MdOutlineRocketLaunch className="w-4 h-4" />
          {tier.buttonText || 'Choose Plan'}
        </button>

        <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
          <MdLockClock className="w-3 h-3" />
          No hidden fees • Cancel anytime
        </p>
      </div>
    </div>
  );
};

const Packages = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [packages, setPackages] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/packages');
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        const sortedPackages = result.data.sort((a: PricingTier, b: PricingTier) => a.displayOrder - b.displayOrder);
        setPackages(sortedPackages);
      } else {
        setError(result.error || 'Failed to retrieve proper data formats.');
      }
    } catch (err) {
      setError('Failed to load packages');
      console.error('Error fetching packages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPackage = (tier: PricingTier) => {
    // Navigates to your connection request page with the chosen plan pre-selected
    router.push(`/subscribe?plan=${encodeURIComponent(tier._id)}`);
  };

  const valueAdds = [
    { title: '24/7 Local Support', description: 'Real humans, not robots. Our support team is always awake.', icon: MdOutlineSupportAgent },
    { title: '99.9% Uptime Guarantee', description: 'We take reliability seriously. SLA-backed commitment.', icon: BsClock },
    { title: 'No Hidden Fees', description: 'What you see is what you pay. Transparent billing.', icon: GiPayMoney },
    { title: 'Free Router', description: 'With annual payment. Cutting-edge wireless tech.', icon: LuRouter }
  ];

  const addOns = [
    { name: 'Static IP', price: '৳৫০০/mo', icon: MdOutlineNetworkCell, color: 'from-blue-600 to-blue-700 border-blue-500' },
    { name: 'Mesh WiFi Extender', price: '৳৮০০/mo', icon: LuWifi, color: 'from-cyan-600 to-cyan-700 border-cyan-500' },
    { name: 'Premium TV Bundle', price: '৳১৫০০/mo', icon: FiMonitor, color: 'from-purple-600 to-purple-700 border-purple-500' },
    { name: 'Cloud Backup', price: '৳৩০০/mo', icon: FiServer, color: 'from-emerald-600 to-emerald-700 border-emerald-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
          <p className="text-slate-300">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center px-4">
          <p className="text-red-500 mb-4 font-semibold">Error: {error}</p>
          <button 
            onClick={fetchPackages}
            className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-65 w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/page-back.png"
            alt="Hero background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-500 mix-blend-multiply opacity-70" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-source text-white mb-4">
            Our Pricing Packages
          </h1>
          <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
            Discover our best packages built on high-speed fiber network. Pick the plan that fits your lifestyle.
          </p>
        </div>
      </div>

      {/* Pricing Cards Grid Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-source font-semibold text-white mb-4">
              Discover Our Best Packages
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-6" />
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Pick the plan that fits your lifestyle. All plans include unlimited data and 24/7 support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((tier, index) => (
              <div 
                key={tier._id}
                className={`transform transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <PricingCard tier={tier} onSelect={handleSelectPackage} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      {packages.length > 0 && (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-t border-b border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                Compare Plans Side by Side
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-6" />
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Still not sure? Here's a detailed breakdown of what each plan offers.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                    {packages.map((tier) => (
                      <th key={tier._id} className="px-6 py-4 text-left text-sm font-semibold">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-300 font-medium">Download/Upload Speed</td>
                    {packages.map((tier) => (
                      <td key={tier._id} className="px-6 py-4 text-sm text-white">{tier.speed}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-300 font-medium">Data Cap</td>
                    {packages.map((tier) => (
                      <td key={tier._id} className="px-6 py-4 text-sm text-white">Unlimited</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-300 font-medium">Monthly Price</td>
                    {packages.map((tier) => (
                      <td key={tier._id} className="px-6 py-4 text-sm font-bold text-red-400">৳{tier.price}/mo</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Value Adds Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              Every Plan Includes
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-6" />
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              No matter which package you choose, you'll always get these benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueAdds.map((add, index) => (
              <div
                key={add.title}
                className={`bg-slate-800 rounded-2xl p-6 text-center shadow-lg border border-slate-800/80 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white mb-4 shadow-md">
                  <add.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {add.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {add.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              Boost Your Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-6" />
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Add these premium features to any package for an enhanced experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={addon.name}
                className={`bg-gradient-to-br ${addon.color} border rounded-2xl p-6 text-white shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <addon.icon className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">{addon.name}</h3>
                <p className="text-white/80 text-sm mb-4">Perfect for power users</p>
                <p className="text-2xl font-bold">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative w-full overflow-hidden bg-center bg-cover bg-no-repeat bg-scroll md:bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=884&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70 z-0" />

        <div className="relative z-10 py-20 px-4 sm:py-24 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl mx-auto mb-8">
              Ready to Experience the A1 Difference?
            </h2>
            <p className="text-lg sm:text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their internet needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/subscribe')}
                className="relative overflow-hidden bg-red-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="relative z-10">Check Availability</span>
                <span className="absolute inset-0 bg-red-700 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              </button>

              <button 
                onClick={() => router.push('/contact')}
                className="relative overflow-hidden bg-transparent border-2 border-red-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="relative z-10">Talk to an Expert</span>
                <span className="absolute inset-0 bg-red-600 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              </button>
            </div>
            <p className="text-sm text-slate-300 mt-8">
              No contracts. 30-day money-back guarantee. Free cancellation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;