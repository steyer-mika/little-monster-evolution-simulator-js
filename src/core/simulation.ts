import { CONSTANTS } from "@/constants";
import type { Renderer } from "@/core/renderer";

import type { Sandbox } from "./sandbox";

export class Simulation {
  private readonly renderer: Renderer;
  private readonly sandbox: Sandbox;

  // Used to soften sudden spikes in frame time (optional but helps stability)
  private readonly SMOOTHING_FACTOR = 0.1;
  private smoothedDt = 1 / CONSTANTS.rendering.fps;

  lastTime = 0;

  // Stores accumulated time until enough has passed to run a simulation action
  private actionAccumulator = 0;

  constructor(renderer: Renderer, sandbox: Sandbox) {
    this.renderer = renderer;
    this.sandbox = sandbox;
  }

  start() {
    // Ask the browser to call `frame` before the next repaint
    requestAnimationFrame(this.frame);
  }

  frame: FrameRequestCallback = (t: number) => {
    // Delta Time: time between this frame and the previous one, in seconds
    const rawDt = (t - this.lastTime) / 1000;
    this.lastTime = t;

    // Smooth dt a bit so sudden frame hitches don’t cause large jumps
    this.smoothedDt =
      this.smoothedDt * (1 - this.SMOOTHING_FACTOR) +
      rawDt * this.SMOOTHING_FACTOR;

    // Convert dt to milliseconds since our simulation timing uses ms
    const dtMs = this.smoothedDt * 1000;

    // How often a simulation action should run
    // Example: 10 actions per 10000ms day = one action every 1000ms
    const actionIntervalMs =
      CONSTANTS.simulation.dayDurationMs / CONSTANTS.simulation.actionsPerDay;

    // Store elapsed time in the accumulator
    // Think of this like a "time bank"
    this.actionAccumulator += dtMs;

    // Run simulation steps whenever enough time has accumulated
    // This loop rarely runs more than once per frame, unless the game lagged
    // It keeps the simulation running at a stable real-time speed
    while (this.actionAccumulator >= actionIntervalMs) {
      this.sandbox.action(); // Run one fixed simulation step
      this.actionAccumulator -= actionIntervalMs; // Remove that chunk of time
    }

    // Render every frame (fast and smooth), independent from simulation speed
    this.renderer.render(this.sandbox);

    // Schedule the next frame
    requestAnimationFrame(this.frame);
  };
}
