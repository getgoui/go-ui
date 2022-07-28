/**
 * short hand for matchMedia
 * @param query media query string
 * @returns {MediaQueryList}
 */
export function mm(query: string): MediaQueryList {
  return window.matchMedia(query);
}
/**
 * Checks if prefer dark mode
 * @returns {boolean} if user has dark mode set in OS
 */
export function prefersDark(): boolean {
  return mm('(prefers-color-scheme: dark)').matches;
}
/**
 * Checks if prefers reduced motion
 * @returns {boolean} if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return mm('(prefers-reduced-motion: reduce)').matches;
}

export function watchDevice(callback: (device) => void): void {
  const syncEl = document.createElement('div');
  syncEl.setAttribute('id', 'sync-mq');
  document.body.appendChild(syncEl);
  console.log('yo', syncEl);
  var observer = new ResizeObserver(function (entries) {
    // get device type from body content
    if (!entries[0]) {
      return;
    }
    const style = getComputedStyle(syncEl, '::before').getPropertyValue('content');
    callback(style.replace(/"/g, ''));
  });

  observer.observe(syncEl);
}
