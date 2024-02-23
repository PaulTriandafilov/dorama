import { Locator } from 'playwright-core';

import { Components } from './components';

export abstract class Component {
  readonly container: Locator;

  constructor(locator: Locator, index?: number) {
    this.container = locator.nth(index ?? 0);
  }

  /**
   * Return Locator by passed selector relative to component container
   *
   * @param selector
   * @param options
   */
  protected locator(
    selector: string | Locator,
    options?: {
      has?: Locator;
      hasNot?: Locator;
      hasNotText?: string | RegExp;
      hasText?: string | RegExp;
    },
  ): Locator {
    return this.container.locator(selector, options);
  }

  /**
   * Return array of Locator by passed selector relative to component container
   *
   * @param selector
   * @param options
   */
  protected locators(
    selector: string,
    options?: {
      has?: Locator;
      hasNot?: Locator;
      hasNotText?: string | RegExp;
      hasText?: string | RegExp;
    },
  ): Promise<Array<Locator>> {
    return this.container.locator(selector, options).all();
  }

  /**
   * Returns Component's instance with passed componentContainer relative to component container
   *
   * @param ComponentClass
   * @param componentContainer
   */
  protected component<T extends Component>(
    ComponentClass: new (container: Locator, index: number) => T,
    componentContainer: string | Locator,
  ): T {
    const locator = this.getLocator(componentContainer);
    return new ComponentClass(locator, 0);
  }

  /**
   * Returns Components class instance containing array of components
   *
   * @param ComponentClass
   * @param componentContainer
   */
  protected components<T extends Component>(
    ComponentClass: new (container: Locator, index: number) => T,
    componentContainer: string | Locator,
  ): Components<T> {
    const locator = this.getLocator(componentContainer);
    return new Components<T>(ComponentClass, locator);
  }

  private getLocator(selectorOrLocator: string | Locator): Locator {
    return typeof selectorOrLocator === 'string' ? this.container.locator(selectorOrLocator) : selectorOrLocator;
  }
}

export { Locator };
