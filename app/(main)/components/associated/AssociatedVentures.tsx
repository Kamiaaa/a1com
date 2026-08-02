import React from 'react';
import Image from 'next/image';
import styles from './AssociatedVentures.module.css';

interface Venture {
  name: string;
  logoUrl: string;
}

interface AssociatedVenturesProps {
  title?: string;
  ventures?: Venture[];
}

// Default dummy data - Using dark-mode friendly text colors for placeholders
const defaultVentures: Venture[] = [
  { name: 'Venture One', logoUrl: '/img/otomax.png' },
  { name: 'Venture Two', logoUrl: '/img/glyder.png' },
  { name: 'Venture Three', logoUrl: '/img/otomax.png' },
  { name: 'Venture Four', logoUrl: '/img/glyder.png' },
  { name: 'Venture Five', logoUrl: '/img/otomax.png' },
  { name: 'Venture Six', logoUrl: '/img/glyder.png' },
];

export const AssociatedVentures: React.FC<AssociatedVenturesProps> = ({
  title = "Associated Ventures",
  ventures = defaultVentures,
}) => {
  // Duplicate the array to create a seamless infinite loop
  const duplicatedVentures = [...ventures, ...ventures];

  return (
    <section className="w-full bg-slate-900 py-12 overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 text-center">
        <h2 className="text-2xl tracking-tight font-source text-gray-50 dark:text-gray-900 sm:text-3xl md:text-5xl mb-4">
          {title}
        </h2>
      </div>

      {/* Slider Viewport Container */}
      <div className="relative flex w-full items-center">
        {/* Left Gradient Fade (Slate-900) */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track (Right to Left) */}
        <div className={styles.track}>
          {duplicatedVentures.map((venture, index) => (
            <div
              key={`${venture.name}-${index}`}
              className="relative flex items-center justify-center w-40 h-16 shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={venture.logoUrl}
                alt={`${venture.name} logo`}
                fill
                sizes="160px"
                className="object-contain"
                priority={index < 4}
              />
            </div>
          ))}
        </div>

        {/* Right Gradient Fade (Slate-900) */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default AssociatedVentures;