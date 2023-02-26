import { Component, h, Element, Prop, Host, State, Watch } from '@stencil/core';
import { inheritComponentAttrs, initIdProps, hasSlot } from '../../utils';
@Component({
  tag: 'go-select',
  styleUrl: 'go-select.scss',
})
export class GoSelect {
  @Element() el: HTMLElement;

  @Prop() options: { [key: string]: string }[];

  attrs: any;
  passSlots = ['icon-before', 'icon-after', 'prefix', 'suffix', 'hint'];
  hasNamedSlot: { [key: string]: boolean } = {};

  componentWillLoad() {
    this.attrs = inheritComponentAttrs(this);
    this.passSlots.forEach((slotName) => {
      this.hasNamedSlot[slotName] = hasSlot(this.el, slotName);
    });
  }

  render() {
    const { id, name, value, disabled, readonly, type, ...field } = this.attrs;
    const controlAttrs = {
      id,
      type,
      name,
      value,
      disabled: typeof disabled !== 'undefined',
      readonly,
    };
    return (
      <go-field controlId={id} readonly={readonly} disabled={disabled} {...field}>
        {this.passSlots.map((slotName) => {
          if (this.hasNamedSlot[slotName]) {
            return (
              <template slot={slotName}>
                <slot name={slotName}></slot>
              </template>
            );
          }
        })}
        <select class="control" {...controlAttrs}>
          <slot></slot>
        </select>
      </go-field>
    );
  }
}
