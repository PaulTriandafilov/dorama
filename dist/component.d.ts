import { Locator } from 'playwright-core';
import { Components } from './components';
export declare abstract class Component {
    readonly container: Locator;
    constructor(locator: Locator, index?: number);
    /**
     * Return Locator by passed selector relative to component container
     *
     * @param selector
     * @param options
     */
    protected locator(selector: string | Locator, options?: {
        has?: Locator;
        hasNot?: Locator;
        hasNotText?: string | RegExp;
        hasText?: string | RegExp;
    }): Locator;
    /**
     * Return array of Locator by passed selector relative to component container
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
     * Returns Component's instance with passed componentContainer relative to component container
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
export { Locator };
