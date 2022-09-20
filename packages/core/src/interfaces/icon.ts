export type MaterialIconVariants = `material-icons` | `material-icons-outlined` | `material-icons-round` | `material-icons-sharp`;
/**
 * https://fontawesome.com/v5.15/how-to-use/on-the-web/referencing-icons/basic-use
 */
export type FontAwesomeVariants = 'fas' | 'far' | 'fal' | 'fad' | 'fab';
/**
 * https://boxicons.com/usage @see type
 */
export type BoxiconVariants = 'bx' | 'bxs' | 'bxl';

export interface IconProps {
  iconSet?: MaterialIconVariants | FontAwesomeVariants | BoxiconVariants;
  name: string;
  size?: string;
  color?: string;
  decorative?: boolean;
}
