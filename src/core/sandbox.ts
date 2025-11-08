import { CONSTANTS } from "@/constants";
import type { Entity } from "@/core/entities/entity";
import { Food } from "@/core/entities/food.entity";

export class Sandbox {
  public entities: Entity[] = [];

  private elapsedTime = 0;
  public currentDay = 1;

  public add(entity: Entity): void {
    this.entities.push(entity);
  }

  public update(dt: number): void {
    this.elapsedTime += dt;

    // Check if a day has passed
    if (this.elapsedTime >= CONSTANTS.simulation.dayDurationMs) {
      this.nextDay();
      this.elapsedTime = 0;
    }

    for (const e of this.entities) {
      e.update(dt, this);
    }
  }

  private nextDay() {
    this.currentDay++;

    // Remove all old food
    this.entities = this.entities.filter((e) => !(e instanceof Food));

    // Spawn new food (example: 5 pieces at random positions)
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * CONSTANTS.sandbox.width;
      const y = Math.random() * CONSTANTS.sandbox.height;
      this.add(new Food(x, y));
    }
  }
}
