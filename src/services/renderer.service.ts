import type { Sandbox } from "@/core/sandbox";

import { DOMService } from "./dom.service";

export class Renderer {
  private readonly canvas = DOMService.get<HTMLCanvasElement>("#renderer");

  private readonly context = this.canvas.getContext("2d");

  public render(sandbox: Sandbox): void {
    if (!this.context) return;

    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );

    for (const entity of sandbox.entities) {
      entity.render(this.context);
    }
  }
}
