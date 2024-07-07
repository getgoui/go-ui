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

export type BuiltInDeviceTypes = 'mobile' | 'tablet' | 'desktop' | 'large';

export function watchDevice(callback: (device: BuiltInDeviceTypes) => void): void {
  const syncEl = document.createElement('div');
  syncEl.setAttribute('id', 'sync-mq');
  document.body.appendChild(syncEl);
  var observer = new ResizeObserver(function (entries) {
    // get device type from body content
    if (!entries[0]) {
      return;
    }
    const style = getComputedStyle(syncEl, '::before').getPropertyValue('content');
    callback(style.replace(/"/g, '') as BuiltInDeviceTypes);
  });

  observer.observe(syncEl);
}

export const THEME_ATTRIBUTE = 'data-theme';
export type Theme = 'light' | 'dark';
/**
 * get preferred theme,
 * 1. Check user settings:
 *    - check if localstorage has user-theme key
 *    - if so, check if value is either light or dark,
 *    - if so, return value
 *    - if value is neither light or dark, continue to next step
 * 2. Check system preference:
 *    - check if prefers-color-scheme is dark, if so, return dark
 * 3. default to light
 */
export function getUserTheme(): Theme {
  const userTheme = window.localStorage.getItem('user-theme');
  if (userTheme === 'light' || userTheme === 'dark') {
    return userTheme;
  }

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  // Default to light
  return 'light';
}

export function setCurrentTheme(theme: Theme) {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
}

export function rememberUserTheme(theme) {
  window.localStorage.setItem('user-theme', theme);
}
