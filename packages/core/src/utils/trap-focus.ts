/**
 * Get all focusable elements inside a given element
 * @param parent container element
 * @returns
 */
export function getFocusableChildren(parent: HTMLElement): NodeListOf<HTMLElement> {
  const selectors = ['button', '[href]', 'input', 'select', 'textarea', '[tabindex]:not([tabindex="-1"])'];
  return parent.querySelectorAll(selectors.join(','));
}

/**
 * Get the first focusable element in a given element
 * @param parent container element
 * @returns
 */
export function getFirstFocusableChild(parent: HTMLElement): HTMLElement {
  return getFocusableChildren(parent)[0];
}

/**
 * Get the last focusable element in a given element
 * @param parent container element
 * @returns
 */
export function getLastFocusableChild(parent: HTMLElement): HTMLElement {
  const list = getFocusableChildren(parent);
  return list[list.length - 1];
}

export function trapFocus(parent: HTMLElement): void {
  const focusableChildren = getFocusableChildren(parent);
  const firstFocusableEl = focusableChildren[0];
  const lastFocusableEl = focusableChildren[focusableChildren.length - 1];

  lastFocusableEl?.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      firstFocusableEl?.focus();
    }
  });
  firstFocusableEl?.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Tab' && e.shiftKey) {
      e.preventDefault();
      lastFocusableEl?.focus();
    }
  });
  // focus on first focusable element
  setTimeout(() => firstFocusableEl?.focus(), 50);
}
