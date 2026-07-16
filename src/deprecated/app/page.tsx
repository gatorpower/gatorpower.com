'use client';

import { useState, useEffect } from 'react';
import GuillochePattern from '@/components/ui/guillochePattern';

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.6
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <>
      <header>It's what the ladies want</header>
      <main>
        <GuillochePattern 
          width={dimensions.width} 
          height={dimensions.height}
          topBoundary={{
            fn: (t) => {
              // Semicircle: peaks at t=0.5 (50%) with height 1.0 (100%)
              // Formula: y = sqrt(r² - (x - center)²) where r=0.5, center=0.5
              const x = t - 0.5; // Shift so center is at 0
              return Math.sqrt(0.25 - x * x); // sqrt(0.5² - x²)
            },
            xRange: [0, 100],
            yRange: [0, 100]
          }}
          bottomBoundary={{
            fn: (t) => {
              const x = t - 0.5;
              return 0.9 * Math.sqrt(0.25 - x * x); // 90% of the top semicircle
            },
            xRange: [10, 90],
            yRange: [0, 100]
          }}
          pattern={(t) => 0.5 + 0.5 * Math.sin(t * Math.PI * 90)}
        />
      </main>
      <footer>It's what the gentlemen want</footer>
    </>
  );
}