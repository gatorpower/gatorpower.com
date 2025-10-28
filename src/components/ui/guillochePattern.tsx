'use client'
import {useRef, useEffect, useLayoutEffect} from "react";
import { FormulaConfig, BoundaryCurve, cartesianDraw } from "@/lib/boundaryCurve";

interface GuillochePatternProps {
  width: number;
  height: number;
  topBoundary?: FormulaConfig;
  bottomBoundary?: FormulaConfig;
}

export default function GuillochePattern({ 
  width, 
  height,
  topBoundary,
  bottomBoundary 
}: GuillochePatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topBoundRef = useRef<BoundaryCurve | null>(null);
  const bottomBoundRef = useRef<BoundaryCurve | null>(null);
  
  // Default formulas
  const defaultTopBoundary: FormulaConfig = {
    fn: (t: number): number => 0, // Straight line at 0
    startX: 0,
    startY: 100, // Position at very top (100%)
  };

  const defaultBottomBoundary: FormulaConfig = {
    fn: (t: number): number => 0, // Straight line at 0
    startX: 0,
    startY: 0, // Position at very bottom (0%)
  };

  // Use provided or default
  const topFormula = topBoundary ?? defaultTopBoundary;
  const bottomFormula = bottomBoundary ?? defaultBottomBoundary;

  // Extract common logic into a function
  const setupAndDraw = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Create or update boundary curves
    if (!topBoundRef.current) {
      topBoundRef.current = new BoundaryCurve(canvas);
    } else {
      topBoundRef.current.resizePoints();
    }

    if (!bottomBoundRef.current) {
      bottomBoundRef.current = new BoundaryCurve(canvas);
    } else {
      bottomBoundRef.current.resizePoints();
    }

    // Populate with formulas
    topBoundRef.current.fromFormula(topFormula);
    bottomBoundRef.current.fromFormula(bottomFormula);

    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, topBoundRef.current, canvas);

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, bottomBoundRef.current, canvas);
  };

  useEffect(() => {
    setupAndDraw();
  }, []);

  // Handle resize
  useLayoutEffect(() => {
    setupAndDraw();
  }, [width, height, topFormula, bottomFormula]);

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
