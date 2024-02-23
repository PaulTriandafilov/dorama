import { Locator } from 'playwright-core';
import { Component } from './component';
export declare class Components<T extends Component> {
    private _componentsList;
    private readonly _typeClass;
    container: Locator;
    constructor(typeClass: new (container: Locator, index: number) => T, container: Locator);
    /**
     * Returns Component by index
     *
     * @param index
     * @return T
     */
    nth(index: number): T;
    /**
     * Returns first component
     *
     * @return T
     */
    first(): T;
    /**
     * Returns array of all components
     *
     * @param reInit Pass it to reinit components list when there are corresponding changes on page
     *
     * @return Promise<Array<T>>
     */
    all(reInit?: boolean): Promise<Array<T>>;
    /**
     * Return component count
     *
     * @return Promise<number>
     */
    count: () => Promise<number>;
    /**
     * Filter components list
     *
     * @param callback
     */
    filter: (callback: (component: T) => Promise<boolean>) => Promise<T[]>;
    /**
     * Find 1 component in components list
     *
     * @param callback
     */
    find: (callback: (component: T) => Promise<boolean>) => Promise<T>;
    /**
     * Map over components list
     *
     * @param callback
     */
    map: <R>(callback: (section: T) => Promise<R>) => Promise<Awaited<R>[]>;
    /**
     * Put new instance of component into the component's list if there is no
     */
    private putComponentIfNo;
}
