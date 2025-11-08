/**
 * A service for interacting with the Document Object Model (DOM).
 */
export class DOMService {
  public static get<T extends HTMLElement = HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);

    if (element === null) {
      throw new Error(`Selector ${selector} not found.`);
    }

    return element;
  }
}
