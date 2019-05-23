```
/**
 * Creates a function that memoizes the result of func. If resolver is provided it determines the cache key for
 * storing the result based on the arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the cache key.
 *
 * @param func The function to have its output memoized.
 * @param resolver The function to resolve the cache key.
 * @return Returns the new memoizing function.
 */

export function memoize(func: Function, resolver?: Function): Function {
  throw new Error("Not implemented");
}
```
