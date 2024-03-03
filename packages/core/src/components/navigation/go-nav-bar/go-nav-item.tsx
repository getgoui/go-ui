import { INavItem } from '@/interfaces';
import { parseJsonProp } from '@/utils';
import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'go-nav-item',
})
export class GoNavItem {
  @Prop() items: INavItem[] | string;

  @State() parsedItems: INavItem[];
  componentWillLoad() {
    this.parsedItems = parseJsonProp(this.items);
  }

  render() {
    return <p>My name is Stencil</p>;
  }
}
