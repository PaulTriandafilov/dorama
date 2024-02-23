"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const components_1 = require("./components");
class BasePage {
    /**
     * Navigates to page url
     * @param routes
     */
    async goto(routes) {
        return await this.page.goto(this.url(routes));
    }
    constructor(page) {
        /**
         * Returns playwright's page
         */
        this.getPage = () => this.page;
        this.page = page;
    }
    /**
     * Return Locator by passed selector
     *
     * @param selector
     * @param options
     */
    locator(selector, options) {
        return this.page.locator(selector, options);
    }
    /**
     * Return array of Locator by passed selector
     *
     * @param selector
     * @param options
     */
    locators(selector, options) {
        return this.page.locator(selector, options).all();
    }
    /**
     * Returns Component's instance with passed componentContainer
     *
     * @param ComponentClass
     * @param componentContainer
     */
    component(ComponentClass, componentContainer) {
        const locator = this.getLocator(componentContainer);
        return new ComponentClass(locator, 0);
    }
    /**
     * Returns Components class instance containing array of components
     *
     * @param ComponentClass
     * @param componentContainer
     */
    components(ComponentClass, componentContainer) {
        const locator = this.getLocator(componentContainer);
        return new components_1.Components(ComponentClass, locator);
    }
    getLocator(selectorOrLocator) {
        return typeof selectorOrLocator === 'string' ? this.locator(selectorOrLocator) : selectorOrLocator;
    }
}
exports.BasePage = BasePage;
