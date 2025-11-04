'use client'
import {useEffect, useState} from "react";
import Image from "next/image";
import GuillochePattern from "@/components/ui/guillochePattern"

export default function Homie() {
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth * 0.8,  // 80% of viewport width
        height: window.innerHeight * 0.6  // 60% of viewport height
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
      <main>
        <GuillochePattern 
          width={dimensions.width} 
          height={dimensions.height}
          topBoundary={{
            fn: (t: number): number => t,
            xRange: [0, 100],   // Full width
            yRange: [50, 100]    // Full height
          }}
          bottomBoundary={{
            fn: (t: number): number => t, // Straight line at 0
            xRange: [50, 100],  // Only right half
            yRange: [0, 100]    // Full height
          }}
        />
      </main>
    </>
  );
}
