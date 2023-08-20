export interface FormFieldProps {
  /**
   * DOM id for label
   */
  labelId?: string;

  /**
   * DOM id for prefix
   */
  prefixId?: string;

  /**
   * DOM id for suffix
   */
  suffixId?: string;
  /**
   * DOM id for hint message
   */
  hintId?: string;

  /**
   * DOM id for error
   */
  errorId?: string;

  /**
   * Name of the input field
   */
  name: string;

  /**
   * Label of the input field
   */
  label: string;

  /**
   * If the input is disabled
   */
  disabled?: boolean;
  /**
   * Hint message for the input
   */
  hint?: string;
  /**
   * Error state of input, text provided will be shown as error message
   */
  error?: boolean | string;
  /**
   * If this input is read-only
   */
  readonly?: boolean;
  /**
   * Value of the input field
   */
  value?: string;
}

export interface CheckboxProps extends FormFieldProps {
  checked?: boolean;
  indeterminate?: boolean;
}

export interface InputProps extends FormFieldProps {
  type?: InputType;
}

export type InputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text';

export interface SelectProps extends FormFieldProps {
  options: SelectOption[] | string;
}

export interface TextareaProps extends FormFieldProps {
  maxLength?: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface GoChangeEventDetail<T = any> {
  value: T;
}
