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
