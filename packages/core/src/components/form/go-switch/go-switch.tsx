import { Component, Host, h, Element, Prop } from '@stencil/core';
import { inheritAttributes } from '../../../utils/helper';
import { uniqueId, kebabCase } from 'lodash-es';
import { CheckboxProps } from '../../../interfaces/form';

@Component({
  tag: 'go-switch',
  styleUrl: 'go-switch.scss',
  shadow: false,
})
export class GoSwitch implements CheckboxProps {
  @Prop({ mutable: true })
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

  /**
   * Display label on top of switch
   */
  @Prop() stack = false;

  /**
   * make this field full width
   */
  @Prop() fullWidth = false;

  /**
   * show on/off text in switch toggle
   */
  @Prop() showOnOff = false;

  /**
   * show on/off text next to the switch toggle
   */
  @Prop() showOnOffOutside = false;

  /**
   * "on" label to show when `showOnOff*` is set to true
   */
  @Prop() activeLabel: string = 'On';

  /**
   * "off" label to show when `showOnOff*` is set to true
   */
  @Prop() inactiveLabel: string = 'Off';

  inputEl: HTMLInputElement;

  handleChange(e) {
    this.checked = e.target.checked;
  }

  // Store attributes inherited from the host element
  private attrs = {} as any;
  componentWillLoad() {
    const propNames = Object.keys(this['__proto__']);
    const attributeNames = propNames.map((name) => kebabCase(name));
    this.attrs = inheritAttributes(this.el, ['class', 'style', ...attributeNames]);
  }

  render() {
    const {
      checked,
      name,
      label,
      disabled,
      value,
      attrs,
      stack,
      fullWidth,
      showOnOff,
      showOnOffOutside,
      activeLabel,
      inactiveLabel,
    } = this;
    const inputId = attrs?.id ? attrs.id : uniqueId('go-switch-');
    return (
      <Host class={{ stack, 'full-width': fullWidth }}>
        <label htmlFor={inputId}>{label}</label>
        <div class="switch-container">
          <input
            ref={(el) => (this.inputEl = el)}
            type="checkbox"
            role="switch"
            id={inputId}
            name={name}
            disabled={disabled}
            checked={checked}
            value={value}
            {...attrs}
            onChange={(e) => this.handleChange(e)}
          />
          <div class="switch-group">
            <span class="switch-track">
              <span class="switch-handle"></span>
              {showOnOff ? (
                <span class="switch-text" aria-hidden="true">
                  {checked ? activeLabel : inactiveLabel}
                </span>
              ) : null}
            </span>
            {showOnOffOutside ? (
              <span class="text-size-0" aria-hidden="true">
                {checked ? activeLabel : inactiveLabel}
              </span>
            ) : null}
          </div>
        </div>
      </Host>
    );
  }
}
