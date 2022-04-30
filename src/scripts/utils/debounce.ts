/**
 * Simplified version of `@github/mini-throttle`.
 * @see https://github.com/github/mini-throttle
 */
function debounce<T extends unknown[]>(
  callback: (...args: T) => unknown,
  delay = 0,
): {
    (...args: T): void;
  } {
  let timer: ReturnType<typeof setTimeout>;
  function inner(this: unknown, ...args: T): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  }
  return inner;
}

export {
  debounce,
};
