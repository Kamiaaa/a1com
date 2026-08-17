"use client";

import React, { useState, useEffect } from "react";
import { 
  FaFacebookF,
  FaInstagram, 
  FaYoutube 
} from "react-icons/fa";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  colorClass: string; 
}

export default function SocialSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  const socials: SocialLink[] = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/A1Communication.ISP.bd",
      icon: <FaFacebookF className="text-xl" />,
      colorClass: "bg-[#1877F2]", // Official Facebook Blue
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: <FaInstagram className="text-xl" />,
      colorClass: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: <FaYoutube className="text-xl" />,
      colorClass: "bg-[#ff0000]",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Total scrollable height of the page
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Current scroll window position
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        const scrollPercentage = (currentScroll / totalHeight) * 100;
        
        // 50% scroll pass hole visible hobe
        if (scrollPercentage >= 50) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Component render er por ekbar check korbe
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed left-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-start gap-1 transition-all duration-500 ease-in-out ${
        isVisible 
          ? "translate-x-0 opacity-100 visibility-visible" 
          : "-translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      {socials.map((social, index) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group flex h-12 w-12 items-center justify-between overflow-hidden rounded-r-md px-3.5 text-white 
            transition-all duration-300 ease-in-out hover:w-36
            ${social.colorClass}
            ${isVisible ? 'animate-fade-in-left' : ''}
          `}
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "both",
          }}
        >
          {/* Label: Slides out and fades in on hover */}
          <span className="max-w-0 scale-0 font-medium opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:scale-100 group-hover:opacity-100">
            {social.name}
          </span>
          
          {/* Icon: Spin animation on hover */}
          <div className="transition-transform duration-300 group-hover:rotate-[360deg]">
            {social.icon}
          </div>
        </a>
      ))}
    </div>
  );
}