import { Component, Host, h, Element, Prop, Event, EventEmitter, State } from '@stencil/core';
import JSON5 from 'json5';
import copy from 'copy-text-to-clipboard';
import kebabCase from 'lodash.kebabcase';
import { IProp } from './prop.type';
import { ISlot } from './slot.type';

@Component({
  tag: 'wc-playground',
  styleUrl: 'wc-playground.scss',
  shadow: false,
})
export class WcPlayground {
  @Element() el: HTMLElement;

  /**
   * query selector for the component to apply props to
   */
  @Prop({ mutable: true }) tag: string;

  @Prop({ mutable: true }) props: IProp[] | string;

  @State() propsArray: IProp[] = [];

  @Prop() slots: ISlot[] | string;

  @State() slotsArray: ISlot[] = [];

  @Prop() code: string = '';

  @Event({
    eventName: 'loaded',
  })
  loadedEvent: EventEmitter<HTMLElement>;

  loadedComponent: HTMLElement;

  @Prop() block: boolean = false;

  debug = false;

  log(...args: any[]) {
    if (this.debug) {
      console.trace('[Demo Playground]', ...args);
    }
  }

  @State() renderedComponent: string = '';

  componentWillLoad() {
    this.initiateData();
    this.renderedComponent = this.getUsage();
  }

  initiateData() {
    this.propsArray = typeof this.props === 'string' ? JSON5.parse(this.props) : this.props;
    this.slotsArray = typeof this.slots === 'string' ? JSON5.parse(this.slots) : this.slots;

    // extract props from code
    const tempPropsHolder = document.createElement('div');

    // parse the code prop and store the initial html for slot usage rendering
    tempPropsHolder.innerHTML = this.code;

    const { tag } = this;
    const tempEl = tempPropsHolder.querySelector(tag) as HTMLElement;
    if (!tempEl) {
      console.error('[WebComponent Playground] Target element ' + tag + ' not found');
      return;
    }

    // apply props to target element
    this.propsArray = this.propsArray.map(prop => {
      const attribute = prop.attr ? prop.attr : kebabCase(prop.name);
      return {
        ...prop,
        value: tempEl.getAttribute(attribute),
      };
    });
    tempPropsHolder.remove();

    // initialise slots
    const patternTagStart = `<${tag}(.*)>`;
    const patternTagEnd = `</${tag}>`;
    const pattern = `${patternTagStart}(.|\n)*?${patternTagEnd}`;

    const matches = this.code.match(new RegExp(pattern, 'gi'));
    if (!matches) {
      console.error('[WebComponent Playground] Tag ' + tag + ' not found in code');
      return;
    }
    const outerString = matches[0];
    const innerString = outerString
      .replace(new RegExp(patternTagStart, 'gi'), '')
      .replace(new RegExp(patternTagEnd, 'gi'), '')
      .trim();

    const tempSlotsHolder = document.createElement('div');
    tempSlotsHolder.innerHTML = innerString;
    // show/hide options for slots
    let tempSlotArray = [...this.slotsArray];
    tempSlotArray = this.slotsArray.map((slot: ISlot) => {
      const slotEl = tempSlotsHolder.querySelector(`[slot="${slot.name}"]`) as HTMLElement;
      if (slotEl) {
        tempSlotsHolder.removeChild(slotEl);
        return {
          ...slot,
          show: true,
          content: slotEl,
        };
      }
      return slot;
    });
    // if tempslotsholder is not empty, its innerHtml gets set to the default slot.
    if (tempSlotsHolder.innerHTML.trim()) {
      tempSlotArray = tempSlotArray.map(slot => {
        if (slot.name === 'default') {
          return {
            ...slot,
            show: true,
            content: tempSlotsHolder.innerHTML,
          };
        }

        return slot;
      });
    }
    this.slotsArray = tempSlotArray;
    tempSlotsHolder.remove();
  }

