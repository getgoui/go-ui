export interface INavItem {
  label: string;
  url?: string;
  icon?: string;
  children?: INavItem[];
  isCurrent?: boolean;
  linkAttrs?: any;
}

export type INavMenu = INavItem[];
