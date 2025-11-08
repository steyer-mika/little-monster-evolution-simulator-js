import { CONSTANTS } from '@/constants';
import { Food } from '@/core/entities/food.entity';
import type { Monster } from '@/core/entities/monster.entity';
import { randomIntFromInterval } from '@/utility/random';
import { randomSandboxCoordinate } from '@/utility/random-sandbox-coordinate';

export class Sandbox {
  public monsters: Monster[] = [];
  public food: Food[] = [];

  private elapsedTime = 0;
  public currentDay = 1;

  public addMonster(monster: Monster): void {
    this.monsters.push(monster);
  }

  public addFood(food: Food): void {
    this.food.push(food);
  }

  public removeMonster(monster: Monster): void {
    const index = this.monsters.indexOf(monster);
    if (index !== -1) this.monsters.splice(index, 1);
  }

  public removeFood(food: Food): void {
    const index = this.food.indexOf(food);
    if (index !== -1) this.food.splice(index, 1);
  }

  public update(dt: number): void {
    this.elapsedTime += dt;

    // Check if a day has passed
    if (this.elapsedTime >= CONSTANTS.simulation.dayDurationMs) {
      this.nextDay();
      this.elapsedTime = 0;
    }

    for (const food of this.food) {
      food.update();
    }

    for (const monster of this.monsters) {
      monster.update(dt, this);
    }
  }

  private nextDay() {
    this.currentDay++;

    this.food = [];

    for (let i = 0; i < randomIntFromInterval(2, 10); i++) {
      const { x, y } = randomSandboxCoordinate();
      this.addFood(new Food(x, y));
    }
  }
}
