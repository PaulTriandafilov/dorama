import { Page, Locator } from 'playwright-core';

import { Components } from './components';
import { Component } from './component';

export type RoutesType = Record<string, string>;

export abstract class BasePage<T extends RoutesType = RoutesType> {
  private page: Page;

  abstract url(routes?: RoutesType): string;

  /**
   * Navigates to page url
   * @param routes
   */
  async goto(routes?: T) {
    return await this.page.goto(this.url(routes));
  }

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Return Locator by passed selector
   *
   * @param selector
   * @param options
   */
  protected locator(
    selector: string,
    options?: {
      has?: Locator;
      hasNot?: Locator;
      hasNotText?: string | RegExp;
      hasText?: string | RegExp;
    },
  ): Locator {
    return this.page.locator(selector, options);
  }

  /**
   * Return array of Locator by passed selector
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
    return this.page.locator(selector, options).all();
  }

  /**
   * Returns playwright's page
   */
  getPage = () => this.page;

  /**
   * Returns Component's instance with passed componentContainer
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
    return typeof selectorOrLocator === 'string' ? this.locator(selectorOrLocator) : selectorOrLocator;
  }
}

export { Locator, Page };
