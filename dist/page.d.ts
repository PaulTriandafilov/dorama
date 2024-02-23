import { Page, Locator } from 'playwright-core';
import { Components } from './components';
import { Component } from './component';
export type RoutesType = Record<string, string>;
export declare abstract class BasePage<T extends RoutesType = RoutesType> {
    private page;
    abstract url(routes?: RoutesType): string;
    /**
     * Navigates to page url
     * @param routes
     */
    goto(routes?: T): Promise<import("playwright-core").Response>;
    constructor(page: Page);
    /**
     * Return Locator by passed selector
     *
     * @param selector
     * @param options
     */
    protected locator(selector: string, options?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string | RegExp;
        hasText?: string | RegExp;
    }): Locator;
    /**
     * Return array of Locator by passed selector
     *
     * @param selector
     * @param options
     */
    protected locators(selector: string, options?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string | RegExp;
        hasText?: string | RegExp;
    }): Promise<Array<Locator>>;
    /**
     * Returns playwright's page
     */
    getPage: () => Page;
    /**
     * Returns Component's instance with passed componentContainer
     *
     * @param ComponentClass
     * @param componentContainer
     */
    protected component<T extends Component>(ComponentClass: new (container: Locator, index: number) => T, componentContainer: string | Locator): T;
    /**
     * Returns Components class instance containing array of components
     *
     * @param ComponentClass
     * @param componentContainer
     */
    protected components<T extends Component>(ComponentClass: new (container: Locator, index: number) => T, componentContainer: string | Locator): Components<T>;
    private getLocator;
}
export { Locator, Page };
