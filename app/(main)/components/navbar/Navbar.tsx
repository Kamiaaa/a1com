// app/components/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Menu,
  X,
  ChevronDown,
  Target,
  PhoneCall,
  Compass,
  UserCheck,
} from 'lucide-react';
import Image from 'next/image';

// Dropdown item type
type DropdownItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

// Dropdown menu type
type DropdownMenu = {
  name: string;
  items: DropdownItem[];
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Refs for hover timeout management
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Function to close all menus
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // Dropdown data with relevant travel and corporate icons
  const aboutUsDropdown: DropdownMenu = {
    name: 'About Us',
    items: [
      { name: 'About A1 Communication', href: '/about', icon: <Compass className="w-4 h-4" /> },
      { name: 'Mission & Vision', href: '/mission-vision', icon: <Target className="w-4 h-4" /> },
      { name: 'CEO and Founder', href: '/ceo-founder', icon: <UserCheck className="w-4 h-4" /> },
    ],
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: aboutUsDropdown.name, href: '#', isDropdown: true, dropdownData: aboutUsDropdown },
    { name: 'Packages', href: '/packages' },
    { name: 'Contact', href: '/contact' },
    { name: 'Self Care', href: '/login' },
  ];

  // Hover handlers for dropdowns
  const handleMouseEnter = (dropdownName: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - Left aligned - Responsive sizing for mobile */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              onClick={closeAllMenus}
            >
              {/* Responsive logo container */}
              <div className="relative w-28 h-14 sm:w-32 sm:h-16 md:w-36 md:h-18 lg:w-40 lg:h-20">
                <Image
                  src="/img/logo.png"
                  alt="logo"
                  fill
                  loading="eager"
                  className="object-contain"
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                ref={(el) => {
                  if (link.isDropdown && el) dropdownRefs.current[link.name] = el;
                }}
                onMouseEnter={() => link.isDropdown && handleMouseEnter(link.name)}
                onMouseLeave={link.isDropdown ? handleMouseLeave : undefined}
              >
                {link.isDropdown ? (
                  <button
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      flex items-center gap-1 group
                      ${openDropdown === link.name
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${pathname === link.href
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu - Desktop */}
                {link.isDropdown && openDropdown === link.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn"
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-2">
                      {link.dropdownData?.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 group"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="text-gray-400 group-hover:text-red-500 transition-colors">
                            {item.icon}
                          </span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button with updated PhoneCall icon */}
            <Link
              href="tel:+8801824382951-52"
              className="ml-4 px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-red-500/30 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              Hotline : +8801824382951-52
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Left to Right Sliding Menu */}
      <>
        {/* Overlay */}
        <div
          className={`
            fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-40
            md:hidden
            ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sliding Menu */}
        <div
          className={`
            fixed top-0 left-0 h-full w-80 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 
            shadow-2xl z-50 transition-transform duration-300 ease-out
            md:hidden
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Menu Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 group"
            >
              <div className="relative w-32 h-16">
                <Image
                  src="/img/logo.png"
                  alt="logo"
                  fill
                  loading="eager"
                  className="object-contain"
                  sizes="128px"
                  priority
                />
              </div>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link) => (
              <div key={link.name} className="px-4 py-1">
                {link.isDropdown ? (
                  <div className="mobile-dropdown">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <span className="font-medium">{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${openDropdown === link.name ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="pl-4 border-l-2 border-red-500/30 ml-3 space-y-1">
                        {link.dropdownData?.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-red-400 transition-colors rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`
                      block px-3 py-3 rounded-lg font-medium transition-all duration-200
                      ${pathname === link.href
                        ? 'bg-red-500/20 text-red-400 border-l-4 border-red-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Menu Footer with updated Hotline icon */}
          <div className="p-4 border-t border-slate-700">
            <Link
              href="tel:+8801824382951-52"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PhoneCall className="w-4 h-4" />
              Hotline : +8801824382951-52
            </Link>
          </div>
        </div>
      </>
    </nav>
  );
};

export default Navbar;