// ============================================================================
// patternMapper.ts - Maps patterns between boundary curves
// ============================================================================

import { BoundaryCurve } from "@/lib/boundaryCurve";

export type PatternFunction = (t: number) => number;

export interface MappedPoints {
  x: Float32Array;
  y: Float32Array;
}

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
      const t = i / (pointCount - 1); // 0 to 1
      
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

  /**
   * Get the boundaries being used (for debugging/inspection)
   */
  getBoundaries(): { top: BoundaryCurve; bottom: BoundaryCurve } {
    return {
      top: this.topBoundary,
      bottom: this.bottomBoundary
    };
  }
}

// ============================================================================
// Common Pattern Functions (for convenience)
// ============================================================================

export const Patterns = {
  /**
   * Sine wave centered at 50%
   */
  sineWave: (frequency: number = 1, amplitude: number = 0.5): PatternFunction => {
    return (t: number) => 0.5 + amplitude * Math.sin(t * Math.PI * 2 * frequency);
  },

  /**
   * Straight horizontal line at specified percentage
   */
  straightLine: (percentage: number = 0.5): PatternFunction => {
    return (_t: number) => percentage;
  },

  /**
   * Linear gradient from top to bottom
   */
  gradient: (): PatternFunction => {
    return (t: number) => t;
  },

  /**
   * Sawtooth wave
   */
  sawtooth: (frequency: number = 1): PatternFunction => {
    return (t: number) => (t * frequency) % 1;
  },

  /**
   * Square wave
   */
  square: (frequency: number = 1): PatternFunction => {
    return (t: number) => ((t * frequency) % 1) < 0.5 ? 0.2 : 0.8;
  },

  /**
   * Multiple sine waves combined
   */
  complexWave: (frequencies: number[] = [1, 2, 3]): PatternFunction => {
    return (t: number) => {
      let sum = 0;
      for (const freq of frequencies) {
        sum += Math.sin(t * Math.PI * 2 * freq);
      }
      return 0.5 + (sum / frequencies.length) * 0.4;
    };
  }
};