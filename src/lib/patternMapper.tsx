// ============================================================================
// lib/patternMapper.ts - Stage 1: Class Definition Only
// ============================================================================

import { BoundaryCurve } from './boundaryCurve';

/**
 * Function that defines a pattern to be mapped between boundaries
 * Takes t (0 to 1) and returns a percentage (0 to 1) representing
 * position between top boundary (0) and bottom boundary (1)
 */
export type PatternFunction = (t: number) => number;

/**
 * Mapped points in normalized coordinates (0-1)
 */
export interface MappedPoints {
  x: Float32Array;
  y: Float32Array;
}

/**
 * Maps pattern functions to the space between two boundary curves
 */
export class PatternMapper {
  private topBoundary: BoundaryCurve;
  private bottomBoundary: BoundaryCurve;

  constructor(topBoundary: BoundaryCurve, bottomBoundary: BoundaryCurve) {
    // Validate that boundaries have same number of points
    if (topBoundary.points.x.length !== bottomBoundary.points.x.length) {
      throw new Error('Top and bottom boundaries must have the same number of points');
    }
    
    this.topBoundary = topBoundary;
    this.bottomBoundary = bottomBoundary;
  }

  /**
   * Maps a pattern function to the space between the boundaries
   * 
   * @param patternFn - Function that returns y value (0-1) for given t (0-1)
   * @returns Mapped points that fit between the boundaries
   */
  mapPattern(patternFn: PatternFunction): MappedPoints {
    const pointCount = this.topBoundary.points.x.length;
    const mappedX = new Float32Array(pointCount);
    const mappedY = new Float32Array(pointCount);

    for (let i = 0; i < pointCount; i++) {
      const t = i / (pointCount - 1);
      
      // Evaluate pattern function to get percentage (0-1)
      const percentage = patternFn(t);
      
      if (typeof percentage !== 'number' || !isFinite(percentage)) {
        throw new Error(`Pattern function must return a finite number. Got ${percentage} at t=${t}`);
      }

      // Clamp percentage to 0-1 range
      const clampedPercentage = Math.max(0, Math.min(1, percentage));

      // Interpolate between top and bottom boundaries at this index
      const point = this.interpolate(i, clampedPercentage);
      
      mappedX[i] = point.x;
      mappedY[i] = point.y;
    }

    return {
      x: mappedX,
      y: mappedY
    };
  }

  /**
   * Linear interpolation between top and bottom boundary points
   * 
   * @param index - Index in the boundary arrays
   * @param percentage - How far between top (0) and bottom (1) to interpolate
   * @returns Interpolated point
   */
  private interpolate(index: number, percentage: number): { x: number; y: number } {
    const topPoints = this.topBoundary.points;
    const bottomPoints = this.bottomBoundary.points;

    const topX = topPoints.x[index];
    const topY = topPoints.y[index];
    const bottomX = bottomPoints.x[index];
    const bottomY = bottomPoints.y[index];

    // Linear interpolation: start + percentage * (end - start)
    const x = topX + percentage * (bottomX - topX);
    const y = topY + percentage * (bottomY - topY);

    return { x, y };
  }

  /**
   * Get the number of points that will be generated
   */
  getPointCount(): number {
    return this.topBoundary.points.x.length;
  }
}