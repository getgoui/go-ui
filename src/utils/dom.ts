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
