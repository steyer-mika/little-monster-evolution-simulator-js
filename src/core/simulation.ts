import type { Renderer } from '@/core/renderer';
import type { Sandbox } from '@/core/sandbox';
import type { DebugService } from '@/services/debug.service';

export class Simulation {
  private readonly renderer: Renderer;
  private readonly sandbox: Sandbox;
  private readonly debugService: DebugService;

  private readonly SMOOTHING_FACTOR = 0.1;
  private readonly UPDATE_STEP = 1 / 30; // fixed update step: 30 times per second

  private smoothedDt = 1 / 60;
  private accumulatedTime = 0;
  private lastTime = 0;
  private frameHandle: number | null = null;

  constructor(
    renderer: Renderer,
    sandbox: Sandbox,
    debugService: DebugService,
  ) {
    this.renderer = renderer;
    this.sandbox = sandbox;
    this.debugService = debugService;
  }

  public start() {
    this.lastTime = performance.now();
    this.frameHandle = requestAnimationFrame(this.frame);
  }

  public stop() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  public frame: FrameRequestCallback = (t: number) => {
    const rawDt = (t - this.lastTime) / 1000;
    this.lastTime = t;

    // dt smoothing
    this.smoothedDt =
      this.smoothedDt * (1 - this.SMOOTHING_FACTOR) +
      rawDt * this.SMOOTHING_FACTOR;

    // accumulate elapsed time
    this.accumulatedTime += this.smoothedDt;

    // run fixed-step updates
    while (this.accumulatedTime >= this.UPDATE_STEP) {
      this.debugService.update(1 / rawDt, this.sandbox.currentDay, t);
      this.accumulatedTime -= this.UPDATE_STEP;
    }

    this.sandbox.update(this.smoothedDt);
    this.renderer.render(this.sandbox);

    this.frameHandle = requestAnimationFrame(this.frame);
  };
}
