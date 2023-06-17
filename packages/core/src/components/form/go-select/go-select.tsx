import { Component, h, Element, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { SelectOption, SelectProps } from '../../../interfaces';
import { parseItems, fieldSlotNames, inheritNonFieldAttrs, loadFieldSlots, loadFieldProps } from '../../../utils';
import {
  getActionFromKey,
  getIndexByLetter,
  getUpdatedIndex,
  isScrollable,
  maintainScrollVisibility,
  MenuActions,
} from '../../../utils/select';
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
  @State() attrs: any;

  hasNamedSlot: { [key: string]: boolean } = {};
  prefixer = 'go-select-';
  controlId = uniqueId(this.prefixer);
  controlEl: HTMLElement;

  async componentWillLoad() {
    this.attrs = inheritNonFieldAttrs(this, ['options']);
    this.hasNamedSlot = loadFieldSlots(this.el);
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

  @State() dropdownWidth = 'auto';

  // save reference to active option
  private activeOptionRef: HTMLElement;

  // Prevent menu closing before click completed
  private ignoreBlur = false;

  // save reference to combobox element
  private inputRef: HTMLElement;

  // save reference to listbox
  private listboxRef: HTMLGoDropdownElement;

  @Watch('open')
  handleDomOnOpen(isOpen) {
    if (isOpen) {
      this.listboxRef.open();
      // adjust dropdown size
      // - we use fixed positioning strategy to make dropdown "break out" of the clipping containers, now we need to calculate dropdown width up opening
      // see https://floating-ui.com/docs/computePosition#strategy
      if (this.inputRef) {
        this.dropdownWidth = `${this.inputRef.offsetWidth}px`;
      }
      if (isScrollable(this.listboxRef) && this.activeOptionRef) {
        maintainScrollVisibility(this.activeOptionRef, this.listboxRef);
      }
    } else {
      this.listboxRef.close();
    }
  }

  render() {
    const {
      parsedOptions,
      activeIndex,
      controlId: id,
      open = false,
      dropdownWidth,
      value,
      readonly,
      disabled,
      name,
      attrs,
    } = this;
    const fieldProps = loadFieldProps(this);

    const activeId = open ? `${id}-${activeIndex}` : '';

    const controlAttrs = {
      id,
      name,
      value,
      ...attrs,
    };
    return [
      <input type="hidden" name={name} value={value} />,
      <go-field {...fieldProps}>
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
            aria-labelledby={`${id} ${id}-value`}
            aria-controls={`${id}-listbox`}
            aria-disabled={disabled ? 'true' : undefined}
            aria-readonly={readonly ? 'true' : undefined}
            class="control"
            id={`${id}-value`}
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
            disabled={readonly || disabled}
            trigger-selector={`#${id}-value`}
            width={dropdownWidth}
            onOpened={() => {
              this.updateMenuState(true);
            }}
            onClosed={() => {
              this.updateMenuState(false);
            }}
            role="listbox"
            ref={(el) => (this.listboxRef = el)}
            id={`${id}-listbox`}>
            {parsedOptions &&
              parsedOptions.map((option, i) => {
                return (
                  <div
                    class={{ 'current': this.activeIndex === i, 'combo-option': true }}
                    id={`${id}-${i}`}
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
    if (open && (this.readonly || this.disabled)) {
      return;
    }
    this.open = open;
    if (callFocus) {
      this.inputRef.focus();
    }
  }
}
