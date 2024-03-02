import { Component, Host, h, Element, Prop } from '@stencil/core';
import { IconProps } from '../../interfaces';
import { $attrs } from '../../utils/helper';
export type MaterialIconVariants =
  | `material-icons`
  | `material-icons-outlined`
  | `material-icons-round`
  | `material-icons-sharp`;
/**
 * https://fontawesome.com/v5.15/how-to-use/on-the-web/referencing-icons/basic-use
 */
export type FontAwesomeVariants = 'fas' | 'far' | 'fal' | 'fad' | 'fab';
/**
 * https://boxicons.com/usage @see type
 */
export type BoxiconVariants = 'bx' | 'bxs' | 'bxl';

@Component({
  tag: 'go-icon',
  styleUrl: 'go-icon.scss',
  shadow: false,
})
export class GoIcon implements IconProps {
  @Element() el: HTMLElement;
  /**
   * Specify the icon set being referenced.
   * Icon font CSS files must be included in the page.
   */
  @Prop({ reflect: true }) iconSet: MaterialIconVariants | FontAwesomeVariants | BoxiconVariants = 'material-icons';

  /**
   * Name of the icon
   */
  @Prop() name: string;

  /**
   * Size of the icon, supports CSS units and variables.
   * Default: 1.5em for material icons, 1em for other icon sets.
   */
  @Prop() size?: string;

  /**
   * Color of the icon,  supports CSS units and variables.
   * Default: `currentColor`
   */
  @Prop() color?: string;

  /**
   * provide label for screen reader
   */
  @Prop() label?: string;

  private attrs = {} as any;
  componentWillLoad() {
    this.attrs = $attrs.bind(this)(false);
  }

  render() {
    const { iconSet, name, size, color, label, attrs } = this;
    const { class: customClasses } = attrs;
    return (
      // prettier-ignore
      <Host
        aria-hidden={label ? 'false' : 'true'}
        style={{
          '--icon-size': size ? size : null,
          '--icon-color': color ? color : null,
        }}>{label ? <span class="visually-hidden">{label}</span> : null}{iconSet.startsWith('material') ? <span class={`${iconSet} go-icon ${customClasses ? customClasses : ''}`}>{name}</span> : null}{iconSet.startsWith('fa') ? <i class={`${iconSet} fa-${name} go-icon ${customClasses ? customClasses : ''}`}></i> : null}{iconSet.startsWith('bx') ? <i class={`bx ${iconSet}-${name} go-icon ${customClasses ? customClasses : ''}`}></i> : null}</Host>
    );
  }
}
