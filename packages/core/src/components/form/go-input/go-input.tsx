import { Component, h, Element } from '@stencil/core';
import { hasSlot, inheritComponentAttrs } from '../../../utils/helper';

@Component({
  tag: 'go-input',
  shadow: false,
})
export class GoInput {
  @Element() el: HTMLElement;

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

        <input class="control" {...controlAttrs} />
      </go-field>
    );
  }
}
