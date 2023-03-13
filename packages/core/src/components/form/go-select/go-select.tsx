import { Component, h, Element, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { SelectOption, SelectProps } from '../../../interfaces';
import { inheritComponentAttrs, hasSlot, parseItems, fieldSlotNames } from '../../../utils';
import { getActionFromKey, getIndexByLetter, getUpdatedIndex, isScrollable, maintainScrollVisibility, MenuActions } from '../../../utils/select';
import { uniqueId } from 'lodash-es';

@Component({
  tag: 'go-select',
  styleUrl: 'go-select.scss',
  shadow: false,
})
export class GoSelect implements SelectProps {
  @Element() el: HTMLElement;

  @Prop() name: string;
  @Prop() label: string;
  @Prop() labelId?: string;
  @Prop() suffixId?: string;
  @Prop() hintId?: string;
  @Prop() errorId?: string;
  @Prop() disabled?: boolean;
  @Prop() hint?: string;
  @Prop() error?: string | boolean;
  @Prop() readonly?: boolean;
  @Prop() value?: string;

  /**
   * Array of label/value options
   */
  @Prop() options: SelectOption[] | string;

  /**
   * parsed options array
   */
  @State() parsedOptions = [];

  /**
   * common form control properties
   */
  attrs: any;
  hasNamedSlot: { [key: string]: boolean } = {};
  prefix = 'go-select-';

  async componentWillLoad() {
    this.attrs = inheritComponentAttrs(this, ['value', 'options', 'error', 'readonly']);
    fieldSlotNames.forEach((slotName) => {
      this.hasNamedSlot[slotName] = hasSlot(this.el, slotName);
    });
    this.loadOptions();
    if (this.value) {
      this.loadValue();
    }
  }

  @Watch('options')
  loadOptions() {
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

  @Watch('value')
  loadValue() {
    this.activeIndex = this.parsedOptions.findIndex((option) => option.value === this.value);
    this.selectOption(this.activeIndex);
  }

  /**
   * Emit a custom select event on value change
   */
  @Event()
  goChange: EventEmitter;

  // Active option index
  @State() activeIndex = -1;

  // Menu state
  @State() open = false;

  // Current accumulated search string
  @State() searchString: string;

  // Timeout after each typed character
  @State() searchTimeout: number | null;

  // Selected option index
  @State() selectedIndex: number;

  // input value
  @State() selectedLabel = '';

  // save reference to active option
  private activeOptionRef: HTMLElement;

  // Unique ID that should really use a UUID library instead
  private htmlId = uniqueId('go-select-');

  // Prevent menu closing before click completed
  private ignoreBlur = false;

  // save reference to combobox element
  private inputRef: HTMLElement;

  // save reference to listbox
  private listboxRef: HTMLElement;

  componentDidUpdate() {
    if (this.open && isScrollable(this.listboxRef) && this.activeOptionRef) {
      maintainScrollVisibility(this.activeOptionRef, this.listboxRef);
    }
  }

  render() {
    const { prefix, parsedOptions, error, activeIndex, htmlId, open = false, value, readonly, attrs } = this;
    const { name } = attrs;

    const activeId = open ? `${htmlId}-${activeIndex}` : '';

    const controlAttrs = {
      id: htmlId,
      name,
      value,
      ...attrs,
    };
    return [
      <input type="hidden" name={name} value={value} />,
      <go-field controlId={htmlId} idPrefix={prefix} error={error} readonly={readonly} {...attrs}>
        {fieldSlotNames.map((slotName) => {
          if (this.hasNamedSlot[slotName]) {
            return (
              <template slot={slotName}>
                <slot name={slotName}></slot>
              </template>
            );
          }
        })}
        <div class="combo">
          <div
            {...controlAttrs}
            role="combobox"
            aria-activedescendant={activeId}
            aria-autocomplete="none"
            aria-haspopup="listbox"
            aria-expanded={`${open}`}
            aria-labelledby={`${htmlId} ${htmlId}-value`}
            aria-controls={`${htmlId}-listbox`}
            class="control"
            id={`${htmlId}-value`}
            ref={(el) => (this.inputRef = el)}
            tabindex="0"
            onBlur={this.onComboBlur.bind(this)}
            onKeyDown={this.onComboKeyDown.bind(this)}>
            <span>{parsedOptions[activeIndex]?.label ?? ''}</span>
            <svg
              class={{ arrow: true, open }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <go-dropdown
            is-active={open}
            trigger-selector={`#${htmlId}-value`}
            no-trigger-clickHandler={true}
            full-width={true}
            onOpened={() => {
              this.updateMenuState(true);
            }}
            onClosed={() => {
              this.updateMenuState(false);
            }}
            role="listbox"
            ref={(el) => (this.listboxRef = el)}
            id={`${htmlId}-listbox`}>
            {parsedOptions &&
              parsedOptions.map((option, i) => {
                return (
                  <div
                    class={{ 'current': this.activeIndex === i, 'combo-option': true }}
                    id={`${this.htmlId}-${i}`}
                    aria-selected={this.activeIndex === i ? 'true' : undefined}
                    ref={(el) => {
                      if (this.activeIndex === i) {
                        this.activeOptionRef = el;
                      }
                    }}
                    role="option"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.onOptionClick(i);
                    }}
                    onMouseDown={this.onOptionMouseDown.bind(this)}>
                    {option.label}
                  </div>
                );
              })}
          </go-dropdown>
        </div>
      </go-field>,
    ];
  }

  private getSearchString(char: string) {
    // reset typing timeout and start new timeout
    // this allows us to make multiple-letter matches, like a native select
    if (typeof this.searchTimeout === 'number') {
      window.clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = window.setTimeout(() => {
      this.searchString = '';
    }, 500);

    // add most recent letter to saved search string
    this.searchString += char;
    return this.searchString;
  }

  private onComboKeyDown(event: KeyboardEvent) {
    const { key } = event;
    const max = this.parsedOptions.length - 1;

    const action = getActionFromKey(event, this.open);

    switch (action) {
      case MenuActions.Next:
      case MenuActions.Last:
      case MenuActions.First:
      case MenuActions.Previous:
        event.preventDefault();
        return this.onOptionChange(getUpdatedIndex(this.activeIndex, max, action));
      case MenuActions.CloseSelect:
      case MenuActions.Space:
        event.preventDefault();
        this.selectOption(this.activeIndex);
      case MenuActions.Close:
        event.preventDefault();
        return this.updateMenuState(false);
      case MenuActions.Type:
        // this.activeIndex = Math.max(0, getIndexByLetter(this.options, key));
        this.onComboType(key);
      case MenuActions.Open:
        event.preventDefault();
        return this.updateMenuState(true);
    }
  }

  private onComboBlur() {
    if (this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }

    if (this.open) {
      this.selectOption(this.activeIndex);
      this.updateMenuState(false, false);
    }
  }

  private onComboType(letter: string) {
    // open the listbox if it is closed
    this.updateMenuState(true);

    // find the index of the first matching option
    const searchString = this.getSearchString(letter);
    const searchIndex = getIndexByLetter(this.parsedOptions, searchString, this.activeIndex + 1);

    // if a match was found, go to it
    if (searchIndex >= 0) {
      this.onOptionChange(searchIndex);
    }
  }

  private onOptionChange(index: number) {
    this.activeIndex = index;
  }

  private onOptionClick(index: number) {
    this.onOptionChange(index);
    this.selectOption(index);
    this.updateMenuState(false);
  }

  private onOptionMouseDown() {
    this.ignoreBlur = true;
  }

  private selectOption(index: number) {
    if (index < 0) {
      return;
    }
    const selected = this.parsedOptions[index];
    this.selectedLabel = selected.label;
    this.selectedIndex = index;
    this.goChange.emit(selected);
  }

  private updateMenuState(open: boolean, callFocus = true) {
    this.open = open;
    if (callFocus) {
      this.inputRef.focus();
    }
  }
}
