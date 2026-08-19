'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import {
  FaGlobe,
  FaUsers,
  FaMapMarkedAlt,
  FaHeart,
  FaQuoteLeft,
  FaBolt,
  FaCalendarAlt,
  FaShieldAlt,
  FaHandsHelping,
  FaRegLightbulb,
  FaWifi,
  FaServer,
  FaNetworkWired,
  FaHeadset
} from 'react-icons/fa';

// Standardized Global Hero Section Component
function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative h-[40vh] min-h-65 w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/page-back.png"
          alt="Network infrastructure background"
          fill
          className="object-cover"
          priority
        />
        {/* Deep Overlay containing brand theme matching original blend */}
        <div className="absolute inset-0 bg-linear-to-r from-red-600/90 to-red-500/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Animated Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium mb-4 border border-white/10">
          <FaBolt className="w-3.5 h-3.5" />
          Your Connection, Our Passion
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-source text-white mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-base md:text-lg text-red-50/90 max-w-2xl mx-auto font-light">
          {description}
        </p>

        {/* Dynamic Context indicators */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-red-100/90 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <FaWifi className="w-3.5 h-3.5" />
            <span>Fiber Optics</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-red-100/90 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <FaUsers className="w-3.5 h-3.5 text-red-200" />
            <span>5K+ Active Users</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-red-100/90 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <FaMapMarkedAlt className="w-3.5 h-3.5 text-red-200" />
            <span>7+ Years Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const AboutPage = () => {
  // Animation variants with standard typing
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const values = [
    {
      icon: FaNetworkWired,
      title: 'Blazing Fast Speed',
      description: 'Ultra-low latency, pure fiber-optic pathways delivering symmetrical gigabit speeds.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Reliable',
      description: '99.99% network uptime backed by enterprise-grade DDoS protection and firewalls.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FaRegLightbulb,
      title: 'Innovative Architecture',
      description: 'Next-generation FTTH/FTTB setups adapted to dynamic enterprise and home demands.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FaHeart,
      title: 'Customer-Centric Care',
      description: 'A deeply dedicated local support workforce offering transparent pricing without contracts.',
      color: 'from-red-500 to-red-600'
    }
  ];

  const stats = [
    { value: '1K+', label: 'Connected Homes', icon: FaUsers },
    { value: '99.9%', label: 'Network Uptime', icon: FaGlobe },
    { value: '7+', label: 'Years of Service', icon: FaCalendarAlt },
    { value: '24/7', label: 'Technical Support', icon: FaHandsHelping },
  ];

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden text-slate-100">
      
      {/* Reusable Standardized Layout Hero Component */}
      <HeroSection 
        title="About A1 Communication"
        description="Empowering homes and enterprises across Dhaka with highly resilient, secure, and hyper-fast personalized broadband and dedicated internet solutions."
      />

      {/* Main Framework Layout Container */}
      <motion.div 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInLeft} className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Our Story
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-6" />
            <div className="space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                Founded in 19 October, 2019, <span className="font-semibold text-red-400">A1 Communication</span> was established with a singular vision: to make world-class, high-speed digital connectivity accessible, reliable, and seamless. Driven by a passion for technical excellence, we are committed to connecting households and corporations with cutting-edge internet framework solutions.
              </p>
              <p>
                From dense corporate parks and dynamic workspaces to cozy remote-work apartments, we build modern network pathways that go far beyond standard broadband. Every node in our network infrastructure is thoughtfully engineered to deliver symmetrical speeds, unmatched packet stability, and limitless bandwidth.
              </p>
              <p>
                Over the years, A1 Communication has earned the unyielding trust of users by providing resilient, customer-focused services. Whether it is home broadband, high-availability leased lines, secure VPN tunneling, static IP management, or managed IT infrastructure, our experienced engineering crew ensures that your connection stays flawless.
              </p>
              <p>
                At A1 Communication, we believe that internet connectivity is more than utility infrastructure—it is an engine for growth, discovery, and global interaction. Our success is not measured solely by our gigabit capacity, but by the performance, happiness, and data-driven achievements of the individuals and enterprises we serve.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeInRight}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-800 h-[350px] sm:h-[450px]"
          >
            <Image
              src="/img/about.png"
              alt="A1 Communication network engineers maintaining infrastructure"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-w-1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center text-center p-2"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white mb-4 shadow-md">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;