// ============================================================================
// guillochePattern.tsx - Component with Range Support
// ============================================================================

'use client'
import { useRef, useLayoutEffect } from "react";
import { 
  FormulaConfig, 
  BoundaryCurve, 
  cartesianDraw, 
  calculateDistances,
  drawDebugCanvas 
} from "@/lib/boundaryCurve";

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
    
    // Find overlapping X range
    const topXMin = topBoundRef.current.xRange[0] / 100;
    const topXMax = topBoundRef.current.xRange[1] / 100;
    const bottomXMin = bottomBoundRef.current.xRange[0] / 100;
    const bottomXMax = bottomBoundRef.current.xRange[1] / 100;
    
    const overlapXMin = Math.max(topXMin, bottomXMin);
    const overlapXMax = Math.min(topXMax, bottomXMax);
    
    console.log('📊 Range Analysis:', {
      top: { xMin: topXMin, xMax: topXMax, span: topXMax - topXMin },
      bottom: { xMin: bottomXMin, xMax: bottomXMax, span: bottomXMax - bottomXMin },
      overlap: { xMin: overlapXMin, xMax: overlapXMax, span: overlapXMax - overlapXMin }
    });
    
    if (overlapXMin >= overlapXMax) {
      console.warn('⚠️ No overlap between curves');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    
    // Determine target density (use the denser curve)
    const topDensity = topBoundRef.current.points.x.length / ((topXMax - topXMin) || 1);
    const bottomDensity = bottomBoundRef.current.points.x.length / ((bottomXMax - bottomXMin) || 1);
    const targetDensity = Math.max(topDensity, bottomDensity);
    
    // Calculate point count for overlap region
    const overlapPointCount = Math.ceil(targetDensity * (overlapXMax - overlapXMin));
    
    console.log('🎯 Density Analysis:', {
      topDensity,
      bottomDensity,
      targetDensity,
      overlapPointCount
    });
    
    // TODO: Resample both curves to overlap region
    // For now, use existing synchronization
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
    
    // Debug log points
    console.log('🔵 TOP BOUNDARY:', {
      length: topBoundRef.current.points.x.length,
      xRange: topBoundRef.current.xRange,
      yRange: topBoundRef.current.yRange,
      firstPoint: {
        x: topBoundRef.current.points.x[0],
        y: topBoundRef.current.points.y[0]
      },
      lastPoint: {
        x: topBoundRef.current.points.x[topBoundRef.current.points.x.length - 1],
        y: topBoundRef.current.points.y[topBoundRef.current.points.y.length - 1]
      }
    });
    
    console.log('🔴 BOTTOM BOUNDARY:', {
      length: bottomBoundRef.current.points.x.length,
      xRange: bottomBoundRef.current.xRange,
      yRange: bottomBoundRef.current.yRange,
      firstPoint: {
        x: bottomBoundRef.current.points.x[0],
        y: bottomBoundRef.current.points.y[0]
      },
      lastPoint: {
        x: bottomBoundRef.current.points.x[bottomBoundRef.current.points.x.length - 1],
        y: bottomBoundRef.current.points.y[bottomBoundRef.current.points.y.length - 1]
      }
    });
    
    // Calculate distances
    const { distances, maxDistance } = calculateDistances(
      topBoundRef.current,
      bottomBoundRef.current
    );
    
    // Draw main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, topBoundRef.current, canvas);
    
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    cartesianDraw(ctx, bottomBoundRef.current, canvas);
    
    // Draw debug canvas
    drawDebugCanvas(debugCtx, debugCanvas, distances, maxDistance, topWasLonger);
    
    console.log('📏 Distance stats:', {
      pointCount: distances.length,
      maxDistance: maxDistance,
      debugCanvasWidth: debugCanvas.width,
      debugCanvasHeight: debugCanvas.height
    });
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