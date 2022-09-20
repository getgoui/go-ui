import { Component, Host, h, Element, Prop } from '@stencil/core';
import { inheritAttributes } from '../../utils/helper';
import { BoxiconVariants, FontAwesomeVariants, IconProps, MaterialIconVariants } from '../../interfaces/icon';
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
   * Mark this icon to be hidden from screen reader
   */
  @Prop() decorative?: boolean = false;

  private attrs = {} as any;
  componentWillLoad() {
    this.attrs = inheritAttributes(this.el, [], false);
  }

  render() {
    const { iconSet, name, size, color, decorative, attrs } = this;
    const { class: customClasses } = attrs;
    return (
      <Host
        aria-hidden={decorative ? 'true' : 'false'}
        style={{
          '--icon-size': size ? size : null,
          '--icon-color': color ? color : null,
        }}>
        {iconSet.startsWith('material') ? <span class={`${iconSet} go-icon ${customClasses ? customClasses : ''}`}>{name}</span> : null}
        {iconSet.startsWith('fa') ? <i class={`${iconSet} fa-${name} go-icon ${customClasses ? customClasses : ''}`}></i> : null}
        {iconSet.startsWith('bx') ? <i class={`bx ${iconSet}-${name} go-icon ${customClasses ? customClasses : ''}`}></i> : null}
      </Host>
    );
  }
}
