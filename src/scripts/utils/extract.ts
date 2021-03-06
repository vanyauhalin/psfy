/**
 * Extracts variables from a element and cached them.
 */
const extract = (() => {
  const cache = new Map<string, string>();
  function inner(variable: string): string | undefined {
    return cache.has(variable) ? cache.get(variable) : inner.force(variable);
  }
  inner.force = (variable: string) => {
    const styles = document.documentElement.computedStyleMap();
    const unparsedValue = styles.get(variable) as CSSUnparsedValue;
    if (unparsedValue) {
      const [unparsedSegment] = unparsedValue;
      if (unparsedSegment) {
        const value = unparsedSegment.toString();
        cache.set(variable, value);
        return value;
      }
    }
    return undefined;
  };
  return inner;
})();

export {
  extract,
};
