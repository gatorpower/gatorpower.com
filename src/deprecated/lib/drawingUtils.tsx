// ============================================================================
// lib/drawingUtils.ts - All drawing functions extracted
// ============================================================================

import { BoundaryCurve } from './boundaryCurve';

export function cartesianDraw(
  ctx: CanvasRenderingContext2D,
  curve: BoundaryCurve,
  canvas: HTMLCanvasElement
): void {
  const scaleX = canvas.width;
  const scaleY = canvas.height;
  const points = curve.points;
  const len = points.x.length;

  if (len === 0) return;

  ctx.beginPath();
  ctx.moveTo(
    points.x[0] * scaleX,
    (1 - points.y[0]) * scaleY
  );

  for (let i = 1; i < len; i++) {
    ctx.lineTo(
      points.x[i] * scaleX,
      (1 - points.y[i]) * scaleY
    );
  }

  ctx.stroke();
}

interface DistanceData {
  distances: Float32Array;
  maxDistance: number;
}

export function calculateDistances(
  topBoundary: BoundaryCurve,
  bottomBoundary: BoundaryCurve
): DistanceData {
  const topPoints = topBoundary.points;
  const bottomPoints = bottomBoundary.points;
  const len = topPoints.x.length;
  
  const distances = new Float32Array(len);
  let maxDistance = 0;
  
  for (let i = 0; i < len; i++) {
    const dx = topPoints.x[i] - bottomPoints.x[i];
    const dy = topPoints.y[i] - bottomPoints.y[i];
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    distances[i] = distance;
    maxDistance = Math.max(maxDistance, distance);
  }
  
  return { distances, maxDistance };
}

export function drawDebugCanvas(
  debugCtx: CanvasRenderingContext2D,
  debugCanvas: HTMLCanvasElement,
  distances: Float32Array,
  maxDistance: number,
  topWasLonger: boolean
): void {
  debugCanvas.width = distances.length;
  debugCanvas.height = Math.ceil(maxDistance * 1000);
  
  debugCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
  
  debugCtx.strokeStyle = '#10b981';
  debugCtx.lineWidth = 1;
  
  for (let i = 0; i < distances.length; i++) {
    const lineHeight = (distances[i] / maxDistance) * debugCanvas.height;
    
    debugCtx.beginPath();
    
    if (topWasLonger) {
      debugCtx.moveTo(i, 0);
      debugCtx.lineTo(i, lineHeight);
    } else {
      debugCtx.moveTo(i, debugCanvas.height);
      debugCtx.lineTo(i, debugCanvas.height - lineHeight);
    }
    
    debugCtx.stroke();
  }
}

/**
 * Draw a pattern function on the debug canvas for visualization
 * This shows what the pattern looks like before it's mapped to boundaries
 */
export function drawDebugPattern(
  debugCtx: CanvasRenderingContext2D,
  debugCanvas: HTMLCanvasElement,
  patternFn: (t: number) => number,
  pointCount: number
): void {
  debugCtx.strokeStyle = '#ef4444'; // Red
  debugCtx.lineWidth = 2;
  debugCtx.beginPath();

  for (let i = 0; i < pointCount; i++) {
    const t = i / (pointCount - 1);
    const percentage = patternFn(t);
    
    // Clamp to 0-1
    const clampedPercentage = Math.max(0, Math.min(1, percentage));
    
    // Draw from bottom up (0% = bottom, 100% = top)
    const x = i;
    const y = debugCanvas.height - (clampedPercentage * debugCanvas.height);

    if (i === 0) {
      debugCtx.moveTo(x, y);
    } else {
      debugCtx.lineTo(x, y);
    }
  }

  debugCtx.stroke();
}

/**
 * Draw mapped pattern positions on the debug canvas
 * Shows where pattern points land within the green distance area
 */
export function drawMappedDebugPattern(
  debugCtx: CanvasRenderingContext2D,
  debugCanvas: HTMLCanvasElement,
  mappedPoints: { percentage: number; distanceFromTop: number }[],
  maxDistance: number
): void {
  debugCtx.strokeStyle = '#8b5cf6'; // Purple
  debugCtx.lineWidth = 2;
  debugCtx.beginPath();

  for (let i = 0; i < mappedPoints.length; i++) {
    const x = i;
    // Distance from top, scaled to canvas height
    const y = (mappedPoints[i].distanceFromTop / maxDistance) * debugCanvas.height;

    if (i === 0) {
      debugCtx.moveTo(x, y);
    } else {
      debugCtx.lineTo(x, y);
    }
  }

  debugCtx.stroke();
}

// In drawingUtils.ts, add this function:

/**
 * Draw mapped pattern points on the main canvas
 */
export function drawMappedPattern(
  ctx: CanvasRenderingContext2D,
  mappedPoints: { x: Float32Array; y: Float32Array },
  canvas: HTMLCanvasElement
): void {
  const scaleX = canvas.width;
  const scaleY = canvas.height;
  const len = mappedPoints.x.length;

  if (len === 0) return;

  ctx.beginPath();
  ctx.moveTo(
    mappedPoints.x[0] * scaleX,
    (1 - mappedPoints.y[0]) * scaleY
  );

  for (let i = 1; i < len; i++) {
    ctx.lineTo(
      mappedPoints.x[i] * scaleX,
      (1 - mappedPoints.y[i]) * scaleY
    );
  }

  ctx.stroke();
}