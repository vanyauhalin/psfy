import { debounce, extract, wait } from './utils';

const NAVBAR_WIDTH = '--nav-bar-width';

wait(() => document.querySelector('.LayoutResizer__input')).then((el) => {
  function parse(value: ReturnType<typeof extract>): number {
    return parseInt(value as string, 10);
  }
  const maxWidth = parse(extract('--psfy-navbar-max-wd'));
  const minWidth = parse(extract('--psfy-navbar-min-wd'));
  const correct = debounce(() => {
    const width = parse(extract.force(NAVBAR_WIDTH));
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
