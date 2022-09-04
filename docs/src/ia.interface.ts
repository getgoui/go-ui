import { INavItem } from '@go-ui/core/dist/types/interfaces';

export interface IA {
  [category: string]: IAItem;
}

export interface IAItem extends INavItem {
  id: string;
  meta?: Metadata;
  description?: string;
  content?: string;
  isIndex?: boolean;
  editUrl?: string;
  children?: IAItem[];
}

export interface Metadata {
  title?: string;
  order?: string;
  tags?: string[];
}
