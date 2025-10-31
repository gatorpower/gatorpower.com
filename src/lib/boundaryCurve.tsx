export interface Points {
  x: Float32Array;
  y: Float32Array;
}

export interface FormulaConfig {
  fn: (t: number) => number;
  startX?: number; // 0-100 (percentage)
  startY?: number; // 0-100 (percentage)
}

export class BoundaryCurve {
  private canvas: HTMLCanvasElement;
  private _points: Points;
  public offsetX: number = 0;
  public offsetY: number = 0;

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
    
    this.offsetX = this.clamp(config.startX ?? 0, 0, 100);
    this.offsetY = this.clamp(config.startY ?? 0, 0, 100);
    
    const len = this._points.x.length;
    
    for (let i = 0; i < len; i++) {
      const t = i / (len - 1);
      this._points.x[i] = t;
      
      const result = config.fn(t);
      
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error(`Formula function must return a finite number. Got ${result} at t=${t}`);
      }
      
      this._points.y[i] = this.clamp(result, 0, 1);
    }
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

// Cartesian drawing function (flips Y-axis)
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

  const offsetXNormalized = curve.offsetX / 100;
  const offsetYNormalized = curve.offsetY / 100;

  ctx.beginPath();
  ctx.moveTo(
    (points.x[0] + offsetXNormalized) * scaleX,
    (1 - (points.y[0] + offsetYNormalized)) * scaleY
  );

  for (let i = 1; i < len; i++) {
    ctx.lineTo(
      (points.x[i] + offsetXNormalized) * scaleX,
      (1 - (points.y[i] + offsetYNormalized)) * scaleY
    );
  }

  ctx.stroke();
}