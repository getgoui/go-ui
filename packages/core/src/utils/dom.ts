/**
 * handle click outside of element
 * @param el target element
 * @param callback handler
 */
export function onClickOutside(el: HTMLElement, callback: (event: MouseEvent) => void) {
  document.addEventListener('click', (e: MouseEvent) => {
    if (el.contains(e.target as HTMLElement)) return;
    callback(e);
  });
}

/**
 * Add one time animationend event listener to given element, and remove it after fired once
 */
export function onAnimationEnd(el: HTMLElement, callback: () => void) {
  el.addEventListener('animationend', callback, { once: true });
}

/**
 * Fade out and remove element
 * @param el target element
 */
export function fadeOutRemove(el: HTMLElement, callback?: () => void) {
  // fade out DOM element then remove
  el.classList.add('animate-fade-out');
  onAnimationEnd(el, () => {
    el.remove();
    if (callback) callback();
  });
}

/**
 * Move an element into another parent
 * @param el Element to be moved
 * @param to Parent element to move el into
 */
export function moveEl(el: HTMLElement, to: HTMLElement) {
  to.appendChild(el);
}
