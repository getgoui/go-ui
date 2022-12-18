import { JsonDocsEvent, JsonDocsListener, JsonDocsMethod, JsonDocsProp, JsonDocsSlot, JsonDocsStyle } from '@go-ui/core/dist/docs/go-ui';
import { INavItem } from '@go-ui/core/dist/types/interfaces';

export interface IA {
  [category: string]: IAItem;
}

export interface IAItem extends INavItem {
  id: string;
  directory?: string;
  meta?: Metadata;
  description?: string;
  content?: string;
  isIndex?: boolean;
  editUrl?: string;
  children?: IAItem[];
  // component only
  props?: {
    [tag: string]: JsonDocsProp[];
  };
  methods?: JsonDocsMethod[];
  events?: JsonDocsEvent[];
  listeners?: JsonDocsListener[];
  styles?: JsonDocsStyle[];
  slots?: JsonDocsSlot[];
}

export interface SlotDoc {
  name: string;
  desc: string;
}

export interface Metadata {
  title?: string;
  order?: string;
  tags?: string[];
}
