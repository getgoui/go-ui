import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';
import JSON5 from 'json5';
import { ISlot } from './slot.type';

@Component({
  tag: 'slots-panel',
})
export class SlotsPanel {
  @Prop() debug = false;

  @Prop() values: ISlot[] = [];

  @Event() slotDisplayChange: EventEmitter<ISlot[]>;
  renderSlotControl(slotObj: ISlot) {
    let { name, content, show } = slotObj;
    if (!content) {
      return;
    }
    const controlId = `slot-${name}-control`;
    return (
      <div class="slot-control">
        <input
          type="checkbox"
          name={name}
          id={controlId}
          checked={show}
          onChange={e => this.updateSlotValue(e)}
          style={{ marginRight: '0.5rem' }}
        />
        <label htmlFor={controlId}>{name}</label>
        <div>
          <small>{slotObj.docs}</small>
        </div>
      </div>
    );
  }

  updateSlotValue(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    const newValues = this.values.map(slot => {
      if (slot.name === (e.target as HTMLInputElement).name) {
        slot.show = checked;
      }
      return slot;
    });

    this.slotDisplayChange.emit(newValues);
  }

  render() {
    return (
      <Host class="slots-panel">
        {this.debug ? <pre>{JSON5.stringify(this.values, undefined, 2)}</pre> : null}
        {this.values.map(slotObj => {
          return (
            <div class="slot" key={slotObj.name}>
              <div>{this.renderSlotControl(slotObj)}</div>
            </div>
          );
        })}
      </Host>
    );
  }
}
