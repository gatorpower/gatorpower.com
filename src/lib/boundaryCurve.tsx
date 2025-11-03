// ============================================================================
// boundaryCurve.ts - Complete Implementation with Ranges
// ============================================================================

export interface Points {
  x: Float32Array;
  y: Float32Array;
}

export interface FormulaConfig {
  fn: (t: number) => number;
  xRange?: [number, number]; // [min, max] e.g., [50, 100]
  yRange?: [number, number]; // [min, max] e.g., [0, 100]
}

export class BoundaryCurve {
  private canvas: HTMLCanvasElement;
  private _points: Points;
  public xRange: [number, number] = [0, 100];
  public yRange: [number, number] = [0, 100];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const pointCount = canvas.width * 2;
    this._points = this.createPoints(pointCount);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  private createPoints(pointCount: number): Points {
    return {
      x: new Float32Array(pointCount),
      y: new Float32Array(pointCount),
    };
  }

  get points(): Readonly<Points> {
    return this._points;
  }

  resize(pointCount: number): void {
    this._points = this.createPoints(pointCount);
  }

  fromFormula(config: FormulaConfig): void {
    if (typeof config.fn !== 'function') {
      throw new Error('fromFormula requires a function in config.fn');
    }
    
    // Range limits (convert 0-100 to 0-1)
    const xMin = this.clamp(config.xRange?.[0] ?? 0, 0, 100) / 100;
    const xMax = this.clamp(config.xRange?.[1] ?? 100, 0, 100) / 100;
    const yMin = this.clamp(config.yRange?.[0] ?? 0, 0, 100) / 100;
    const yMax = this.clamp(config.yRange?.[1] ?? 100, 0, 100) / 100;
    
    this.xRange = [xMin * 100, xMax * 100];
    this.yRange = [yMin * 100, yMax * 100];
    
    // Calculate available dimensions
    const availableWidth = xMax - xMin;
    const availableHeight = yMax - yMin;
    
    // Original canvas aspect ratio
    const canvasAspectRatio = this.canvas.width / this.canvas.height;
    
    // Available box aspect ratio
    const availableAspectRatio = availableWidth / availableHeight;
    
    // Determine constrained dimensions (maintain original aspect ratio)
    let constrainedWidth: number;
    let constrainedHeight: number;
    
    if (availableAspectRatio > canvasAspectRatio) {
      // Width is limiting factor
      constrainedHeight = availableHeight;
      constrainedWidth = constrainedHeight * canvasAspectRatio;
    } else {
      // Height is limiting factor
      constrainedWidth = availableWidth;
      constrainedHeight = constrainedWidth / canvasAspectRatio;
    }
    
    // Actual drawing bounds (start from bottom-left)
    const drawXMin = xMin;
    const drawXMax = xMin + constrainedWidth;
    const drawYMin = yMin;
    const drawYMax = yMin + constrainedHeight;
    
    const originalLen = this._points.x.length;
    const tempX: number[] = [];
    const tempY: number[] = [];
    
    for (let i = 0; i < originalLen; i++) {
      const t = i / (originalLen - 1);
      
      // Map t to the constrained drawing box
      const x = drawXMin + (t * constrainedWidth);
      const y = drawYMin + (config.fn(t) * constrainedHeight);
      
      if (typeof y !== 'number' || !isFinite(y)) {
        throw new Error(`Formula function must return a finite number.`);
      }
      
      tempX.push(x);
      tempY.push(y);
    }
    
    this._points = {
      x: new Float32Array(tempX),
      y: new Float32Array(tempY)
    };
  }

  fromImage(imageData: ImageData): void {
    const traced = this.traceImage(imageData);
    this._points = this.subsample(traced, this._points.x.length);
  }

  private traceImage(imageData: ImageData): Points {
    const fullPoints: Points = {
      x: new Float32Array(imageData.width),
      y: new Float32Array(imageData.width),
    };
    // ... your tracing logic
    return fullPoints;
  }

  private subsample(fullTrace: Points, targetPoints: number): Points {
    const step = fullTrace.x.length / targetPoints;
    const result: Points = {
      x: new Float32Array(targetPoints),
      y: new Float32Array(targetPoints),
    };
    
    for (let i = 0; i < targetPoints; i++) {
      const srcIndex = Math.floor(i * step);
      result.x[i] = this.clamp(fullTrace.x[srcIndex], 0, 1);
      result.y[i] = this.clamp(fullTrace.y[srcIndex], 0, 1);
    }
    
    return result;
  }
}

// ============================================================================
// Drawing Function
// ============================================================================

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

// ============================================================================
// Distance Calculation
// ============================================================================

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
    // Simple Euclidean distance - points already contain all positioning info
    const dx = topPoints.x[i] - bottomPoints.x[i];
    const dy = topPoints.y[i] - bottomPoints.y[i];
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    distances[i] = distance;
    maxDistance = Math.max(maxDistance, distance);
  }
  
  return { distances, maxDistance };
}

// ============================================================================
// Debug Canvas Drawing
// ============================================================================

export function drawDebugCanvas(
  debugCtx: CanvasRenderingContext2D,
  debugCanvas: HTMLCanvasElement,
  distances: Float32Array,
  maxDistance: number,
  topWasLonger: boolean
): void {
  // Canvas dimensions
  debugCanvas.width = distances.length;  // One pixel per distance measurement
  debugCanvas.height = Math.ceil(maxDistance * 1000); // Scale for visibility
  
  debugCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
  
  // Draw vertical lines representing distances
  debugCtx.strokeStyle = '#10b981';
  debugCtx.lineWidth = 1;
  
  for (let i = 0; i < distances.length; i++) {
    const lineHeight = (distances[i] / maxDistance) * debugCanvas.height;
    
    debugCtx.beginPath();
    
    if (topWasLonger) {
      // Draw from top down
      debugCtx.moveTo(i, 0);
      debugCtx.lineTo(i, lineHeight);
    } else {
      // Draw from bottom up
      debugCtx.moveTo(i, debugCanvas.height);
      debugCtx.lineTo(i, debugCanvas.height - lineHeight);
    }
    
    debugCtx.stroke();
  }
}