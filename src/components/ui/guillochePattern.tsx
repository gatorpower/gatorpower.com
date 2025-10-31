'use client'
import {useRef, useEffect, useLayoutEffect} from "react";
import { FormulaConfig, BoundaryCurve, cartesianDraw } from "@/lib/boundaryCurve";

interface GuillochePatternProps {
  width: number;
  height: number;
  topBoundary?: FormulaConfig;
  bottomBoundary?: FormulaConfig;
}

interface DistanceData {
  distances: Float32Array;
  maxDistance: number;
  arcLength: number; // Add this
}

function calculateDistances(
  topBoundary: BoundaryCurve,
  bottomBoundary: BoundaryCurve,
  canvasWidth: number,
  canvasHeight: number
): DistanceData {
  const topPoints = topBoundary.points;
  const bottomPoints = bottomBoundary.points;
  const len = topPoints.x.length;
  
  const distances = new Float32Array(len);
  let maxDistance = 0;
  let arcLength = 0;
  
  // Calculate distances and arc length
  for (let i = 0; i < len; i++) {
    // Convert normalized points to pixel coordinates
    const topX = (topPoints.x[i] + topBoundary.offsetX / 100) * canvasWidth;
    const topY = (1 - (topPoints.y[i] + topBoundary.offsetY / 100)) * canvasHeight;
    const bottomX = (bottomPoints.x[i] + bottomBoundary.offsetX / 100) * canvasWidth;
    const bottomY = (1 - (bottomPoints.y[i] + bottomBoundary.offsetY / 100)) * canvasHeight;
    
    // Distance between top and bottom at this point
    const dx = topX - bottomX;
    const dy = topY - bottomY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    distances[i] = distance;
    maxDistance = Math.max(maxDistance, distance);
    
    // Calculate arc length (distance to next point along the curve)
    if (i > 0) {
      const prevTopX = (topPoints.x[i-1] + topBoundary.offsetX / 100) * canvasWidth;
      const prevTopY = (1 - (topPoints.y[i-1] + topBoundary.offsetY / 100)) * canvasHeight;
      
      const segmentDx = topX - prevTopX;
      const segmentDy = topY - prevTopY;
      arcLength += Math.sqrt(segmentDx * segmentDx + segmentDy * segmentDy);
    }
  }
  
  return { distances, maxDistance, arcLength };
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
    if (!canvasRef.current || !debugCanvasRef.current) return;
    
    const canvas = canvasRef.current;
    const debugCanvas = debugCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const debugCtx = debugCanvas.getContext('2d');
    if (!ctx || !debugCtx) return;

    canvas.width = width;
    canvas.height = height;

    // Create or update boundary curves
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

    // Populate with formulas
    topBoundRef.current.fromFormula(topFormula);
    bottomBoundRef.current.fromFormula(bottomFormula);

    const topLength = topBoundRef.current.points.x.length;
    const bottomLength = bottomBoundRef.current.points.x.length;

    if (topLength > bottomLength) {
      bottomBoundRef.current.resize(topLength);
      bottomBoundRef.current.fromFormula(bottomFormula);
    } else if (bottomLength > topLength) {
      topBoundRef.current.resize(bottomLength);
      topBoundRef.current.fromFormula(topFormula);
    }

    // Calculate distances and arc length
    const { distances, maxDistance, arcLength } = calculateDistances(
      topBoundRef.current,
      bottomBoundRef.current,
      canvas.width,
      canvas.height
    );
    
    // Set debug canvas dimensions based on arc length
    debugCanvas.width = arcLength; // Actual curve length in pixels
    debugCanvas.height = maxDistance; // Maximum distance in pixels

    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, topBoundRef.current, canvas);

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, bottomBoundRef.current, canvas);

    // Draw debug canvas - vertical lines showing distance at each point
    debugCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);

    debugCtx.strokeStyle = '#10b981';
    debugCtx.lineWidth = 1;

    for (let i = 0; i < distances.length; i++) {
      const x = (i / (distances.length - 1)) * debugCanvas.width;
      const distanceHeight = (distances[i] / maxDistance) * debugCanvas.height;
      
      // Draw line from bottom up to the distance value
      debugCtx.beginPath();
      debugCtx.moveTo(x, debugCanvas.height);
      debugCtx.lineTo(x, debugCanvas.height - distanceHeight);
      debugCtx.stroke();
    }

    console.log('values of our top points',{
      'lengthX' : topBoundRef.current.points.x.length,
      'lengthY' : topBoundRef.current.points.y.length,
      'X' : topBoundRef.current.points.x,
      'Y' : topBoundRef.current.points.y,
    });
      console.log('values of our bottom points',{
      'lengthX' : bottomBoundRef.current.points.x.length,
      'lengthY' : bottomBoundRef.current.points.y.length,
      'X' : bottomBoundRef.current.points.x,
      'Y' : bottomBoundRef.current.points.y,
    });
  };

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
      <canvas 
        ref={debugCanvasRef}
        style={{ border: '1px solid #10b981', display: 'block', marginTop: '20px' }}
      />
    </>

  );
}
