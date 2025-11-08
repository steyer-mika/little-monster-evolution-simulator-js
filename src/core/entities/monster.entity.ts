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
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ccc";
    ctx.fill();
  }
}
