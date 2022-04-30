/**
 * Extracts variables from a element and cached them.
 */
function extractWrapper(): {
  (variable: string): string | undefined;
  force(variable: string): string | undefined;
} {
  const cache = new Map<string, string>();
  function force(variable: string): string | undefined {
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
  }
  function inner(variable: string): string | undefined {
    return cache.has(variable)
      ? cache.get(variable)
      : force(variable);
  }
  inner.force = force;
  return inner;
}

const extract = extractWrapper();

export {
  extract,
};
