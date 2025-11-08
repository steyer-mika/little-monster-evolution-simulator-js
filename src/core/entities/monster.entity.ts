import { CONSTANTS } from '@/constants';

import { Food } from '@/core/entities/food.entity';
import type { Sandbox } from '@/core/sandbox';
import { Entity } from './entity';
export class Monster extends Entity {
  speed = 50;
  foodEaten = 0; // track food eaten

  constructor(x: number, y: number) {
    super(x, y);
  }

  update(deltaTime: number, sandbox: Sandbox) {
    // Find the nearest food
    let nearestFood: Food | null = null;
    let minDist = Infinity;

    for (const e of sandbox.entities) {
      if (e instanceof Food) {
        const dx = e.x - this.x;
        const dy = e.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          nearestFood = e;
        }
      }
    }

    if (nearestFood) {
      // Move toward the nearest food
      const dx = nearestFood.x - this.x;
      const dy = nearestFood.y - this.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      if (length > 0) {
        this.x += (dx / length) * (this.speed - this.foodEaten * 4) * deltaTime;
        this.y += (dy / length) * (this.speed - this.foodEaten * 4) * deltaTime;
      }

      // Check if the monster reached the food (e.g., distance < 5 pixels)
      if (minDist < 5) {
        // Eat the food
        this.foodEaten++;
        const index = sandbox.entities.indexOf(nearestFood);
        if (index !== -1) sandbox.entities.splice(index, 1);
      }
    } else {
      // do nothing for now
    }

    // Clamp position
    this.x = Math.max(0, Math.min(this.x, CONSTANTS.sandbox.width));
    this.y = Math.max(0, Math.min(this.y, CONSTANTS.sandbox.height));
  }

  render(ctx: CanvasRenderingContext2D) {
    const px = Math.round(this.x);
    const py = Math.round(this.y);

    ctx.beginPath();
    ctx.arc(px, py, 3 + this.foodEaten, 0, Math.PI * 2);
    ctx.fillStyle = '#ccc';
    ctx.fill();
  }
}
