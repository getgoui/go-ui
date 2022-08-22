export interface ISlot {
  name: string;
  docs?: string;
  show?: boolean;
  content?: HTMLElement | string; // named slot store el, default slot store string
}
