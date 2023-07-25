import { prefersDark } from './match-media';
import { uniqueId } from 'lodash-es';
import JSON5 from 'json5';

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

/**
 *
 * @param component stencil class instance
 * @param excludes exclude inheriting these attributes (besides class, style, id)
 */
export function inheritComponentAttrs(component, excludes: string[] = []) {
  if (!component.el) {
    warning(`root element not found in component`, component);
  }
  return inheritAttributes(component.el, ['class', 'style', 'id', ...Array.from(excludes)]);
}

/**
 * Extract the `id` from target element, then remove the original id attribute
 * @param el target element
 * @returns id specified in target element
 */
export function extractId(el: HTMLElement) {
  const id = el.id;
  el.removeAttribute('id');
  return id;
}

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
  const darkByAttribute =
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    document.documentElement.getAttribute('color-theme') === 'dark';
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

/**
 * Initialise id props (such as `labelId`, `hintId` etc) in stencil component
 * @param instance stencil component instance
 * @param rootEl stencil `@Element()` prop
 * @param idProps array of prop names such as `labelId` without the `Id` suffix, this array will be used to generate ids and assign them back to the class' props
 * @param prefix prefix for generated ids
 */
export function initIdProps(instance: any, rootEl: HTMLElement, idProps: string[], prefix: string) {
  let id = extractId(rootEl);
  if (!id) {
    id = uniqueId(prefix);
  }
  instance.id = id;
  idProps.forEach((key) => {
    if (!instance[`${key}Id`]) {
      instance[`${key}Id`] = `${id}-${key}`;
    }
  });
}
/**
 * parse items prop passed into the navigation component
 * @param items {T|string} navigation items to be rendered
 */
export function parseItems<T>(items: T | string): T {
  if (!items) {
    return null;
  }
  try {
    return typeof items === 'string' ? JSON5.parse(items) : items;
  } catch (e) {
    warning('Could not parse items', e);
  }
}
