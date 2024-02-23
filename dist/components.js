"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Components = void 0;
const utils_1 = require("./utils");
class Components {
    constructor(typeClass, container) {
        this._componentsList = [];
        /**
         * Return component count
         *
         * @return Promise<number>
         */
        this.count = async () => await this.container.count();
        /**
         * Filter components list
         *
         * @param callback
         */
        this.filter = async (callback) => await (0, utils_1.filterAsync)(await this.all(), callback);
        /**
         * Find 1 component in components list
         *
         * @param callback
         */
        this.find = async (callback) => await (0, utils_1.findAsync)(await this.all(), callback);
        /**
         * Map over components list
         *
         * @param callback
         */
        this.map = async (callback) => Promise.all(await (0, utils_1.asyncMap)(await this.all(), callback));
        this._typeClass = typeClass;
        this.container = container;
    }
    /**
     * Returns Component by index
     *
     * @param index
     * @return T
     */
    nth(index) {
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
    first() {
        return this.nth(0);
    }
    /**
     * Returns array of all components
     *
     * @param reInit Pass it to reinit components list when there are corresponding changes on page
     *
     * @return Promise<Array<T>>
     */
    async all(reInit) {
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
     * Put new instance of component into the component's list if there is no
     */
    putComponentIfNo(index) {
        if (!this._componentsList[index])
            this._componentsList[index] = new this._typeClass(this.container, index);
    }
}
exports.Components = Components;
