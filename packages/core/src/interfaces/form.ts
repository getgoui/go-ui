/**
 * Props for form fields
 * not everything is defined here as we use the `inheritAttributes` to move attributes into the native form elements
 */
export interface FormBaseProps {
  name: string;
  label: string;
  disabled?: boolean;
  value: any;
}

export interface FormCheckboxProps extends FormBaseProps {
  checked?: boolean;
}
