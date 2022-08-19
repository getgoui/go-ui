import { Component, h } from '@stencil/core';
import qs from 'qs';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true,
})
export class AppRoot {
  componentWillLoad() {
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    console.log({ params });
  }
  render() {
    return <div></div>;
  }
}
