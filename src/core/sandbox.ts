import type { Entity } from "@/core/entities/entity";

export class Sandbox {
  public entities: Entity[] = [];

  public add(entity: Entity): void {
    this.entities.push(entity);
  }

  public action(): void {
    for (const e of this.entities) {
      e.action();
    }
  }
}
