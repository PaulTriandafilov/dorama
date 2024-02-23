/**
 * Find element in array  asynchronously
 *
 * @param array
 * @param callback
 */
export declare function findAsync<T>(array: T[], callback: (el: T) => Promise<boolean>): Promise<T>;
/**
 * Filter array asynchronously
 *
 * @param array
 * @param callback
 */
export declare function filterAsync<T>(array: T[], callback: (el: T) => Promise<boolean>): Promise<T[]>;
/**
 * Map over array asynchronously
 *
 * @param array
 * @param callback
 */
export declare function asyncMap<T, R>(array: T[], callback: (item: T) => R): Promise<R[]>;
