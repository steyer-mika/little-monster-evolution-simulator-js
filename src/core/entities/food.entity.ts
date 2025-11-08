import { Entity } from './entity';

export class Food extends Entity {
  constructor(x: number, y: number) {
    super(x, y);
  }

  update() {}

  render(ctx: CanvasRenderingContext2D) {
    const px = Math.round(this.x);
    const py = Math.round(this.y);

    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ccc';
    ctx.fill();
  }
}
