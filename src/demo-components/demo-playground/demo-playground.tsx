import { Component, Host, h, Element, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import JSON5 from 'json5';

export type PropType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'select' | 'multiselect';
export interface IProp {
  name: string;
  value: string | boolean | number;
  type: PropType;
  default: string | boolean | number;
  options?: string[];
}
@Component({
  tag: 'demo-playground',
  styleUrl: 'demo-playground.scss',
  shadow: false,
})
export class DemoPlayground {
  @Element() el: HTMLElement;

  /**
   * query selector for the component to apply props to
   */
  @Prop() tag: string = null;

  @Prop({ mutable: true }) props: IProp[] | string;

  @State() propsArray: IProp[] = [];

  @Event({
    eventName: 'loaded',
  })
  loadedEvent: EventEmitter<HTMLElement>;

  loadedComponent: HTMLElement;

  log(...args: any[]) {
    console.log('[Demo Playground]', ...args);
  }

  componentWillLoad() {
    this.propsArray = typeof this.props === 'string' ? JSON5.parse(this.props) : this.props;
    this.log(this.propsArray);
  }

  private targetEl = null;
  componentDidLoad() {
    this.targetEl = this.el.querySelector(this.tag) as HTMLElement;
    if (!this.targetEl) {
      console.error('[Demo Playground] Target element not found');
      return;
    }

    this.applyProps();

    this.log('loaded component ', this.targetEl, 'with props', this.propsArray);
    this.loadedEvent.emit(this.targetEl);
  }

  @Watch('propsArray')
  propsArrayChanged() {
    if (!this.targetEl) {
      return;
    }
    // update target element with new props
    this.applyProps();
  }

  applyProps() {
    this.propsArray.forEach(({ name, value }) => {
      this.targetEl[name] = value;
    });

    this.log(this.getUsage());
  }

  getUsage() {
    return `<${this.tag} ${this.propsArray
      .map(({ name, value, type }) => {
        if (type === 'boolean' && !value) {
          return false;
        }
        return `${name}="${value}"`;
      })
      .filter(Boolean)
      .join(' ')}></${this.tag}>`;
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

  updatePropValue(e: Event, propObject: IProp) {
    const { name, type } = propObject;
    this.propsArray = this.propsArray.map((p) => {
      if (p.name === name) {
        if (type === 'boolean') {
          p.value = (e.target as HTMLInputElement).checked;
        } else {
          p.value = (e.target as HTMLInputElement).value;
        }
      }
      return p;
    });
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
          <label htmlFor={name}>{name}</label>
          <textarea class="input" id={name}>
            {JSON5.stringify(value, undefined, 2)}
          </textarea>
          ;
        </div>
      );
    }

    if (['select', 'multiselect'].includes(type)) {
      return (
        <div class="prop-control">
          <label htmlFor={name}>{name}</label>
          <select class="input" id={name} onInput={(e) => this.updatePropValue(e, propObject)}>
            {options.map((value) => (
              <option value={value}>{value}</option>
            ))}
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
          onInput={(e) => this.updatePropValue(e, propObject)}
          checked={type === 'boolean' && value !== false}
        />
      </div>
    );
  }

  render() {
    let debug = false;
    return (
      <Host>
        <div class="container">
          <div class="row">
            <div class="col-tablet-8 demo">
              <div class="demo-bg"></div>
              <div class="demo-content">
                <slot></slot>
              </div>
            </div>
            <div class="col-tablet-4 controls">
              <div class="props">
                {debug ? <pre>{JSON5.stringify(this.propsArray, undefined, 2)}</pre> : null}
                {this.propsArray.map((propObj) => {
                  return (
                    <div class="prop" key={propObj.name}>
                      <div>{this.renderPropControl(propObj)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-tablet-12">
              <div class="usage">
                <go-accordion>
                  <go-accordion-item headingTag="span" heading="Output">
                    <pre>
                      <code>{this.getUsage()}</code>
                    </pre>
                  </go-accordion-item>
                </go-accordion>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
