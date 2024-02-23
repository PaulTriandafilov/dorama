/**
 * Find element in array  asynchronously
 *
 * @param array
 * @param callback
 */
export async function findAsync<T>(array: T[], callback: (el: T) => Promise<boolean>): Promise<T> {
  const promises = array.map(callback);
  const results = await Promise.all(promises);
  const index = results.findIndex(result => result);

  if (!array[index]) {
    throw new Error("Couldn't find any element by passed callback");
  }

  return array[index]!;
}

/**
 * Filter array asynchronously
 *
 * @param array
 * @param callback
 */
export async function filterAsync<T>(array: T[], callback: (el: T) => Promise<boolean>): Promise<T[]> {
  const promises = array.map(callback);
  const results = await Promise.all(promises);

  return array.filter((value, index) => results[index]);
}

/**
 * Map over array asynchronously
 *
 * @param array
 * @param callback
 */
export async function asyncMap<T, R>(array: T[], callback: (item: T) => R): Promise<R[]> {
  const results: R[] = [];
  for (const item of array) {
    const result = callback(item);
    results.push(result);
  }
  return results;
}