  // turn props array to key:value object
  getPropsObject(propsArray) {
    const filteredArray = propsArray
      .map(({ name, attr, value, type }) => {
        const attribute = attr ? attr : kebabCase(name);
        if (value === 'null' || value === null) {
          return false;
        }
        if (type === 'boolean' && !value) {
          return false;
        }
        if (type === 'object' || type === 'array') {
          try {
            return `${attribute}="${JSON5.stringify(value, undefined, 4)}"`;
          } catch (e) {
            return false;
          }
        }
        return { [attribute]: value }; // `${attribute}="${value}"`;
      })
      .filter(Boolean);

    return filteredArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }

  getSlotContents(slotsArray): string[] {
    return slotsArray
      .map(({ name, show, content }) => {
        if (!show) {
          return false;
        }
        if (!content) {
          return false;
        }
        return name === 'default' ? content : content.outerHTML;
      })
      .filter(Boolean);
  }

  getUsage() {
    const glue = '\n  ';
    const propObject = this.getPropsObject(this.propsArray);
    const propOutputs = Object.entries(propObject).map(([key, value]) => {
      return `${key}="${value}"`;
    });

    const slotOutputs = this.getSlotContents(this.slotsArray);

    const tagName = this.tag;
    return `<${tagName}${propOutputs.length ? glue : ''}${propOutputs.join(glue)}${propOutputs.length ? glue : ''}>
  ${slotOutputs.length ? slotOutputs.join('\n  ') : ''}
</${tagName}>`;
  }

  copyUsage() {
    copy(this.getUsage());
  }

  @State() showConfigPanel = true;

  closeConfigPanel() {
    this.showConfigPanel = false;
  }
  openConfigPanel() {
    this.showConfigPanel = true;
  }

  /**
   * Handle the prop changes
   * @param e propChange custom event from props-panel
   */
  handlePropsChange(e: CustomEvent<IProp[]>) {
    // update target element with new props
    this.propsArray = [...e.detail];
    this.renderedComponent = this.getUsage();
  }

  // handle slot changes
  handleSlotsChange(e: CustomEvent<ISlot[]>) {
    this.slotsArray = [...e.detail];
    this.renderedComponent = this.getUsage();
  }

  render() {
    const { block, debug, renderedComponent } = this;
    return (
      <Host>
        <div class="container">
          <div class="demo-row">
            <div class="demo">
              <div class="demo-bg"></div>
              <div id="demo-content" class={{ 'demo-content': true, block }} innerHTML={renderedComponent}></div>
              {!this.showConfigPanel ? (
                <go-button
                  compact
                  class={{ 'control-panel-opener': true }}
                  color="primary"
                  onClick={() => this.openConfigPanel()}
                  aria-label="Open configuration panel"
                >
                  Configure
                </go-button>
              ) : null}
            </div>
            <div
              class={{
                'control-panel': true,
                'show': this.showConfigPanel,
              }}
            >
              <div class="control-header">
                <span>Configuration</span>
                <go-button
                  round
                  compact
                  color="tertiary"
                  flat
                  icon
                  onClick={() => this.closeConfigPanel()}
                  aria-label="Close configuration panel"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </go-button>
              </div>
              <go-accordion class="props" multiple={true}>
                <go-accordion-item heading="Props" active>
                  <props-panel
                    debug={debug}
                    values={this.propsArray}
                    onPropChange={e => this.handlePropsChange(e)}
                  ></props-panel>
                </go-accordion-item>
                <go-accordion-item heading="Slots" active>
                  <slots-panel
                    debug={debug}
                    values={this.slotsArray}
                    onSlotDisplayChange={e => this.handleSlotsChange(e)}
                  ></slots-panel>
                </go-accordion-item>
              </go-accordion>
              <slot name="controls" />
            </div>
          </div>
          <wc-output onCopyCode={() => this.copyUsage()} usage={this.getUsage()}></wc-output>
        </div>
      </Host>
    );
  }
}
