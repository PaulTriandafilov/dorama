"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const components_1 = require("./components");
class Component {
    constructor(locator, index) {
        this.container = locator.nth(index !== null && index !== void 0 ? index : 0);
    }
    /**
     * Return Locator by passed selector relative to component container
     *
     * @param selector
     * @param options
     */
    locator(selector, options) {
        return this.container.locator(selector, options);
    }
    /**
     * Return array of Locator by passed selector relative to component container
     *
     * @param selector
     * @param options
     */
    locators(selector, options) {
        return this.container.locator(selector, options).all();
    }
    /**
     * Returns Component's instance with passed componentContainer relative to component container
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
        return typeof selectorOrLocator === 'string' ? this.container.locator(selectorOrLocator) : selectorOrLocator;
    }
}
exports.Component = Component;
