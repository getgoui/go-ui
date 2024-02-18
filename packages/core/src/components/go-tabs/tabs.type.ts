export interface TabItem {
  tabId: string;
  panelId: string;
  label: string;
  active: boolean;
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
