'use client';

import { useState } from 'react';
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
  FaWhatsapp,
  FaCopy,
  FaCheck,
  FaDirections,
  FaChevronDown
} from 'react-icons/fa';

// Reusable Hero Section Component
function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative h-[38vh] min-h-[260px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/page-back.png"
          alt="Hero background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 opacity-80" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactMethods = [
    {
      id: 'phone',
      icon: FaPhone,
      title: 'Call Us Directly',
      primaryText: '+880 9644 219999',
      secondaryText: '+880 1824 382952',
      actionText: 'Call Now',
      actionUrl: 'tel:+8809644219999',
      copyValue: '+8809644219999',
      accentColor: 'from-red-600 to-red-700'
    },
    {
      id: 'whatsapp',
      icon: FaWhatsapp,
      title: 'Chat on WhatsApp',
      primaryText: '+880 1824 382951',
      secondaryText: 'Instant messaging support',
      actionText: 'Open WhatsApp',
      actionUrl: 'https://wa.me/8801824382951',
      copyValue: '+8801824382951',
      accentColor: 'from-emerald-600 to-green-700'
    },
    {
      id: 'email',
      icon: FaEnvelope,
      title: 'Email Our Team',
      primaryText: 'a1communicationbdisp@gmail.com',
      secondaryText: 'Response time: Within 24 hours',
      actionText: 'Send Email',
      actionUrl: 'mailto:a1communicationbdisp@gmail.com',
      copyValue: 'a1communicationbdisp@gmail.com',
      accentColor: 'from-slate-700 to-slate-800'
    },
    {
      id: 'hours',
      icon: FaClock,
      title: 'Working Hours',
      primaryText: 'Sat - Thu: 9:00 AM - 6:00 PM',
      secondaryText: 'Friday: Closed',
      actionText: 'Check Status',
      actionUrl: null,
      copyValue: null,
      accentColor: 'from-red-600 to-red-800'
    }
  ];

  const faqs = [
    {
      question: "What is the best way to get a fast response?",
      answer: "For instant queries, reach out directly via WhatsApp (+880 1824 382951) or call our hotlines during working hours."
    },
    {
      question: "Can I schedule an in-person meeting at your office?",
      answer: "Yes! We welcome visits at our Uttara, Dhaka office between 9:00 AM and 6:00 PM, Saturday through Thursday."
    },
    {
      question: "How soon do email inquiries receive a reply?",
      answer: "Email communications sent to a1communicationbdisp@gmail.com are routinely answered within 1 to 2 business hours."
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, name: 'LinkedIn', href: '#', color: 'hover:text-blue-400' },
    { icon: FaTwitter, name: 'Twitter', href: '#', color: 'hover:text-sky-400' },
    { icon: FaFacebook, name: 'Facebook', href: '#', color: 'hover:text-blue-500' },
    { icon: FaInstagram, name: 'Instagram', href: '#', color: 'hover:text-pink-400' }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeroSection 
        title="Get In Touch"
        description="Choose your preferred way to connect. Whether you prefer a quick phone call, WhatsApp chat, or in-person visit, we&apos;re ready to help."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {contactMethods.map((method) => (
            <motion.div
              key={method.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.accentColor} flex items-center justify-center text-white shadow-md`}>
                    <method.icon className="h-6 w-6" />
                  </div>
                  {method.copyValue && (
                    <button
                      onClick={() => handleCopy(method.copyValue!, method.id)}
                      title="Copy to clipboard"
                      className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 text-xs"
                    >
                      {copiedField === method.id ? (
                        <>
                          <FaCheck className="text-green-400 h-3.5 w-3.5" />
                          <span className="text-green-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <FaCopy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-slate-200 font-medium text-sm break-words mb-1">{method.primaryText}</p>
                <p className="text-slate-400 text-xs mb-6">{method.secondaryText}</p>
              </div>

              {method.actionUrl ? (
                <a
                  href={method.actionUrl}
                  target={method.actionUrl.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-red-600 text-white text-sm font-medium transition-colors text-center block border border-slate-700 hover:border-red-500"
                >
                  {method.actionText}
                </a>
              ) : (
                <div className="w-full py-2.5 px-4 rounded-xl bg-slate-800/50 text-slate-400 text-xs text-center border border-slate-800">
                  Open Sat - Thu
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Location & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <motion.div 
            className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
                  <FaMapMarkerAlt className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Visit Headquarters</h2>
                  <p className="text-xs text-slate-400">Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="space-y-3 my-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                  <strong className="text-white">Address:</strong> Uttara, Dhaka - 1230, Bangladesh
                </p>
                <p className="text-slate-400 text-xs">
                  Located conveniently near major transport nodes in Uttara. Walk-ins are welcome during regular working hours.
                </p>
              </div>
            </div>

            {/* Embedded Map Visual Container */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4239851765036!2d90.3900!3d23.8750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3757c42f02d33455%3A0xd647a9b0c79791f!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) opacity(0.85)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 right-3">
                <a
                  href="https://maps.google.com/?q=Uttara,+Dhaka+-+1230,+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-900/90 hover:bg-red-600 text-white text-xs font-medium rounded-lg backdrop-blur-md transition-colors flex items-center gap-1.5 border border-slate-700"
                >
                  <FaDirections className="h-3.5 w-3.5" />
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick FAQ Section */}
          <motion.div 
            className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h2>
              <p className="text-slate-400 text-xs mb-6">Quick answers to common questions before reaching out.</p>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 text-left font-medium text-sm text-slate-200 flex justify-between items-center hover:text-white transition-colors"
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-red-500' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Connect Banner */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-900/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-red-400">Need immediate help?</p>
                <p className="text-xs text-slate-300">Call our helpline instantly</p>
              </div>
              <a 
                href="tel:+8809644219999" 
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Call Hotline
              </a>
            </div>
          </motion.div>
        </div>

        {/* Social Media Footer Band */}
        <motion.div 
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Connect With Us Across Social Media</h3>
          <div className="flex justify-center items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.name}
                className={`w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 flex items-center justify-center text-slate-300 ${social.color} transition-all transform hover:-translate-y-1`}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}