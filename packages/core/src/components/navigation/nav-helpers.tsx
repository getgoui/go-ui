import { h } from '@stencil/core';
import { IIcon } from '../../interfaces';

export function renderIcon(icon?: IIcon, announce = false) {
  if (!icon) {
    return null;
  }
  if (typeof icon === 'string') {
    return <go-icon decorative={!announce} name={icon}></go-icon>;
  }
  return <go-icon decorative={!announce} {...icon}></go-icon>;
}
