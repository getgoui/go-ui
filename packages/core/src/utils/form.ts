import { hasSlot, inheritComponentAttrs } from './helper';
import { kebabCase } from 'lodash-es';

export const fieldSlotNames = ['icon-before', 'icon-after', 'prefix', 'suffix', 'hint', 'label'];

export const fieldPropNames = [
  'prefix',
  'value',
  'error',
  'controlId',
  'labelId',
  'prefixId',
  'suffixId',
  'hintId',
  'errorId',
  'name',
  'label',
  'disabled',
  'hint',
  'readonly',
];

export function loadFieldProps(compInstance) {
  let props = {};
  fieldPropNames.forEach((propKey) => {
    props[propKey] = compInstance[propKey];
  });
  const specialPropMap = {
    controlId: 'id',
    idPrefix: 'prefix',
  };
  Object.keys(specialPropMap).forEach((key) => {
    const instancePropKey = specialPropMap[key];
    props[key] = compInstance[instancePropKey];
  });
  return props;
}
export function loadFieldSlots(rootEl) {
  let result = {};
  fieldSlotNames.forEach((slotName) => {
    result[slotName] = hasSlot(rootEl, slotName);
  });
  return result;
}
export function inheritNonFieldAttrs(compInstance, ignoreAttrs = []) {
  return inheritComponentAttrs(compInstance, [...fieldPropNames.map(kebabCase), ...ignoreAttrs]);
}
