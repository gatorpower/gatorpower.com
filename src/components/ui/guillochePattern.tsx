// ============================================================================
// components/guillochePattern.tsx
// ============================================================================

'use client'
import { useRef, useLayoutEffect } from "react";
import { 
  FormulaConfig, 
  BoundaryCurve 
} from "@/lib/boundaryCurve";
import {
  cartesianDraw,
  calculateDistances,
  drawDebugCanvas,
  drawDebugPattern,
  drawMappedDebugPattern,
  drawMappedPattern,
} from "@/lib/drawingUtils";
import { PatternMapper } from "@/lib/patternMapper";

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
  const debugCanvasRef = useRef<HTMLCanvasElement>(null);
  const topBoundRef = useRef<BoundaryCurve | null>(null);
  const bottomBoundRef = useRef<BoundaryCurve | null>(null);
  const patternMapperRef = useRef<PatternMapper | null>(null);
  
  const defaultTopBoundary: FormulaConfig = {
    fn: (t: number): number => 0,
    xRange: [0, 100],
    yRange: [100, 100],
  };
  
  const defaultBottomBoundary: FormulaConfig = {
    fn: (t: number): number => 0,
    xRange: [0, 100],
    yRange: [0, 0],
  };
  
  const topFormula = topBoundary ?? defaultTopBoundary;
  const bottomFormula = bottomBoundary ?? defaultBottomBoundary;
  
  const setupAndDraw = () => {
    if (!canvasRef.current || !debugCanvasRef.current) return;
    
    const canvas = canvasRef.current;
    const debugCanvas = debugCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const debugCtx = debugCanvas.getContext('2d');
    if (!ctx || !debugCtx) return;
    
    canvas.width = width;
    canvas.height = height;
    
    if (!topBoundRef.current) {
      topBoundRef.current = new BoundaryCurve(canvas);
    } else {
      topBoundRef.current.resize(canvas.width * 2);
    }
    
    if (!bottomBoundRef.current) {
      bottomBoundRef.current = new BoundaryCurve(canvas);
    } else {
      bottomBoundRef.current.resize(canvas.width * 2);
    }
    
    topBoundRef.current.fromFormula(topFormula);
    bottomBoundRef.current.fromFormula(bottomFormula);
    
    const topLength = topBoundRef.current.points.x.length;
    const bottomLength = bottomBoundRef.current.points.x.length;
    let topWasLonger = topLength >= bottomLength;
    
    if (topLength > bottomLength) {
      bottomBoundRef.current.resize(topLength);
      bottomBoundRef.current.fromFormula(bottomFormula);
    } else if (bottomLength > topLength) {
      topBoundRef.current.resize(bottomLength);
      topBoundRef.current.fromFormula(topFormula);
      topWasLonger = false;
    }
    
    patternMapperRef.current = new PatternMapper(
      topBoundRef.current,
      bottomBoundRef.current
    );
    
    const { distances, maxDistance } = calculateDistances(
      topBoundRef.current,
      bottomBoundRef.current
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, topBoundRef.current, canvas);
    
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, bottomBoundRef.current, canvas);
    
    const testPattern = (t: number) => 0.5 + 0.3 * Math.sin(t * Math.PI * 2) + 0.1 * Math.sin(t * Math.PI * 8);
    const mappedPoints = patternMapperRef.current.mapPattern((t) => 1 - testPattern(t));

    const mappedDebugPositions = [];
    for (let i = 0; i < mappedPoints.x.length; i++) {
      const topX = topBoundRef.current.points.x[i];
      const topY = topBoundRef.current.points.y[i];
      const dx = mappedPoints.x[i] - topX;
      const dy = mappedPoints.y[i] - topY;
      const distanceFromTop = Math.sqrt(dx * dx + dy * dy);
      
      mappedDebugPositions.push({
        percentage: testPattern(i / mappedPoints.x.length),
        distanceFromTop: distanceFromTop
      });
    }

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, bottomBoundRef.current, canvas);

    // Draw mapped pattern on main canvas
    ctx.strokeStyle = '#8b5cf6'; // Purple
    ctx.lineWidth = 1.5;
    drawMappedPattern(ctx, mappedPoints, canvas);

    // Draw both patterns on debug canvas:
    drawDebugCanvas(debugCtx, debugCanvas, distances, maxDistance, topWasLonger);

    // Red: original pattern
    drawDebugPattern(debugCtx, debugCanvas, testPattern, topBoundRef.current.points.x.length);

    // Purple: where those points land in green area
    drawMappedDebugPattern(debugCtx, debugCanvas, mappedDebugPositions, maxDistance);
  };
  
  useLayoutEffect(() => {
    setupAndDraw();
  }, [width, height, topFormula, bottomFormula]);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        width={width}
        height={height}
        style={{ border: '1px solid #ccc', display: 'block', maxWidth: '100%' }}
      />
      <canvas 
        ref={debugCanvasRef}
        style={{ border: '1px solid #10b981', display: 'block', marginTop: '20px', maxWidth: '100%' }}
      />
    </>
  );
}