import { h } from '@stencil/core';
import { IIcon } from '../../interfaces';

export function renderIcon(icon?: IIcon) {
  if (!icon) {
    return null;
  }
  if (typeof icon === 'string') {
    return <go-icon name={icon}></go-icon>;
  }
  return <go-icon {...icon}></go-icon>;
}
