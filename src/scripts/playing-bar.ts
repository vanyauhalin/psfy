import { wait } from './utils';

const PSFY_PLAYBACK_BAR_EXPANDED = 'psfy-playback-bar-expanded';

wait(() => document.querySelector('.main-nowPlayingWidget-nowPlaying'))
  .then(async (widget) => {
    const bar = await wait(() => document.querySelector('.playback-bar'));
    function toggle(el: Element | HTMLElement): void {
      if (el.classList.contains('main-nowPlayingWidget-coverExpanded')) {
        bar.classList.add(PSFY_PLAYBACK_BAR_EXPANDED);
      } else {
        bar.classList.remove(PSFY_PLAYBACK_BAR_EXPANDED);
      }
    }
    toggle(widget);
    const observer = new MutationObserver((mutations) => {
      const classMutation = mutations.find((mutation) => mutation
        .attributeName === 'class');
      if (classMutation) toggle(classMutation.target as HTMLElement);
    });
    observer.observe(widget, {
      attributes: true,
    });
  });
