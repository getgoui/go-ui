export interface TabItem {
  tabId: string;
  panelId: string;
  label: string;
  active: boolean;
  iconSlot?: Element;
  iconActiveSlot?: Element;
  iconPosition?: TabIconPosition;
  iconOnly?: boolean;
}

export interface ActiveTab {
  id: string;
  label: string;
  index: number;
  tabEl: HTMLElement;
}
export interface ActiveTabWithPanel extends ActiveTab {
  panelId: string;
  panelEl: HTMLElement;
}

export type JustifyOption = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';

export type TabIconPosition = 'before' | 'after';
