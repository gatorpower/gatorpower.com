interface Points {
  x: Float32Array;
  y: Float32Array;
}

interface FormulaConfig {
  fn: (t: number) => number;
  startX?: number; // 0-100 (percentage)
  startY?: number; // 0-100 (percentage)
}

export class BoundaryCurve {
  private canvas: HTMLCanvasElement;
  private _points: Points;
  private offsetX: number = 0; // Store offset
  private offsetY: number = 0; // Store offset

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this._points = this.createPointsForCurrentResolution();
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  /* array length must match to use (x, y) */
  private createPointsForCurrentResolution(): Points {
    const pointCount = this.canvas.width * 2;
    return {
      x: new Float32Array(pointCount),
      y: new Float32Array(pointCount),
    };
  }

  get points(): Readonly<Points> {
    return this._points;
  }

  resizePoints(): void {
    this._points = this.createPointsForCurrentResolution();
  }

  formulaSource(config: FormulaConfig): void {
    if (typeof config.fn !== 'function') {
      throw new Error('formulaSource requires a function in config.fn');
    }
    
    // Store the offsets for later use in draw()
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

  /* Cartesian style, starts at bottom left */
  cartesianDraw(ctx: CanvasRenderingContext2D): void {
    const scaleX = this.canvas.width;
    const scaleY = this.canvas.height;
    const len = this._points.x.length;

    if (len === 0) return;

    // Use stored offsets
    const offsetXNormalized = this.offsetX / 100;
    const offsetYNormalized = this.offsetY / 100;

    ctx.beginPath();
    ctx.moveTo(
      (this._points.x[0] + offsetXNormalized) * scaleX, 
      (1 - (this._points.y[0] + offsetYNormalized)) * scaleY
    );
    
    for (let i = 1; i < len; i++) {
      ctx.lineTo(
        (this._points.x[i] + offsetXNormalized) * scaleX, 
        (1 - (this._points.y[i] + offsetYNormalized)) * scaleY
      );
    }
    
    ctx.stroke();
  }

  // private imageSource(imageData: ImageData): void {
  //   const traced = this.traceImage(imageData);
  //   this.points = this.subsample(traced, this.points.x.length);
  // }

  // private traceImage(imageData: ImageData): Points {
  //   // Placeholder - implement your pixel tracing logic
  //   const fullPoints: Points = {
  //     x: new Float32Array(imageData.width),
  //     y: new Float32Array(imageData.width),
  //   };
  //   // ... your tracing logic
  //   return fullPoints;
  // }

  // private subsample(fullTrace: Points, targetPoints: number): Points {
  //   const step = fullTrace.x.length / targetPoints;
  //   const result: Points = {
  //     x: new Float32Array(targetPoints),
  //     y: new Float32Array(targetPoints),
  //   };
    
  //   for (let i = 0; i < targetPoints; i++) {
  //     const srcIndex = Math.floor(i * step);
  //     result.x[i] = fullTrace.x[srcIndex];
  //     result.y[i] = fullTrace.y[srcIndex];
  //   }
    
  //   return result;
  // }
}