import type { Renderer } from "@/core/renderer";

import type { Sandbox } from "./sandbox";

export class Simulation {
  private readonly renderer: Renderer;
  private readonly sandbox: Sandbox;

  private readonly SMOOTHING_FACTOR = 0.1; // smaller = smoother but more lag
  private smoothedDt = 1 / 60; // 60 FPS

  lastTime = 0;

  constructor(renderer: Renderer, sandbox: Sandbox) {
    this.renderer = renderer;
    this.sandbox = sandbox;
  }

  start() {
    requestAnimationFrame(this.frame);
  }

  frame: FrameRequestCallback = (t: number) => {
    const rawDt = (t - this.lastTime) / 1000;
    this.lastTime = t;

    // dt smoothing
    this.smoothedDt =
      this.smoothedDt * (1 - this.SMOOTHING_FACTOR) +
      rawDt * this.SMOOTHING_FACTOR;

    this.sandbox.update(this.smoothedDt);
    this.renderer.render(this.sandbox);

    requestAnimationFrame(this.frame);
  };
}
