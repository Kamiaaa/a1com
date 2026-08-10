'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook,
  FaInstagram,
  FaClock
} from 'react-icons/fa';

// Reusable Hero Section Component matching shared application layout design
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

const Contact = () => {
  // Contact Information
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: 'a1communicationbdisp@gmail.com',
      description: 'Send us an email anytime',
      color: 'from-red-600 to-red-800'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: "+8809644219999 (NOC), +8801824382951 (What's app)",
      description: 'Saturday - Thursday from 9am to 6pm',
      color: 'from-red-600 to-red-800'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      details: 'Uttara, Dhaka -1230',
      description: 'Bangladesh',
      color: 'from-red-600 to-red-800'
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      details: 'Saturday - Thursday',
      description: '9:00 AM - 6:00 PM EST',
      color: 'from-red-600 to-red-800'
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: '#', color: 'hover:text-red-400' },
    { icon: FaTwitter, href: '#', color: 'hover:text-red-300' },
    { icon: FaFacebook, href: '#', color: 'hover:text-red-400' },
    { icon: FaInstagram, href: '#', color: 'hover:text-red-400' }
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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

  return (
    <motion.div 
      className="min-h-screen bg-slate-900 text-white transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <HeroSection 
        title="Get In Touch"
        description="We'd love to hear from you. Reach out to us through any of the channels below and we'll get back to you as soon as possible."
      />

      {/* Main Content */}
      <motion.div 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center group"
            >
              <motion.div 
                className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon className="h-7 w-7 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-white font-medium mb-1 break-words w-full">{item.details}</p>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Media Links Banner */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-800 rounded-2xl p-8 shadow-xl text-center max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white mb-2">Connect With Us</h3>
          <p className="text-slate-300 mb-6">Follow our official social channels to stay updated.</p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 ${social.color} transition-all duration-300`}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;