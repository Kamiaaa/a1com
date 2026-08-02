"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaBolt,
  FaShieldHalved,
  FaWifi,
  FaNetworkWired
} from "react-icons/fa6";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IconType } from "react-icons";
import styles from "./Carousel.module.css";

interface SlideContent {
  id: number;
  image: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  PrimaryIcon: IconType;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  SecondaryIcon: IconType;
}

const SLIDES: SlideContent[] = [
  {
    id: 1,
    image: "/img/slide-01.png",
    title: "Lightning Fast",
    description: "Fiber Optic Internet",
    primaryBtnText: "View Plans",
    primaryBtnLink: "/packages",
    PrimaryIcon: FaBolt,
    secondaryBtnText: "+8801824382951",
    secondaryBtnLink: "/contact",
    SecondaryIcon: LuPhoneCall,
  },
  {
    id: 2,
    image: "/img/slide-03.png",
    title: "Bangladesh's Most",
    description: "Trusted ISP Provider",
    primaryBtnText: "Explore Packages",
    primaryBtnLink: "/packages",
    PrimaryIcon: FaShieldHalved,
    secondaryBtnText: "+8801824382951",
    secondaryBtnLink: "/contact",
    SecondaryIcon: LuPhoneCall,
  },
  {
    id: 3,
    image: "/img/slide-02.png",
    title: "Unlimited",
    description: "High-Speed Data Plans",
    primaryBtnText: "View Plans",
    primaryBtnLink: "/packages",
    PrimaryIcon: FaWifi,
    secondaryBtnText: "+8801824382951",
    secondaryBtnLink: "/contact",
    SecondaryIcon: LuPhoneCall,
  },
  {
    id: 4,
    image: "/img/slide-04.png",
    title: "99.9% Uptime",
    description: "Reliable Connection",
    primaryBtnText: "Get Connected",
    primaryBtnLink: "/contact",
    PrimaryIcon: FaNetworkWired,
    secondaryBtnText: "+8801824382951",
    secondaryBtnLink: "/contact",
    SecondaryIcon: LuPhoneCall,
  },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className={styles.carouselContainer}>
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full ${isActive ? "z-10" : "z-0"
              }`}
          >
            {/* 4-split animation slice background */}
            {[0, 1, 2, 3].map((sliceIdx) => {
              const sliceClassName = styles[`slice${sliceIdx}`];
              const activeClass = isActive ? styles.activeSlice : "";

              return (
                <div
                  key={sliceIdx}
                  className={`${styles.slice} ${sliceClassName} ${activeClass}`}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    transitionDelay: `${sliceIdx * 100}ms`,
                  }}
                />
              );
            })}

            {/* Fast Moving Isolated Color Shades */}
            {isActive && (
              <div className={styles.shadesContainer}>
                {[0, 1, 2, 3].map((shadeIdx) => (
                  <div
                    key={shadeIdx}
                    className={`${styles.colorShade} ${styles[`shade${shadeIdx}`]}`}
                  />
                ))}
              </div>
            )}

            {/* Rich Content Overlay */}
            {isActive && (
              <div className="absolute inset-0 bg-slate-950/40 z-20 flex flex-col items-center justify-center text-white px-4 text-center">
                <div className="max-w-4xl space-y-4 md:space-y-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-source tracking-wide">
                    {slide.title}
                  </h1>

                  <p className="text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-2xl mx-auto">
                    {slide.description}
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => router.push(slide.primaryBtnLink)}
                      className="relative overflow-hidden bg-red-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 group flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <slide.PrimaryIcon className="text-xl relative z-10" />
                      <span className="relative z-10">{slide.primaryBtnText}</span>
                      <span className="absolute inset-0 bg-red-700 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                    </button>

                    <button
                      onClick={() => router.push(slide.secondaryBtnLink)}
                      className="relative overflow-hidden bg-transparent border-2 border-red-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 group flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <slide.SecondaryIcon className="text-xl relative z-10" />
                      <span className="relative z-10">{slide.secondaryBtnText}</span>
                      <span className="absolute inset-0 bg-red-600 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Controllers */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-red-600 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none hidden md:flex"
      >
        <HiOutlineChevronLeft className="text-2xl" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-red-600 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none hidden md:flex"
      >
        <HiOutlineChevronRight className="text-2xl" />
      </button>

      {/* Animated Glowing Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2 sm:space-x-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="focus:outline-none transition-all duration-300 group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="relative">
              <div
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${activeIndex === index
                    ? "bg-red-500 scale-150 shadow-lg shadow-red-500/50"
                    : "bg-white/60 hover:bg-white"
                  }`}
              />

              {activeIndex === index && (
                <>
                  <div className="absolute inset-0 -m-1 border-2 border-red-500 rounded-full animate-ping opacity-60" />
                  <div className="absolute inset-0 -m-1.5 border border-red-400 rounded-full animate-pulse opacity-40" />
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}