'use client'
import {useRef, useEffect, useLayoutEffect} from "react";
import { BoundaryCurve } from "@/lib/boundaryCurve";

interface GuillochePatternProps {
  width: number;
  height: number;
}

export default function GuillochePattern({ width, height }: GuillochePatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topBoundaryRef = useRef<BoundaryCurve | null>(null);
  const formulas = {
    topBoundary: {
      fn: (t: number): number => {
        return 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
      },
      startX: 0, /* percent */
      startY: 0, /* percent */
    },
    'lowerBoundary': {
      fn: (t: number): number => {
        return t;
      },
      startX: 0, /* percent */
      startY: 0, /* percent */ 
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    topBoundaryRef.current = new BoundaryCurve(canvas);
    topBoundaryRef.current.formulaSource(formulas.topBoundary);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2; 
    topBoundaryRef.current.cartesianDraw(ctx);
    console.log('My points',topBoundaryRef.current.points)
  }, []);

  // Handle resize
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !topBoundaryRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;

      /* update curve boundary data */
      topBoundaryRef.current.resizePoints();
      topBoundaryRef.current.formulaSource(formulas.topBoundary);

      //ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2; 
      topBoundaryRef.current.cartesianDraw(ctx);
    };

    window.addEventListener('resize', handleResize);

    /* cleanup */
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        width={width}
        height={height}
      />
      <p></p>
    </>

  );
}
