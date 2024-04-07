export type PropType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'select' | 'multiselect';
export interface IProp {
  name: string;
  attr?: string;
  value: string | boolean | number;
  type: PropType;
  default: string | boolean | number;
  options?: string[] | { value: string | null; label: string }[];
}
