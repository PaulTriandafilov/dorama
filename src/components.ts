import { Locator } from 'playwright-core';

import { asyncMap, filterAsync, findAsync } from './utils';
import { Component } from './component';

export class Components<T extends Component> {
  private _componentsList: { [index: number]: T } = [];
  private readonly _typeClass: new (container: Locator, index: number) => T;
  public container: Locator;

  constructor(typeClass: new (container: Locator, index: number) => T, container: Locator) {
    this._typeClass = typeClass;
    this.container = container;
  }

  /**
   * Returns Component by index
   *
   * @param index
   * @return T
   */
  nth(index: number): T {
    this.putComponentIfNo(index);

    const nthComponent = this._componentsList[index];
    if (!nthComponent) {
      throw new Error(`Couldn't find component with index ${index}`);
    }

    return nthComponent;
  }

  /**
   * Returns first component
   *
   * @return T
   */
  first(): T {
    return this.nth(0);
  }

  /**
   * Returns array of all components
   *
   * @param reInit Pass it to reinit components list when there are corresponding changes on page
   *
   * @return Promise<Array<T>>
   */
  async all(reInit?: boolean): Promise<Array<T>> {
    if (reInit) {
      this._componentsList = [];
    }
    const sectionsCount = await this.count();

    for (let index = 0; index < sectionsCount; ++index) {
      this.putComponentIfNo(index);
    }

    return Object.values(this._componentsList);
  }

  /**
   * Return component count
   *
   * @return Promise<number>
   */
  count = async () => await this.container.count();

  /**
   * Filter components list
   *
   * @param callback
   */
  filter = async (callback: (component: T) => Promise<boolean>) => await filterAsync(await this.all(), callback);

  /**
   * Find 1 component in components list
   *
   * @param callback
   */
  find = async (callback: (component: T) => Promise<boolean>) => await findAsync(await this.all(), callback);

  /**
   * Map over components list
   *
   * @param callback
   */
  map = async <R>(callback: (section: T) => Promise<R>) => Promise.all(await asyncMap(await this.all(), callback));

  /**
   * Put new instance of component into the component's list if there is no
   */
  private putComponentIfNo(index: number) {
    if (!this._componentsList[index]) this._componentsList[index] = new this._typeClass(this.container, index);
  }
}
