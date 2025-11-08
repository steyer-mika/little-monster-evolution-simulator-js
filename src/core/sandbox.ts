import type { Entity } from "@/core/entities/entity";

export class Sandbox {
  public entities: Entity[] = [];

  public add(entity: Entity): void {
    this.entities.push(entity);
  }

  public update(dt: number): void {
    for (const e of this.entities) {
      e.update(dt);
    }
  }
}
