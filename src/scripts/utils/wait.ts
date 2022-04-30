/**
 * Waits while a element is rendered.
 */
function wait<T extends unknown>(
  expression: () => T | null,
): Promise<T> {
  function check(callback?: () => void): Promise<T> {
    return new Promise((resolve) => {
      const some = expression();
      if (some) {
        resolve(some);
        return;
      }
      if (callback) {
        callback();
      }
    });
  }
  return new Promise((resolve) => {
    check(() => {
      const observer = new MutationObserver(() => {
        check().then((some) => {
          resolve(some);
          observer.disconnect();
        });
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  });
}

export {
  wait,
};
