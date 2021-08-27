import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const pascalCase = (str) => {
  return capitalize(camelCase(str));
};

export function sentenseCase(str) {
  return capitalize(kebabCase(str).replace(/-/g, ' '));
}
