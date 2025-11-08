import { Entity } from "./entity";

export class Monster extends Entity {
  speed = 50; // pixels per second

  constructor(x: number, y: number) {
    super(x, y);
  }

  action() {
    // simple wandering behavior for now
    this.x += (Math.random() - 0.5) * this.speed;
    this.y += (Math.random() - 0.5) * this.speed;
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
