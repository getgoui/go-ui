import { prefersDark } from './match-media';

declare const __zone_symbol__requestAnimationFrame: any;
declare const requestAnimationFrame: any;

/**
 * Extract attributes set on the an element.
 * @param {HTMLElement} el - The element to check.
 * @param {string[]} [excludes=[]] - A list of attribute names to exclude.
 * @param {boolean} [remove=true] - Remove the attributes after extracting them.
 */
export const inheritAttributes = (el: HTMLElement, excludes: string[] = [], remove: boolean = true) => {
  const attributes = el.attributes as NamedNodeMap;
  let attributeObject = {};
  for (let i = 0; i < attributes.length; i++) {
    const { name, value } = attributes[i];
    // console.log(`${name} = ${value}`);
    if (excludes.indexOf(name) === -1) {
      attributeObject[name] = value;
    }
  }

  if (remove) {
    // remove inherited attributes from el
    for (let key in attributeObject) {
      el.removeAttribute(key);
    }
  }

  return attributeObject;
};

export function hasShadowDom(el: HTMLElement): boolean {
  return !!el.shadowRoot && !!(el as any).attachShadow;
}

export function hasSlot(el: HTMLElement, slotName?: string): boolean {
  return !!el.querySelector('[slot="' + slotName + '"]');
}
// export const clamp = (min: number, n: number, max: number) => {
//   return Math.max(min, Math.min(n, max));
// };

// export const debounce = (func: (...args: any[]) => void, wait = 0) => {
//   let timer: any;
//   return (...args: any[]): any => {
//     clearTimeout(timer);
//     timer = setTimeout(func, wait, ...args);
//   };
// };

export const isDarkMode = () => {
  const darkByAttribute = document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.getAttribute('color-theme') === 'dark';
  return prefersDark() || darkByAttribute;
};

/*!
 * Get all direct descendant elements that match a selector
 * Dependency: the matches() polyfill: https://vanillajstoolkit.com/polyfills/matches/
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   elem     The element to get direct descendants for
 * @param  {String} selector The selector to match against
 * @return {Array}           The matching direct descendants
 */
export function selectDirectChildren(elem: HTMLElement, selector: string): HTMLElement[] {
  return Array.prototype.filter.call(elem.children, function (child) {
    return child.matches(selector);
  });
}

export function warning(...args: any[]) {
  console.log(`%c[Go UI warning]`, 'background: #e63a34; color: #fff; font-size: 24px;padding: 8px;');
  console.warn(...args);
}
