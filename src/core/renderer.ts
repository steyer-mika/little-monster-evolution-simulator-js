import { CONSTANTS } from '@/constants';
import type { Sandbox } from '@/core/sandbox';
import { DOMService } from '@/services/dom.service';

export class Renderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = DOMService.get<HTMLCanvasElement>('#renderer');

    const context = this.canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get context of canvas #renderer');
    }

    this.context = context;

    this.canvas.width = CONSTANTS.sandbox.width;
    this.canvas.height = CONSTANTS.sandbox.height;
  }

  public render(sandbox: Sandbox): void {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );

    for (const entity of sandbox.entities) {
      entity.render(this.context);
    }
  }
}
