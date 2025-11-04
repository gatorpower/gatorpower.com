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