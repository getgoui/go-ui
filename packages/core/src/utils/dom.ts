export const AUTO_FOCUS_TIMEOUT = 50;
/**
 * handle click outside of element
 * @param el target element
 * @param callback handler
 */
export function onClickOutside(el: HTMLElement, callback: (event: MouseEvent) => void): (e: MouseEvent) => void {
  const handler = (e: MouseEvent) => {
    if (el.contains(e.target as HTMLElement)) return;
    callback(e);
  };
  document.addEventListener('click', handler);
  return handler;
}

export function removeClickOutsideListener(handler) {
  document.removeEventListener('click', handler);
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

export const tabIndexes = {
  disabled: '-1',
  tabbable: '0',
};

/**
 * Get all focusable elements inside a given element
 * @param parent container element
 * @returns
 */
export function getFocusableChildren(parent: HTMLElement): HTMLElement[] {
  const selectors = ['button', '[href]', 'input', 'select', 'textarea', '[tabindex]:not([tabindex="-1"])'];
  return Array.from(parent.querySelectorAll(selectors.join(',')));
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
/**
 * Trap focus
 * @param parent parent element that we trap focus within
 * @param focusOnFirst if true, automatically focus on first focusable element (default = true)
 *
 * @returns list of focusable child elements
 */
export function trapFocus(parent: HTMLElement, focusOnFirst = true): HTMLElement[] {
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
  // focus on first focusable element automatically
  if (focusOnFirst) {
    setTimeout(() => firstFocusableEl?.focus(), AUTO_FOCUS_TIMEOUT);
  }

  return focusableChildren;
}

export function focusFirstWithin(parent: HTMLElement): void {
  const focusableChildren = getFocusableChildren(parent);
  const firstFocusableEl = focusableChildren[0];
  if (firstFocusableEl) {
    setTimeout(() => {
      firstFocusableEl.focus();
    }, AUTO_FOCUS_TIMEOUT);
  }
}

export function focusLastWithin(parent: HTMLElement): void {
  const lastFocusableChild = getLastFocusableChild(parent);
  if (lastFocusableChild) {
    setTimeout(() => {
      lastFocusableChild.focus();
    }, AUTO_FOCUS_TIMEOUT);
  }
}

// export function onFocusOut
