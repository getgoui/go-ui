import { Component, h, Element, Prop, State } from '@stencil/core';
import { SelectOption } from '../../interfaces';
import { inheritComponentAttrs, hasSlot, parseItems } from '../../utils';
import { getActionFromKey, getIndexByLetter, getUpdatedIndex, isScrollable, maintainScrollVisibility, MenuActions, uniqueId } from '../../utils/select';

@Component({
  tag: 'go-select',
  styleUrl: 'go-select.scss',
  shadow: false,
})
export class GoSelect {
  @Element() el: HTMLElement;

  @Prop() options: SelectOption[] | string;

  @State() parsedOptions = [];

  /**
   * common form control properties
   */
  attrs: any;
  passSlots = ['icon-before', 'icon-after', 'prefix', 'suffix', 'hint'];
  hasNamedSlot: { [key: string]: boolean } = {};

  componentWillLoad() {
    this.attrs = inheritComponentAttrs(this);
    this.passSlots.forEach((slotName) => {
      this.hasNamedSlot[slotName] = hasSlot(this.el, slotName);
    });

    const options = parseItems(this.options);
    if (options) {
      this.parsedOptions = options.map((option) => {
        if (typeof option === 'string') {
          return {
            value: option,
            label: option,
          };
        }
        return option;
      });
    }
  }

  render() {
    const { parsedOptions, id, name, value, disabled, readonly, type, ...field } = this.attrs;
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
          <slot>{parsedOptions ? parsedOptions.map(({ value, label }) => <option value={value}>{label}</option>) : null}</slot>
        </select>
      </go-field>
    );
  }
}
