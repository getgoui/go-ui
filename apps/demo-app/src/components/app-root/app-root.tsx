import { Component, h, Element, Host } from '@stencil/core';
import qs from 'qs';
import docs from '@go-ui/core/dist/docs/go-ui';
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
})
export class AppRoot {
  @Element() el: HTMLElement;

  componentWillLoad() {
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const { component, demo } = params;

    const target = docs.components.find(comp => comp.tag === component);
    this.el.innerHTML = target?.usage[demo];
  }

  render() {
    return <Host></Host>;
  }
}
