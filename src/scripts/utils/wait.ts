/**
 * Waits while a element is rendered.
 */
function wait<T extends unknown>(
  expression: () => T | null,
): Promise<T> {
  return new Promise((resolve) => {
    let some = expression();
    if (some) {
      resolve(some);
      return;
    }
    const observer = new MutationObserver(() => {
      some = expression();
      if (some) {
        resolve(some);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export {
  wait,
};
