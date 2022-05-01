import { debounce, extract, wait } from './utils';

const NAVBAR_MAX_WIDTH = '--psfy-navbar-max-width';
const NAVBAR_MIN_WIDTH = '--psfy-navbar-min-width';
const NAVBAR_WIDTH = '--nav-bar-width';

wait(() => document.querySelector('.LayoutResizer__input')).then((el) => {
  function parseExtract(value: string | undefined): number {
    return parseInt(value as string, 10);
  }
  const maxWidth = parseExtract(extract(NAVBAR_MAX_WIDTH));
  const minWidth = parseExtract(extract(NAVBAR_MIN_WIDTH));
  const correct = debounce(() => {
    const width = parseExtract(extract.force(NAVBAR_WIDTH));
    if (width >= minWidth && width <= maxWidth) return;
    const current = width > maxWidth ? maxWidth : minWidth;
    document.documentElement.attributeStyleMap
      .set(NAVBAR_WIDTH, `${current}px`);
  }, 100);
  correct();
  const observer = new MutationObserver(correct);
  observer.observe(el, {
    attributes: true,
  });
});

export {};