import JSON5 from 'json5';

/**
 * parse items prop passed into the navigation component
 * @param items {T|string} navigation items to be rendered
 */
export function parseItems<T>(items: T | string): T {
  try {
    return typeof items === 'string' ? JSON5.parse(items) : items;
  } catch (e) {
    console.warn('Could not parse items', e);
  }
}
