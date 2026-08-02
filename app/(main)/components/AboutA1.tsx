import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutA1: React.FC = () => {
    return (
        <div id="about" className="relative bg-slate-900 overflow-hidden my-16">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-slate-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">

                    {/* SVG Shape angled mask matching the slate theme */}
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-slate-900 transform translate-x-1/2"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100"></polygon>
                    </svg>

                    <div className="pt-1" />

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">

                            <h2 className="my-6 text-2xl tracking-tight font-source text-white sm:text-3xl md:text-5xl lg:text-6xl font-bold">
                                Experience lightning-fast{" "}
                                <span className="text-red-500">fiber optic internet</span>
                            </h2> 

                            <p className="text-slate-400 leading-relaxed text-lg sm:text-xl font-light">
                                A1 Communication delivers reliable, high-speed internet connectivity across Bangladesh. 
                                Enjoy seamless streaming, gaming, and work-from-home solutions with 99.9% uptime and 24/7 customer support.
                            </p>

                            {/* Refactored Interactive CTA Button */}
                            <div className="mt-8">
                                <Link href={'/about'}>
                                    <button className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-950/40 group text-base sm:text-lg tracking-wide uppercase">
                                        <span className="relative z-10">Learn More About A1 Communication</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </main>
                </div>
            </div>

            {/* Image Section - Fluid and optimized with a clean dark blend overlay for small screens */}
            <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-full w-full">
                    <Image
                        src="/img/about.png"
                        alt="Fiber optic internet connection"
                        fill
                        style={{ objectFit: "cover" }}
                        loading="eager"
                        className="object-cover opacity-90 lg:opacity-100"
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        priority
                    />
                    {/* Dark gradient overlay applied on mobile to seamlessly blend the image into the content layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
                </div>
            </div>
        </div>
    );
};

export default AboutA1;