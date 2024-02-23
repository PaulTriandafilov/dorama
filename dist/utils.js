"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncMap = exports.filterAsync = exports.findAsync = void 0;
/**
 * Find element in array  asynchronously
 *
 * @param array
 * @param callback
 */
async function findAsync(array, callback) {
    const promises = array.map(callback);
    const results = await Promise.all(promises);
    const index = results.findIndex(result => result);
    if (!array[index]) {
        throw new Error("Couldn't find any element by passed callback");
    }
    return array[index];
}
exports.findAsync = findAsync;
/**
 * Filter array asynchronously
 *
 * @param array
 * @param callback
 */
async function filterAsync(array, callback) {
    const promises = array.map(callback);
    const results = await Promise.all(promises);
    return array.filter((value, index) => results[index]);
}
exports.filterAsync = filterAsync;
/**
 * Map over array asynchronously
 *
 * @param array
 * @param callback
 */
async function asyncMap(array, callback) {
    const results = [];
    for (const item of array) {
        const result = callback(item);
        results.push(result);
    }
    return results;
}
exports.asyncMap = asyncMap;
