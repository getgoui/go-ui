import { IIcon } from './icon';

export interface INavItem {
  label: string;
  url?: string;
  icon?: IIcon;
  description?: string;
  children?: INavItem[];
  isCurrent?: boolean;
  linkAttrs?: any;
}
