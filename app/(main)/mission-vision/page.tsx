'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  FaGlobe, 
  FaEye, 
  FaFlag, 
  FaLightbulb, 
  FaShieldAlt, 
  FaHandHoldingHeart, 
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
          alt="High-speed fiber data center background"
          fill
          className="object-cover"
          priority
        />
        {/* Deep Overlay containing brand theme matching original blend */}
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

const MissionVisionPage = () => {
  // Animation variants setup
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
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

  const corePillars = [
    {
      icon: FaLightbulb,
      title: 'Customer-Centric Innovation',
      desc: 'Constantly engineering customizable dynamic network routing and bandwidth adjustments to optimize operational performance and budget parameters flawlessly.'
    },
    {
      icon: FaShieldAlt,
      title: 'Uncompromised Integrity',
      desc: 'Building clear structural pricing frameworks with global transit providers to preserve reliable uptime SLAs alongside our deployment procedures.'
    },
    {
      icon: FaHandHoldingHeart,
      title: 'Authentic Engagement',
      desc: 'Fostering deep technical transparency and support connections by providing our user community direct access to senior certified engineers and on-site crews.'
    },
    {
      icon: FaNetworkWired,
      title: 'Sustainable Infrastructure',
      desc: 'Actively prioritizing green-certified energy systems, optimized server architectures, and lower-impact distribution setups across our core city routing hubs.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden">
      
      {/* Reusable Core Hero Component */}
      <HeroSection 
        title="Our Mission & Vision"
        description="The philosophical framework driving A1 Communication toward purposeful, progressive global network architecture deployments."
      />

      {/* Main Structural Content Layout */}
      <motion.div 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* Split Mission & Vision Focus Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission Segment */}
          <motion.div 
            variants={itemVariants}
            className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-lg">
                <FaFlag className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">The Purpose</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                To engineer seamless, transformative, and secure network environments that comfortably connect individuals with information corridors and global enterprise markets. By removing operational transmission complexity, we aim to deliver exceptional fiber connectivity frameworks, specialized enterprise care, and data packet management that leaves users free to achieve unlimited potential.
              </p>
            </div>
            <div className="mt-8 border-t border-slate-700/50 pt-4 text-xs text-slate-500 font-medium">
              Target Framework: Accessible Gigabit Broadband Connectivity
            </div>
          </motion.div>

          {/* Vision Segment */}
          <motion.div 
            variants={itemVariants}
            className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center shadow-lg border border-slate-700">
                <FaEye className="h-6 w-6 text-red-400" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">The blueprint</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                To become South Asia&apos;s premier choice for highly trusted, modern telecommunication services. We visualize a future where modern automated network mechanics and deeply responsive corporate hospitality seamlessly integrate. Our long-term trajectory focuses on cultivating a world-class infrastructure model that sparks active global computation while driving direct economic benefit to digital ecosystems.
              </p>
            </div>
            <div className="mt-8 border-t border-slate-700/50 pt-4 text-xs text-slate-500 font-medium">
              Target Framework: Progressive International Telecommunication Standards
            </div>
          </motion.div>

        </div>

        {/* Visual Callout - Infrastructure and Operational Philosophy Banner */}
        <motion.div 
          variants={itemVariants}
          className="relative rounded-2xl overflow-hidden h-[260px] sm:h-[320px] shadow-xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1035"
            alt="Global infrastructure network blueprint background"
            fill
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 max-w-3xl mx-auto space-y-4">
            <FaSignal className="h-8 w-8 text-red-500" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              &ldquo;Data transit is more than basic utility—it is an engine to expand human horizons.&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light tracking-wide max-w-lg">
              Every route finalized, backbone ring optimized, and subscriber provisioning assignment handled inside our Dhaka corporate operations center directly anchors back to this philosophical baseline.
            </p>
          </div>
        </motion.div>

        {/* Core Pillars Grid */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Guiding Strategic Pillars
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {corePillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-md border border-slate-700/50 flex gap-4 sm:gap-6 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-red-400 border border-slate-700">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default MissionVisionPage;