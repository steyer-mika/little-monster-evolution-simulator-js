import { CONSTANTS } from "@/constants";

import { Entity } from "./entity";

export class Monster extends Entity {
  speed = 50; // pixels per second

  constructor(x: number, y: number) {
    super(x, y);
  }

  update(deltaTime: number) {
    // simple wandering behavior for now
    this.x += (Math.random() - 0.5) * this.speed * deltaTime;
    this.y += (Math.random() - 0.5) * this.speed * deltaTime;

    // clamp the position so the monster stays inside the sandbox
    this.x = Math.max(0, Math.min(this.x, CONSTANTS.sandbox.width));
    this.y = Math.max(0, Math.min(this.y, CONSTANTS.sandbox.height));
  }

  render(ctx: CanvasRenderingContext2D) {
    const px = Math.round(this.x);
    const py = Math.round(this.y);

    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ccc";
    ctx.fill();
  }
}
