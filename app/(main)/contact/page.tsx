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
  FaClock,
  FaDirections
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
        description="We'd love to hear from you. Reach out to us through any of the channels below or visit our office location."
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

        {/* Google Maps Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-12"
        >
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Our Location</h3>
              <p className="text-slate-300">Uttara, Dhaka - 1230, Bangladesh</p>
            </div>
            <a
              href="https://maps.google.com/?q=Uttara,Dhaka,Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-red-900/30"
            >
              <FaDirections className="h-5 w-5" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="w-full h-96 relative bg-slate-700">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4023249018446!2d90.3800!3d23.8748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3757c42738b5d3a5%3A0xb249f3e498c4d28d!2sUttara%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </motion.div>

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