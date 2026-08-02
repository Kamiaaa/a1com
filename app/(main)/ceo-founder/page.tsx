'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  FaQuoteLeft, 
  FaEnvelope, 
  FaLinkedin, 
  FaAward, 
  FaNetworkWired, 
  FaSignal, 
  FaServer 
} from 'react-icons/fa';

// Standardized Global Hero Section Component
function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative h-[40vh] min-h-[260px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/page-back.png"
          alt="High-speed telecommunications infrastructure background"
          fill
          className="object-cover"
          priority
        />
        {/* Deep Overlay containing red/red brand theme matching original blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-500/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-source text-white mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-base md:text-lg text-red-50/90 max-w-2xl mx-auto font-light">
          {description}
        </p>
      </div>
    </div>
  );
}

const CEOFounder = () => {
  // Animation variants setup
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const coreValues = [
    {
      icon: FaNetworkWired,
      title: 'Our Commitment',
      desc: 'Transparent SLAs, reliable data transit pipelines, and strict alignment with global telecommunication standards.'
    },
    {
      icon: FaServer,
      title: 'Future Vision',
      desc: 'Transforming traditional communication backbones into highly responsive, software-defined fiber networks.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden">
      
      {/* Standardized Layout Hero Component */}
      <HeroSection 
        title="Message From CEO & Founder"
        description="A leadership overview highlighting our foundational commitments, network performance parameters, and digital equity vision."
      />

      {/* Main Structural Content Layout */}
      <motion.div 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* Main Section - Executive Focus Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Image & Meta Data (sticky side section on desktop) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-800 p-3 border border-slate-700/50">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900">
                <Image
                  src="/img/ceo.jpg"
                  alt="CEO Profile Picture"
                  fill
                  className="object-cover object-top"
                  sizes="(max-w-1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Title & Organization Meta info */}
            <div className="px-2 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Arif Hassan Sujan</h3>
                <p className="text-sm font-semibold text-red-400">CEO & Founder</p>
                <p className="text-xs text-slate-500">A1 Communication</p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: The Core Message Body */}
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
            
            {/* Elegant Quotation Intro */}
            <div className="relative bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700/50">
              <FaQuoteLeft className="absolute right-6 top-6 h-12 w-12 text-slate-700/40 pointer-events-none" />
              <p className="text-lg sm:text-xl font-medium text-white italic leading-relaxed">
                &ldquo;Our metric for performance isn&apos;t purely built on measuring bandwidth volume. Instead, we measure execution through the structural integrity, trust, and absolute technical reliability our clients inherit across our data networks.&rdquo;
              </p>
            </div>

            {/* Formal Text Framework */}
            <div className="space-y-6 text-base text-slate-300 leading-relaxed font-light">
              <h2 className="text-xl font-bold text-white">Dear Valued Corporate Partners and Subscribers,</h2>
              
              <p>
                Welcome to <span className="font-semibold text-white">A1 Communication</span>. Since our foundation, our core operational objective has centered entirely around designing an infrastructure that simplifies enterprise data complexities with absolute structural transparency and network precision.
              </p>
              <p>
                The contemporary global telecommunications landscape demands far more than basic point-to-point data link configurations. Today&apos;s corporate enterprise and end-user portfolios require proactive backbone ring optimization, low-latency transit architectures, and deeply robust routing recovery mechanics. We have systematically aligned our corporate hub here in Dhaka to fulfill these critical performance specifications.
              </p>
              <p>
                Whether scaling dynamic fiber-to-the-home (FTTH) neighborhoods, provisioning dedicated enterprise intranets, or managing bandwidth allocation engines across international data centers, our engineering groups operate with an unwavering dedication to operational excellence. We consistently prioritize building long-term, high-availability relationships over transactional volume.
              </p>
              <p>
                As we continue to deploy smart automated provisioning frameworks and build broader inter-city connectivity links, our baseline mission remains completely unchanged: to supply uncompromised network uptime, data protection, and an empowering connectivity experience every single time you choose us.
              </p>

              <p className="pt-4 font-normal text-slate-200">
                Thank you for anchoring your trust with A1 Communication. We look forward to engineering your next-generation connectivity pathways.
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="text-sm text-slate-500">Warm Regards,</p>
                <div className="text-slate-200 my-2 h-12 flex items-center">
                  {/* Decorative placeholder signature element */}
                  <span className="font-serif text-3xl opacity-40 italic select-none">Arif Hassan Sujan</span>
                </div>
                <h4 className="text-base font-bold text-white">Arif Hassan Sujan</h4>
                <p className="text-xs text-slate-500">CEO & Founder, A1 Communication</p>
              </div>

              {/* Trust Badge Indicator */}
              <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700 max-w-sm">
                <div className="p-2.5 rounded-lg bg-red-600 text-white flex-shrink-0 self-start">
                  <FaAward className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Verified Infrastructure Standards</h5>
                  <p className="text-xs text-slate-400 mt-0.5">Fully compliant with high-capacity digital transit rules and premium service agreements managed out of Dhaka.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Supporting Strategic Focus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-700/50">
          {coreValues.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700/50 flex gap-4"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-slate-900 text-red-400 border border-slate-700">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  );
};

export default CEOFounder;