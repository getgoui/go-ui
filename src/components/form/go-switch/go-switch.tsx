import { Component, Host, h, Element, Prop } from '@stencil/core';
import { inheritAttributes } from '../../../utils/helper';
import uniqueId from 'lodash.uniqueid';

@Component({
  tag: 'go-switch',
  styleUrl: 'go-switch.scss',
  shadow: false,
})
export class GoSwitch {
  @Prop()
  checked?: boolean;

  @Prop()
  name: string;

  @Prop()
  label: string;

  @Prop()
  disabled?: boolean;

  @Prop()
  value: any;

  @Element() el: HTMLElement;

  // Store attributes inherited from the host element
  private attrs = {} as any;
  componentWillLoad() {
    this.attrs = inheritAttributes(this.el, ['class', 'style', ...Object.keys(this['__proto__'])]);
    console.log(this.attrs);
  }

  render() {
    const { checked, name, label, disabled, value, attrs } = this;
    const inputId = attrs?.id ? attrs.id : uniqueId('go-switch-');
    return (
      <Host>
        <label htmlFor={inputId}>{label}</label>
        <input type="checkbox" id={inputId} name={name} disabled={disabled} checked={checked} value={value} {...attrs} />
      </Host>
    );
  }
}
