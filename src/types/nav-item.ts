export interface INavItem {
  label: string;
  url?: string;
  icon?: string;
  description?: string;
  children?: INavItem[];
  isCurrent?: boolean;
  linkAttrs?: any;
}
