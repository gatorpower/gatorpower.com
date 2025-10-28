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
      <header>
        It's what the ladies want
      </header>
      <main>
        <GuillochePattern 
          width={dimensions.width} 
          height={dimensions.height}
          topBoundary={{
            fn: (t) => Math.sqrt(1 - Math.pow(1 - t, 2)),
            startX: 0,
            startY: 0
          }}
        />
        <Image
          src="/images/victor.jpg"
          alt="Portrait of Victor E Gator"
          width={180}
          height={38}
          priority
        />
      </main>
      <footer>
        It's what the gentlemen want
      </footer>
    </>
  );
}
