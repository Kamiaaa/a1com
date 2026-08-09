'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Reusable icons matching layout structure
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  HelpCircle,
  Server,
  Network,
  Cpu,
  Tv,
  Globe,
  Radio,
  Send
} from 'lucide-react';

// Custom clean SVG components for socials
const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState('');

  const companyLinks = [
    { name: 'Home', href: '/' },
    { name: 'Internet Packages', href: '/packages' },
    { name: 'Mission & Vision', href: '/mission-vision' },
    { name: 'About A1 Communication', href: '/about-us' },
    { name: 'Self Care', href: '/login' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const features = [
    { name: 'Blazing Fiber Internet', icon: <Globe className="w-4 h-4" /> },
    { name: 'Corporate Data Pools', icon: <Server className="w-4 h-4" /> },
    { name: 'Secure Intranet Layer', icon: <Network className="w-4 h-4" /> },
    { name: 'Smart IPTV Solutions', icon: <Tv className="w-4 h-4" /> },
    { name: 'SLA Guard Over Uptime', icon: <Cpu className="w-4 h-4" /> },
    { name: '24/7 Tech Assistance', icon: <Radio className="w-4 h-4" /> },
  ];

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: "+8809644219999, 01824382951 (what's app), 01824382952", link: 'tel:09542366393' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'a1communicationbdisp@gmail.com', link: 'mailto:a1communicationbdisp@gmail.com' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: "Uttara, Dhaka -1230, Bangladesh.", link: null },
    { icon: <Clock className="w-5 h-5" />, label: 'Business Hours', value: 'Sat - Fri: 10:00 AM - 6:00 PM', link: null },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon />, href: '#', color: 'hover:bg-red-600' },
    { name: 'Twitter', icon: <TwitterIcon />, href: '#', color: 'hover:bg-slate-700' },
    { name: 'Instagram', icon: <InstagramIcon />, href: '#', color: 'hover:bg-pink-600' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, href: '#', color: 'hover:bg-red-700' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' },
    { name: 'Acceptable Use', href: '/acceptable-use' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Subscription successful! Welcome to A1 Communications updates.');
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-t border-slate-800 font-bail overflow-hidden mt-auto">
      {/* Structural Pattern Overlays */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Corporate Profile Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="relative w-44 h-16 transition-transform duration-300 group-hover:scale-102">
                <Image
                  src="/img/logo.png"
                  alt="A1 Communications Logo"
                  fill
                  loading="eager"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              A1 Communications is a leading ISP provider delivering blazing-fast fiber optic internet, reliable connectivity, and cutting-edge communication infrastructure for modern homes and corporate spaces.
            </p>

            {/* Newsletter Subscription integration */}
            {/* <form onSubmit={handleSubscribe} className="pt-2 space-y-3">
              <h4 className="text-sm font-semibold text-slate-200 flex items-center tracking-wide">
                Get Special Offers
                <span className="ml-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              </h4>
              <div className="flex bg-slate-900/90 rounded-lg p-1 border border-slate-800 focus-within:border-red-500/50 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="px-3 py-2 w-full bg-transparent rounded-l-md focus:outline-none text-slate-200 text-xs placeholder-slate-500 border-none"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 p-2 rounded-md transition-all duration-300 flex items-center justify-center shrink-0"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </form> */}
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block tracking-wider uppercase text-slate-100">
              Quick Links
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-red-500 rounded-full"></span>
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`
                      flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-all duration-200 group text-sm
                      ${pathname === link.href ? 'text-red-500 font-medium' : ''}
                    `}
                  >
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-red-500/70" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure Features Column */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block tracking-wider uppercase text-slate-100">
              Why Choose A1?
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-red-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-2.5 text-slate-400 text-sm select-none group">
                  <span className="text-slate-500 group-hover:text-red-500 transition-colors shrink-0">
                    {feature.icon}
                  </span>
                  <span className="group-hover:text-slate-300 transition-colors">{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support Info Column */}
          <div>
            <h3 className="text-base font-semibold mb-5 relative inline-block tracking-wider uppercase text-slate-100">
              Contact Info
              <span className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-red-500 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="text-red-500 mt-0.5 shrink-0 transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-500 block uppercase tracking-wider font-semibold">{item.label}</span>
                    {item.link ? (
                      <a 
                        href={item.link}
                        className="text-slate-300 hover:text-red-500 transition-colors text-sm block font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-slate-300 text-sm block leading-normal font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Breakline */}
        <div className="border-t border-slate-800/80 my-10"></div>

        {/* Bottom Metadata Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright Assertions */}
          <div className="text-slate-500 text-sm text-center md:text-left order-3 md:order-1">
            © {new Date().getFullYear()} A1 Communication. All rights reserved.
          </div>

          {/* Legal Document Pipelines */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 order-1 md:order-2">
            {legalLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-slate-500 group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </div>

          {/* External Social Profiles Links */}
          <div className="flex items-center gap-2.5 order-2 md:order-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-200
                  ${social.color} hover:text-white hover:border-transparent hover:-translate-y-0.5
                `}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Core Trust Metrics Footer Ribbon */}
        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-wrap justify-center gap-6 text-slate-600 text-xs">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-red-500/40" />
            99.9% Core Network Uptime Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-red-500/40" />
            24/7 Dedicated ISP Engineering Desk
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;