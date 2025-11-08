import { DOMService } from '@/services/dom.service';
import { toReadableDuration } from '@/utility/time.format';

export class DebugService {
  private readonly fpsDisplay: HTMLDivElement;
  private readonly dayCountDisplay: HTMLDivElement;
  private readonly elapsedTimeDisplay: HTMLDivElement;

  constructor() {
    this.fpsDisplay = DOMService.get<HTMLDivElement>('#fps-display');
    this.dayCountDisplay = DOMService.get<HTMLDivElement>('#day-count-display');
    this.elapsedTimeDisplay = DOMService.get<HTMLDivElement>(
      '#elapsed-time-display',
    );
  }

  public update(fps: number, dayCount: number, elapsedMs: number): void {
    this.fpsDisplay.innerText = `${fps.toFixed()} FPS`;
    this.dayCountDisplay.innerText = `Day ${dayCount.toString()}`;
    this.elapsedTimeDisplay.innerText = toReadableDuration(elapsedMs);
  }
}
