// ============================================================================
// lib/boundaryCurve.ts - Boundary generation (UNCHANGED from working version)
// ============================================================================

export interface Points {
  x: Float32Array;
  y: Float32Array;
}

export interface FormulaConfig {
  fn: (t: number) => number;
  xRange?: [number, number];
  yRange?: [number, number];
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
    
    const xMin = this.clamp(config.xRange?.[0] ?? 0, 0, 100) / 100;
    const xMax = this.clamp(config.xRange?.[1] ?? 100, 0, 100) / 100;
    const yMin = this.clamp(config.yRange?.[0] ?? 0, 0, 100) / 100;
    const yMax = this.clamp(config.yRange?.[1] ?? 100, 0, 100) / 100;
    
    this.xRange = [xMin * 100, xMax * 100];
    this.yRange = [yMin * 100, yMax * 100];
    
    const availableWidth = xMax - xMin;
    const availableHeight = yMax - yMin;
    
    const canvasAspectRatio = this.canvas.width / this.canvas.height;
    const availableAspectRatio = availableWidth / availableHeight;
    
    let constrainedWidth: number;
    let constrainedHeight: number;
    
    if (availableAspectRatio > canvasAspectRatio) {
      constrainedHeight = availableHeight;
      constrainedWidth = constrainedHeight * canvasAspectRatio;
    } else {
      constrainedWidth = availableWidth;
      constrainedHeight = constrainedWidth / canvasAspectRatio;
    }
    
    const drawXMin = xMin;
    const drawXMax = xMin + constrainedWidth;
    const drawYMin = yMin;
    const drawYMax = yMin + constrainedHeight;
    
    const originalLen = this._points.x.length;
    const tempX: number[] = [];
    const tempY: number[] = [];
    
    for (let i = 0; i < originalLen; i++) {
      const t = i / (originalLen - 1);
      
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