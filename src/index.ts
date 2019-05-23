import { memoize } from "./memoize";

// possible usage:
const memoized = memoize(factorialize);
function factorialize(num: number): number {
  if (num < 0) return -1;
  else if (num === 0) return 1;
  else {
    return num * memoized(num - 1);
  }
}

console.log(memoized(5));
