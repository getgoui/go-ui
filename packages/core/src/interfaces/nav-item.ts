import { IconProps } from './icon';

export interface INavItem {
  label: string;
  url?: string;
  icon?: string;
  iconProps?: IconProps;
  description?: string;
  children?: INavItem[];
  isCurrent?: boolean;
  linkAttrs?: any;
}
