// app/components/ISPFAQ.tsx
'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'billing' | 'support';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What internet plans do you offer?',
    answer: 'We offer a range of internet plans to suit different needs: Basic (50 Mbps), Standard (100 Mbps), Premium (250 Mbps), and Ultra (1 Gbps). All plans come with unlimited data, no hidden fees, and a free Wi-Fi router installation.',
    category: 'general'
  },
  {
    id: '2',
    question: 'How do I check if your service is available at my address?',
    answer: 'By calling our Customer service at +8809644219999 and 01824382951-52',
    category: 'general'
  },
  {
    id: '3',
    question: 'What should I do if my internet is not working?',
    answer: 'Try these troubleshooting steps: 1) Restart your modem and router, 2) Check all cable connections, 3) Visit our network status page for outages. If issues persist, contact our 24/7 technical support for immediate assistance.',
    category: 'technical'
  },
  {
    id: '4',
    question: 'How can I pay my bill online?',
    answer: 'You can pay your internet bill through our official B-kash merchant account number 01682270100. You can pay internet bill through BRAC Bank account A1 Communication ISP 2057035600001.',
    category: 'billing'
  },
  {
    id: '5',
    question: 'What is your refund policy?',
    answer: "No refund policy is available. If you're unsatisfied with our service, you can communicate with us regarding our hotline number. Equipment must be returned if you're to be off-line.",
    category: 'billing'
  },
  {
    id: '6',
    question: 'Do you provide Wi-Fi routers?',
    answer: 'No, we do not provide a router but we provide advice about router quality so that you can purchase easily and confidently. The router includes enhanced security features, guest network capability and parental controls. Professional installation is totally free. Thank you.',
    category: 'technical'
  },
  {
    id: '7',
    question: 'What are your customer support hours?',
    answer: 'Our technical support is available 24/7/365 via phone and Ip phone number. Billing inquiries can be handled Saturday- Friday 10 AM-7 PM.',
    category: 'support'
  },
  {
    id: '8',
    question: 'How do I set up parental controls?',
    answer: 'Parental controls can be configured through our mobile app or web portal. You can set time limits, block specific websites, and schedule internet access times for different devices on your network.',
    category: 'technical'
  }
];

const categoryColors = {
  general: 'bg-blue-950/40 text-blue-400 border border-blue-900/50',
  technical: 'bg-purple-950/40 text-purple-400 border border-purple-900/50',
  billing: 'bg-green-950/40 text-green-400 border border-green-900/50',
  support: 'bg-orange-950/40 text-orange-400 border border-orange-900/50'
};

export default function IspFaq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(faqData.map(faq => faq.category))];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-slate-900 text-slate-100">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl tracking-tight font-source text-white sm:text-4xl md:text-5xl lg:text-6xl mb-4 font-bold">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
          Find answers to common questions about our internet services
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Image Section */}
        <div className="order-2 lg:order-1">
          <div className="sticky top-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl overflow-hidden shadow-xl">
              {/* Main Image - ISP/Network Illustration */}
              <div className="relative bg-slate-800 p-8">
                <svg className="w-full h-auto" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="400" rx="20" fill="url(#gradient)" fillOpacity="0.1"/>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3B82F6"/>
                      <stop offset="100%" stopColor="#8B5CF6"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Globe/Network Icon */}
                  <circle cx="200" cy="200" r="120" stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="8 8"/>
                  <circle cx="200" cy="200" r="90" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
                  <circle cx="200" cy="200" r="60" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="6 6"/>
                  
                  {/* Connection lines */}
                  <line x1="200" y1="80" x2="200" y2="320" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"/>
                  <line x1="80" y1="200" x2="320" y2="200" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"/>
                  <line x1="115" y1="115" x2="285" y2="285" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"/>
                  <line x1="285" y1="115" x2="115" y2="285" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"/>
                  
                  {/* Nodes */}
                  <circle cx="200" cy="80" r="8" fill="#3B82F6"/>
                  <circle cx="200" cy="320" r="8" fill="#3B82F6"/>
                  <circle cx="80" cy="200" r="8" fill="#3B82F6"/>
                  <circle cx="320" cy="200" r="8" fill="#3B82F6"/>
                  <circle cx="200" cy="200" r="12" fill="#8B5CF6"/>
                  <circle cx="140" cy="140" r="6" fill="#10B981"/>
                  <circle cx="260" cy="140" r="6" fill="#F59E0B"/>
                  <circle cx="140" cy="260" r="6" fill="#EF4444"/>
                  <circle cx="260" cy="260" r="6" fill="#06B6D4"/>
                  
                  {/* Devices */}
                  <rect x="155" y="290" width="90" height="50" rx="5" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
                  <rect x="165" y="298" width="20" height="15" rx="2" fill="#3B82F6"/>
                  <rect x="195" y="298" width="20" height="15" rx="2" fill="#3B82F6"/>
                  <rect x="225" y="298" width="20" height="15" rx="2" fill="#3B82F6"/>
                  
                  {/* Signal waves */}
                  <path d="M 70 70 Q 100 100 70 130" stroke="#10B981" strokeWidth="2" fill="none"/>
                  <path d="M 55 55 Q 100 100 55 145" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6"/>
                  <path d="M 40 40 Q 100 100 40 160" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.3"/>
                </svg>
              </div>
              
              {/* Stats/Info Cards */}
              <div className="p-6 bg-slate-950/40 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-xs text-red-100 font-light">Uptime Guarantee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-red-100 font-light">Support Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1 Gbps</div>
                    <div className="text-xs text-red-100 font-light">Ultra Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">30 Days</div>
                    <div className="text-xs text-red-100 font-light">Money Back</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex justify-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-400">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-xs font-medium">Trusted by 50k+ Customers</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
                <span className="text-xs font-medium">Fiber Optic Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - FAQ Section */}
        <div className="order-1 lg:order-2">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-white bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none placeholder-slate-500 text-sm"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap
                  ${selectedCategory === category
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-950/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
                  }
                `}
              >
                {category === 'all' ? 'All Questions' : category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800">
                <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p className="text-slate-400 text-sm">No questions found matching your criteria.</p>
                <p className="text-xs text-slate-500 mt-1">Try different search terms or categories.</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-slate-800 rounded-xl border border-slate-700/60 overflow-hidden transition-all duration-200 hover:border-slate-600/80"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-4 py-4 text-left flex justify-between items-center hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${categoryColors[faq.category]}`}>
                        {faq.category === 'general' && (
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        )}
                        {faq.category === 'technical' && (
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                          </svg>
                        )}
                        {faq.category === 'billing' && (
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                          </svg>
                        )}
                        {faq.category === 'support' && (
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        )}
                        <span className="hidden sm:inline">{faq.category}</span>
                      </span>
                      <span className="text-sm font-semibold text-slate-100 truncate pr-2">
                        {faq.question}
                      </span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
                        openId === faq.id ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-4 pb-4 pt-2 text-sm text-slate-300 border-t border-slate-700/60 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Contact Support Section */}
          <div className="mt-6 p-5 bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl text-center border border-slate-700/60">
            <h3 className="text-base font-bold text-white mb-1">
              Still have questions?
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-light">
              Our support team is ready to help you 24/7
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="px-4 py-2 bg-green-600 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-green-700 transition-colors">
                Live Chat
              </button>
              <button className="px-4 py-2 bg-slate-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-slate-600 border border-slate-600 transition-colors">
                Call Support
              </button>
              <button className="px-4 py-2 border border-slate-600 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-slate-700/50 transition-colors">
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}