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
  index: number;
  tabEl: HTMLElement;
}
export interface ActiveTabWithPanel {
  index: number;
  tabEl: HTMLElement;
  panelEl: HTMLElement;
}

export type JustifyOption = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';

export type TabIconPosition = 'before' | 'after';
