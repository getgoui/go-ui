import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import JSON5 from 'json5';
import { IProp, PropType } from './prop.type';

@Component({
  tag: 'props-panel',
  styleUrl: 'props-panel.scss',
})
export class PropsPanel {
  @Prop() debug = false;

  @Prop() values: IProp[] = [];

  @Event() propChange: EventEmitter<IProp[]>;

  updatePropValue(e: Event, propObject: IProp) {
    const { name, type } = propObject;
    const newValues: IProp[] = this.values
      .map(p => {
        let newValue = (e.target as HTMLInputElement).value as string | boolean;
        if (type === 'boolean') {
          newValue = (e.target as HTMLInputElement).checked;
        }
        if (type === 'object') {
          try {
            newValue = JSON5.parse((e.target as HTMLInputElement).value);
          } catch (e) {
            newValue = null;
          }
        }

        if (p.name === name) {
          if (newValue === null) {
            return { ...p, value: null };
          }
          p.value = newValue;
        }
        return p;
      })
      .filter(Boolean);

    this.propChange.emit(newValues);
  }

  /**
   * Get input type based on prop type
   * @param type PropType
   * @returns type attribute for input element
   */
  getInputFromType(type: PropType): string {
    switch (type) {
      case 'number':
        return 'number';
      case 'boolean':
        return 'checkbox';
      default:
        return 'text';
    }
  }

  renderPropControl(propObject: IProp) {
    let { value, type, options, name } = propObject;
    if (type === 'boolean') {
      value = !!value;
    }
    const inputType = this.getInputFromType(type);
    if (['object', 'array'].includes(type)) {
      return (
        <div class="prop-control">
          <label htmlFor={name}>
            {name} ({type})
          </label>
          <textarea rows={5} class="input" id={name} onInput={e => this.updatePropValue(e, propObject)}>
            {JSON5.stringify(value, undefined, 2)}
          </textarea>
        </div>
      );
    }

    if (['select', 'multiselect'].includes(type)) {
      return (
        <div class="prop-control">
          <label htmlFor={name}>{name}</label>
          <select class="input" id={name} onInput={e => this.updatePropValue(e, propObject)}>
            {options.map(option => {
              if (option === null) {
                return (
                  <option value={null} selected={!value}>
                    null
                  </option>
                );
              }
              if (typeof option === 'string') {
                return (
                  <option key={option} value={option} selected={option === value}>
                    {option}
                  </option>
                );
              }
              const { value: optionValue, label } = option;
              if (!label) {
                return (
                  <option key={optionValue} value={optionValue} selected={value === optionValue}>
                    {value}
                  </option>
                );
              }
              return (
                <option key={optionValue} value={optionValue} selected={value === optionValue}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    return (
      <div class="prop-control">
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          class="input"
          type={inputType}
          value={value as string}
          onInput={e => this.updatePropValue(e, propObject)}
          checked={type === 'boolean' && value !== false}
        />
      </div>
    );
  }

  render() {
    return (
      <Host class="props-panel">
        {this.debug ? <pre>{JSON5.stringify(this.values, undefined, 2)}</pre> : null}
        {this.values.map(propObj => {
          return (
            <div class="prop" key={propObj.name}>
              <div>{this.renderPropControl(propObj)}</div>
            </div>
          );
        })}
      </Host>
    );
  }
}
