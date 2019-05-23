import { memoize } from "../index";

describe("memoize", () => {
  it("should return a function", () => {
    const fn = jest.fn();
    const memoized = memoize(fn);
    expect(memoized).toBeInstanceOf(Function);
  });

  it("should call the original function once", () => {
    const fn = jest.fn(arg => arg);
    const memoized = memoize(fn);
    expect(memoized(3)).toBe(3);
    expect(memoized(3)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should preserve cache between different argument calls", () => {
    const fn = jest.fn(arg => arg);
    const memoized = memoize(fn);
    expect(memoized(3)).toBe(3);
    expect(memoized(4)).toBe(4);
    expect(memoized(3)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("the original function and the memoized function should return the same results", () => {
    const fn = jest.fn(arg => arg);
    const memoized = memoize(fn);
    expect(fn(3)).toBe(memoized(3));
    const obj = {};
    expect(fn(obj)).toBe(memoized(obj));
    expect(fn(null)).toBe(memoized(null));
  });

  it("by default should memoize by the first argument", () => {
    const fn = jest.fn((arg1, arg2) => arg1 + arg2);
    const memoized = memoize(fn);
    expect(memoized(1, 2)).toEqual(3);
    expect(memoized(1, 3)).toEqual(3); // expected wrong result
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should support custom resolver", () => {
    const fn = jest.fn((arg1, arg2) => arg1 + arg2);
    const memoized = memoize(fn, (arg1, arg2) => arg1 + arg2);
    expect(memoized(1, 2)).toEqual(3);
    expect(memoized(6, 2)).toEqual(8);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("memoize cache should be isolated per memoized function", () => {
    const fn1 = jest.fn(arg => arg);
    const fn2 = jest.fn(arg => arg);
    const memoized1 = memoize(fn1);
    const memoized2 = memoize(fn2);
    memoized1(1);
    memoized2(1);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it("should properly handle falsy result edge case", () => {
    const fn = jest.fn(() => 0);

    const memoized = memoize(fn);
    memoized(1);
    memoized(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should support object by reference as a key", () => {
    const fn = jest.fn(arg => arg);
    const memoized = memoize(fn);
    const obj1 = {};
    const obj2 = {};
    expect(memoized(obj1)).toBe(obj1);
    expect(memoized(obj1)).toBe(obj1);
    expect(memoized(obj2)).toBe(obj2);
    expect(memoized(obj2)).toBe(obj2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should correctly handle this inside memoized function", () => {
    const fn = function(a) {
      return a + this.b;
    };
    const memoized = memoize(fn);
    const a = {
      b: 2,
      fn: memoized
    };
    expect(a.fn(1)).toBe(3);
  });

  it("should handle this inside resolver function", () => {
    const fn = function(a) {
      return a + this.b;
    };
    const memoized = memoize(fn, fn);
    const a = {
      b: 2,
      fn: memoized
    };
    expect(a.fn(1)).toBe(3);
    a.b = 3;
    expect(a.fn(1)).toBe(4);
  });
});
