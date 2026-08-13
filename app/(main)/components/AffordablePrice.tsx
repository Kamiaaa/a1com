import Link from 'next/link';
import React from 'react';

export default function AffordablePrice() {
  return (
    <section className="w-full bg-slate-900 py-16 px-4 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto overflow-hidden rounded-3xl my-8 shadow-2xl">

      {/* Left Column: Text & CTA Content */}
      <div className="flex-1 max-w-xl text-left">
        <h1 className="text-4xl md:text-5xl font-source font-bold text-white leading-tight mb-6">
          High-Speed Broadband <br className="hidden md:inline" />
          At An Affordable Price
        </h1>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
          Upgrade your home internet with lightning-fast speeds without breaking the bank.
          Whether you are streaming 4K content, gaming online, or working from home,
          Orange Communication delivers reliable connectivity tailored to your budget.
        </p>

        {/* Pricing Layout */}
        <div className="flex items-baseline gap-2 mb-8 font-sans">
          <span className="text-sm md:text-base font-bold text-slate-300 self-start mt-1 uppercase tracking-wider">
            Tk
          </span>
          <span className="text-5xl md:text-6xl font-black text-[#f16e10] tracking-tight">
            500
          </span>
          <span className="text-xs md:text-sm font-semibold text-slate-500 ml-1">
            Monthly
          </span>
        </div>

        {/* CTA Button */}
        <Link href={'/packages'}>
          <button className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-orange-500 text-orange-500 font-bold text-xs uppercase tracking-wider rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out">
            Get Started
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
            </svg>
          </button>
        </Link>
      </div>

      {/* Right Column: Visual Graphic Showcase */}
      <div className="flex-1 relative w-full max-w-md md:max-w-xl flex justify-center lg:justify-end">

        {/* Main Circular Profile Mask Layout */}
        <div className="relative w-[320px] h-80 md:w-112.5 md:h-112.5 rounded-full overflow-hidden border-8 border-slate-800 shadow-xl bg-slate-800">
          <img
            src="/img/offer.png"
            alt="Couple using digital tablet at home"
            className="w-full h-full object-cover object-[center_20%] mix-blend-lighten"
          />
        </div>

        {/* Floating Orange Badge: 10 Mbps */}
        <div className="absolute top-[15%] left-[-5%] md:left-[5%] w-32 h-32 md:w-44 md:h-44 bg-[#f16e10] rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-slate-900 transform hover:scale-105 transition-transform duration-300">
          <span className="text-3xl md:text-5xl font-black leading-none">10</span>
          <span className="text-xl md:text-3xl font-extrabold tracking-tight leading-none mt-1">Mbps</span>
          <span className="text-[9px] md:text-xs font-bold uppercase tracking-wider mt-1 opacity-90">Per Month</span>
        </div>

        {/* Floating Dark Badge: Special Offer */}
        <div className="absolute top-[2%] left-[20%] md:left-[32%] w-20 h-20 md:w-28 md:h-28 bg-slate-950 rounded-full flex flex-col items-center justify-center text-white text-center shadow-2xl border-2 border-slate-800 transform hover:scale-105 transition-transform duration-300 z-10">
          <span className="text-[10px] md:text-sm font-black tracking-wider leading-tight uppercase text-orange-400">
            Special<br />Offer
          </span>
        </div>

      </div>
    </section>
  );
}