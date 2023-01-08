import { Component, h, Element, Prop, Method } from '@stencil/core';
import { DropdownProps } from '../../interfaces';
import { trapFocus } from '../../utils';
import { uniqueId } from 'lodash-es';

@Component({
  tag: 'go-dropdown-menu',
  styleUrl: 'go-dropdown-menu.scss',
  shadow: false,
})
export class GoDropdownMenu implements DropdownProps {
  @Element() el: HTMLElement;

  /**
   * @see [go-dropdown](go-dropdown#props)
   */
  @Prop() triggerSelector: string;
  /**
   * keep track of active state
   */
  @Prop({ reflect: true, mutable: true }) isActive: boolean = false;
  @Prop() width?: string;

  /**
   * DOM id for menu
   */
  @Prop({ mutable: true })
  menuId?: string;

  /**
   * If persistent, the dropdown will not close by itself on interaction with elements inside the menu.
   */
  @Prop() persistent? = false;

  triggerEl: HTMLElement;
  dropdownEl: HTMLGoDropdownElement;
  menuEl: HTMLElement;
  menuItemEls?: HTMLElement[];
  focusedMenuItemIndex = 0;
  focusLastOnNextOpen = false;
  /**
   * open menu
   * @param focusFirst if auto focus on first item
   */
  @Method()
  async open() {
    if (!this.dropdownEl.isActive) {
      // open menu and focus on first item
      this.dropdownEl.open();
    }
  }

  @Method()
  async close() {
    this.dropdownEl.close();
  }

  componentWillLoad() {
    this.triggerEl = document.querySelector(this.triggerSelector);
    if (!this.menuId) {
      this.menuId = uniqueId('go-dropdown-menu-');
    }

    this.setTriggerRoles();
    this.addTriggerEventListeners();
  }

  componentDidLoad() {
    this.addMenuItemEventListeners();
  }

  setTriggerRoles() {
    this.triggerEl.setAttribute('aria-controls', this.menuId);
  }
  addTriggerEventListeners() {
    this.triggerEl.addEventListener('click', () => {
      if (this.isActive) {
        this.close();
      } else {
        this.open();
      }
    });
    this.triggerEl.addEventListener('keydown', (e) => {
      if (!this.dropdownEl) {
        return;
      }
      const key = e.key;
      if (key === 'ArrowUp') {
        this.focusLastOnNextOpen = true;
        this.open();
      }
      if (key === 'ArrowDown') {
        this.open();
      }
    });
  }

  addMenuItemEventListeners() {
    if (!this.menuItemEls) {
      this.menuItemEls = Array.from(this.menuEl.querySelectorAll('go-dropdown-item'));
      console.log(this.menuItemEls);
    }
    if (!this.menuItemEls.length) {
      // no `go-dropdown-item` found
      return;
    }

    // up down arrow keys move focus between menu items
    this.menuItemEls.forEach((item) => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || (!e.shiftKey && e.key === 'Tab')) {
          e.preventDefault();
          this.focusedMenuItemIndex += 1;
          if (this.focusedMenuItemIndex > this.menuItemEls.length - 1) {
            this.focusedMenuItemIndex = 0;
          }
          console.log('add index', this.focusedMenuItemIndex);
          this.focusMenuItem();
        }

        if (e.key === 'ArrowUp' || (e.shiftKey && e.key === 'Tab')) {
          e.preventDefault();
          this.focusedMenuItemIndex -= 1;
          if (this.focusedMenuItemIndex < 0) {
            this.focusedMenuItemIndex = this.menuItemEls.length - 1;
          }
          console.log('minus index', this.focusedMenuItemIndex);
          this.focusMenuItem();
        }
      });
    });
  }

  syncActiveState(isActive: boolean) {
    this.isActive = isActive;
  }
  focusMenuItem() {
    console.log(this.focusedMenuItemIndex);
    console.log(this.menuItemEls[this.focusedMenuItemIndex]);
    const dropdownItem = this.menuItemEls[this.focusedMenuItemIndex] as HTMLGoDropdownItemElement;
    dropdownItem.focusOnControl();
  }
  handleDropdownOpened() {
    trapFocus(this.menuEl, false);
    if (this.focusLastOnNextOpen) {
      this.focusedMenuItemIndex = this.menuItemEls.length - 1;
      this.focusLastOnNextOpen = false;
    } else {
      this.focusedMenuItemIndex = 0;
    }

    this.focusMenuItem();
  }

  render() {
    const { triggerSelector, isActive, width, menuId } = this;
    const dropdownProps = {
      triggerSelector,
      isActive,
      width,
    };
    return (
      <go-dropdown
        ref={(el) => {
          this.dropdownEl = el;
        }}
        noTriggerClickHandler={true}
        onOpened={() => this.handleDropdownOpened()}
        onClosed={() => this.syncActiveState(false)}
        {...dropdownProps}>
        <div
          role="menu"
          class="dropdown-menu"
          id={menuId}
          ref={(el) => {
            this.menuEl = el;
          }}>
          <slot></slot>
        </div>
      </go-dropdown>
    );
  }
}
