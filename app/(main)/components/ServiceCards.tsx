'use client'
import React from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons - Cleaned up to natively match dark theme red highlights
const Icons = {
    Broadband: () => (
        <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M3 10h18M5 10v6a2 2 0 002 2h10a2 2 0 002-2v-6M8 10V6h8v4M6 20h12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),

    Wifi: () => (
        <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M4 9a12 12 0 0116 0M7 12a8 8 0 0110 0M10 15a4 4 0 014 0M12 19h.01" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3" y="17" width="18" height="3" rx="1" />
            <line x1="7" y1="17" x2="7" y2="14" />
            <line x1="17" y1="17" x2="17" y2="14" />
        </svg>
    ),

    Satellite: () => (
        <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M5 19l6-6M3 21l2-2M14 3a7 7 0 017 7M14 7a3 3 0 013 3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="14" r="3" />
            <line x1="10" y1="17" x2="10" y2="21" />
        </svg>
    ),

    Netflix: () => (
        <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <rect x="3" y="6" width="10" height="12" rx="1" />
            <path d="M13 10l6-3v10l-6-3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8a3 3 0 013 3M16 5a6 6 0 016 6" strokeLinecap="round" />
        </svg>
    ),
};

interface CardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    bgImage: string;
    index: number;
}

const ServiceCard: React.FC<CardProps> = ({ title, description, icon, bgImage, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
            }}
            whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
            }}
            className="group relative overflow-hidden bg-slate-800 p-6 border border-slate-700/60 rounded-xl shadow-lg cursor-pointer min-h-[340px] flex flex-col justify-between"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Smooth transition from default slate overlay to darker backdrop image revelation on hover */}
            <motion.div 
                className="absolute inset-0 bg-slate-900/95 transition-all duration-300 group-hover:bg-slate-950/70"
                initial={false}
                animate={{ opacity: 1 }}
                whileHover={{ opacity: 0 }}
            />

            <div className="relative z-10 flex flex-col items-start space-y-4 h-full justify-between">
                <div className="w-full">
                    <motion.div 
                        className="mb-4 inline-block"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {icon}
                    </motion.div>

                    <motion.h3 
                        className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-red-400"
                        whileHover={{ x: 4 }}
                    >
                        {title}
                    </motion.h3>

                    <motion.p 
                        className="mt-2 text-slate-400 text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-100 font-light"
                        whileHover={{ x: 4 }}
                    >
                        {description}
                    </motion.p>
                </div>

                <motion.button 
                    className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider text-red-400 transition-all duration-300 group-hover:text-white group-hover:underline"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Read More
                    <motion.svg 
                        className="ml-1 h-3.5 w-3.5"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </motion.svg>
                </motion.button>
            </div>
        </motion.div>
    );
};

const ServiceCardsGrid: React.FC = () => {
    const cardsData = [
        {
            title: 'Broadband',
            description: 'High-speed fiber broadband connection with unlimited data and 24/7 support for your home or business.',
            icon: <Icons.Broadband />,
            bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        },
        {
            title: 'WIFI Internet',
            description: 'Mesh WiFi systems covering every corner of your home with seamless roaming and advanced security features.',
            icon: <Icons.Wifi />,
            bgImage: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        },
        {
            title: 'Satellite TV',
            description: 'Over 500+ channels including HD sports, movies, and international content with cloud DVR storage.',
            icon: <Icons.Satellite />,
            bgImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        },
        {
            title: 'Netflix TV Box',
            description: '4K Ultra HD streaming device with Netflix, Prime Video, Disney+ and all your favorite apps pre-installed.',
            icon: <Icons.Netflix />,
            bgImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    return (
        <motion.div 
            className="bg-gradient-to-br from-slate-950 to-slate-900 p-8 my-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="mx-auto max-w-7xl">
                <motion.div 
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.h2 
                        className="text-3xl tracking-tight font-source text-white sm:text-4xl md:text-5xl font-bold"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Find Perfect Network Solutions
                    </motion.h2>
                    <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto font-light">
                        Choose the perfect plan for your entertainment and high-speed connectivity needs.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {cardsData.map((card, index) => (
                        <ServiceCard
                            key={index}
                            index={index}
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                            bgImage={card.bgImage}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ServiceCardsGrid;