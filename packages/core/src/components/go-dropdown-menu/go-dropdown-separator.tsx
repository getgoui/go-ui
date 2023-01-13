import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'go-dropdown-separator',
  styleUrl: 'go-dropdown-separator.scss',
  shadow: false,
})
export class GoDropdownSeparator {
  render() {
    return (
      <Host>
        <hr role="separator" />
      </Host>
    );
  }
}
