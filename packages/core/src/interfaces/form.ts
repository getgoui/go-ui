/**
 * Props for form fields
 * not everything is defined here as we use the `inheritAttributes` to move attributes into the native form elements
 */
export interface FormBaseProps {
  name: string;
  label: string;
  disabled?: boolean;
  value: any;
  hint?: string;
  readonly?: boolean;
}

export interface CheckboxProps extends FormBaseProps {
  checked?: boolean;
}

export interface InputProps extends FormBaseProps {
  error?: string | boolean;
  type?: InputType;
}

export type InputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text';